'use strict'

import * as ohm from 'ohm-js';

let verbose = false;

function top (stack) { let v = stack.pop (); stack.push (v); return v; }

function set_top (stack, v) { stack.pop (); stack.push (v); return v; }

let return_value_stack = [];
let rule_name_stack = [];
let depth_prefix = ' ';

function enter_rule (name) {
    if (verbose) {
	console.error (depth_prefix, ["enter", name]);
	depth_prefix += ' ';
    }
    return_value_stack.push ("");
    rule_name_stack.push (name);
}

function set_return (v) {
    set_top (return_value_stack, v);
}

function exit_rule (name) {
    if (verbose) {
	depth_prefix = depth_prefix.substr (1);
	console.error (depth_prefix, ["exit", name]);
    }
    rule_name_stack.pop ();
    return return_value_stack.pop ()
}

const grammar = String.raw`
t2t {
  main = parameterDef* rewriteDef

  parameterDef = "%" s_ "parameter" s_ name s_
  rewriteDef = "%" s_ "rewrite" s_ name s_ "{" rewriteRule+ "}" s_

  rewriteRule = s_ ruleName s_ "[" s_ (argDef s_)* "]" s_ "=" s_ rewriteScope s_

  argDef = 
    | "(" parenarg+ ")" ("+" | "*" | "?")  -- parenthesized
    | name ("+" | "*" | "?")               -- iter
    | name                                 -- plain

  rewriteScope =
    | "⎡" s_ "⎨" s_ name s_ argstring* s_ "⎬" s_ rewriteScope s_ "⎦"      -- call
    | "⎡" s_  name s_ "=" s_ rewriteFormatString  s_ rewriteScope s_ "⎦"  -- parameterbinding
    | rewriteFormatString                                                 -- plain
  
  rewriteFormatString = "‛" formatItem* "’"
  formatItem =
    | "⎨" s_ name s_ argstring* "⎬" -- supportCall
    | "⟪" parameterRef "⟫"                         -- parameter
    | "«" argRef "»"                               -- arg
    | "\\" any                                     -- escapedCharacter
    | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any  -- rawCharacter

  parenarg = name s_
  argstring =  rewriteFormatString s_
  argRef = name
  parameterRef = name
  ruleName = name

  name (a name)
    = nameFirst nameRest*
  nameFirst = ("_" | letter)
  nameRest  = ("_" | alnum)

  s_ = space*

}
`;

let args = {};
function resetArgs () {
    args = {};
}
function memoArg (name, accessorString) {
    args [name] = accessorString;
};
function fetchArg (name) {
    return args [name];
}

let parameters = {};
function pushParameter (name, v) {
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}


let _rewrite = {

main : function (parameterDef_i,rewriteDef,) {
    enter_rule ("main");
    set_return (`let parameters = {};
function pushParameter (name, v) {
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}
${parameterDef_i.rwr ().join ('')}

let _rewrite = {
${rewriteDef.rwr ()}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}`);
    return exit_rule ("main");
},
parameterDef : function (_pct,_1,_parameter,_2,name,_3,) {
    enter_rule ("parameterDef");
    set_return (`\nparameters ["${name.rwr ()}"] = [];`);
    return exit_rule ("parameterDef");
},
rewriteDef : function (_pct,_1,_rewrite,_2,name,_3,_lb,rule_i,rb,_6,) {
    enter_rule ("rewriteDef");
    set_return (`${rule_i.rwr ().join ('')}`);
    return exit_rule ("rewriteDef");
},
rewriteRule : function (_0,ruleName,_1,lb,_2,argDef_i,_3_i,rb,_4,_eq,_5,rewriteScope,_6,) {
    enter_rule ("rewriteRule");
     resetArgs ();

    set_return (`\n${ruleName.rwr ()} : function (${argDef_i.rwr ().join ('')}) {
enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
return exit_rule ("${ruleName.rwr ()}");
},`);
    return exit_rule ("rewriteRule");
},
argDef_parenthesized : function (lp,names_i,rp,op,) {
    enter_rule ("argDef_parenthesized");
    set_return (`${names_i.rwr ().join ('')}`);
    return exit_rule ("argDef_parenthesized");
},
argDef_iter : function (name,op,) {
    enter_rule ("argDef_iter");
     memoArg (`${name.rwr ()}`,`\$\{${name.rwr ()}.rwr ().join ('')\}`,);

    set_return (`${name.rwr ()},`);
    return exit_rule ("argDef_iter");
},
argDef_plain : function (name,) {
    enter_rule ("argDef_plain");
     memoArg (`${name.rwr ()}`,`\$\{${name.rwr ()}.rwr ()\}`,);

    set_return (`${name.rwr ()},`);
    return exit_rule ("argDef_plain");
},
rewriteScope_call : function (lb,_1,lb2,_a,fname,_b,arg_i,_c,rb2,_2,rewriteScope,_3,rb,) {
    enter_rule ("rewriteScope_call");
    set_return (`
    ${fname.rwr ()} (${arg_i.rwr ().join ('')});
    ${rewriteScope.rwr ()}
`);
    return exit_rule ("rewriteScope_call");
},
rewriteScope_parameterbinding : function (lb,_1,pname,_2,_eq,_3,s,_4,scope,_5,rb,) {
    enter_rule ("rewriteScope_parameterbinding");
    set_return (`
    pushParameter ("${pname.rwr ()}", \`${s.rwr ()}\`);${scope.rwr ()}`);
    return exit_rule ("rewriteScope_parameterbinding");
},
rewriteScope_plain : function (s,) {
    enter_rule ("rewriteScope_plain");
    set_return (`
    set_return (\`${s.rwr ()}\`);`);
    return exit_rule ("rewriteScope_plain");
},
rewriteFormatString : function (lq,formatItems_i,rq,) {
    enter_rule ("rewriteFormatString");
    set_return (`${formatItems_i.rwr ().join ('')}`);
    return exit_rule ("rewriteFormatString");
},
formatItem_supportCall : function (lb,_1,name,_2,argString_i,rb,) {
    enter_rule ("formatItem_supportCall");
    set_return (`\$\{${name.rwr ()} (${argString_i.rwr ().join ('')})\}`);
    return exit_rule ("formatItem_supportCall");
},
formatItem_parameter : function (lb,parameterRef,rb,) {
    enter_rule ("formatItem_parameter");
    set_return (`${parameterRef.rwr ()}`);
    return exit_rule ("formatItem_parameter");
},
formatItem_arg : function (lb,argRef,rb,) {
    enter_rule ("formatItem_arg");
    set_return (`${argRef.rwr ()}`);
    return exit_rule ("formatItem_arg");
},
formatItem_escapedCharacter : function (bslash,any,) {
    enter_rule ("formatItem_escapedCharacter");
    set_return (`${bslash.rwr ()}${any.rwr ()}`);
    return exit_rule ("formatItem_escapedCharacter");
},
formatItem_rawCharacter : function (c,) {
    enter_rule ("formatItem_rawCharacter");
    set_return (`${c.rwr ()}`);
    return exit_rule ("formatItem_rawCharacter");
},
parenarg : function (name,ws,) {
    enter_rule ("parenarg");
     memoArg (`${name.rwr ()}`,`\$\{${name.rwr ()}.rwr ().join ('')\}`,);

    set_return (`${name.rwr ()},`);
    return exit_rule ("parenarg");
},
argstring : function (str,ws,) {
    enter_rule ("argstring");
    set_return (`\`${str.rwr ()}\`,`);
    return exit_rule ("argstring");
},
argRef : function (name,) {
    enter_rule ("argRef");
    set_return (`${fetchArg (`${name.rwr ()}`,)}`);
    return exit_rule ("argRef");
},
parameterRef : function (name,) {
    enter_rule ("parameterRef");
    set_return (`\$\{getParameter ("${name.rwr ()}")\}`);
    return exit_rule ("parameterRef");
},
ruleName : function (name,) {
    enter_rule ("ruleName");
    set_return (`${name.rwr ()}`);
    return exit_rule ("ruleName");
},
name : function (nameFirst,nameRest_i,) {
    enter_rule ("name");
    set_return (`${nameFirst.rwr ()}${nameRest_i.rwr ().join ('')}`);
    return exit_rule ("name");
},
nameFirst : function (c,) {
    enter_rule ("nameFirst");
    set_return (`${c.rwr ()}`);
    return exit_rule ("nameFirst");
},
nameRest : function (c,) {
    enter_rule ("nameRest");
    set_return (`${c.rwr ()}`);
    return exit_rule ("nameRest");
},
s_ : function (space_i,) {
    enter_rule ("s_");
    set_return (`${space_i.rwr ().join ('')}`);
    return exit_rule ("s_");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

import * as fs from 'fs';
const argv = process.argv.slice(2);
let srcFilename = argv[0];
if ('-' == srcFilename) { srcFilename = 0 }
let src = fs.readFileSync(srcFilename, 'utf-8');
let parser = ohm.grammar (grammar);
let cst = parser.match (src);
let sem = parser.createSemantics ();
sem.addOperation ('rwr', _rewrite);
console.log (sem (cst).rwr ());
