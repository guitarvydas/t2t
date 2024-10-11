'use strict'

import * as ohm from 'ohm-js';

let t2t_grammar = String.raw`
t2t {
  main = parameterDef* rewriteDef

  parameterDef = "%" s_ "parameter" s_ name s_
  rewriteDef = "%" s_ "rewrite" s_ name s_ "{" s_ firstRewriteRule s_ subsequentRewriteRule* s_ "}" s_

  firstRewriteRule      = rewriteRule
  subsequentRewriteRule = rewriteRule
  rewriteRule = ruleName s_ "[" s_ (argDef s_)* "]" s_ "=" s_ rewriteScope s_

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

let t2t_rewrite = {
    main : function (parameterDefs_i, rewriteDef) {
	return `let parameters = {};
function pushParameter (name, v) {
    parameters [name] = v;
}
function getParameter (name) {
    return parameters [name];
}
${parameterDefs_i.rwr ().join ('')}

let _rewrite = {
${rewriteDef.rwr ()}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};
`;
    },

    parameterDef : function (pct, ws1, _parameter, ws2, name, ws3) {
	return `\nparameters ["${name.rwr ()}"] = [];`;
    },

    rewriteDef : function (pct, ws1, _rewrite, ws2, name, ws3, lb, ws4, firstRewriteRule, ws5, subsequentRewriteRule_i, ws6, rb, ws7) {
	return `${firstRewriteRule.rwr ()}${subsequentRewriteRule_i.rwr ().join ('')}`;
    },

    firstRewriteRule : function (rewriteRule) {
	return `${rewriteRule.rwr ()}`;
    },

    subsequentRewriteRule : function (rewriteRule) {
	return `${rewriteRule.rwr ()}`;
    },

    // rewriteRule =        ruleName s_    "[" s_   (argDef   s_)*  "]"  s_   "="  s_   rewriteScope  s_
    rewriteRule : function (ruleName, ws1, lb, ws2, argDef_i, ws3_i, rb, ws4, _eq, ws5, rewriteScope, ws6) {
        resetArgs ();
	let r = `
${ruleName.rwr ()} : function (${argDef_i.rwr ().join ('⦂')}) {
    enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
    return exit_rule ("${ruleName.rwr ()}");
},`;
	return r;
    },
    
    //argDef = 
    // | "(" parenarg+ ")" ("+" | "*" | "?")  -- parenthesized
    argDef_parenthesized : function (lb, parenarg_i, rb, i_op) {
	return `${parenarg_i.rwr ().join ('')}`;
    },

    // | name ("+" | "*" | "?")               -- iter
    argDef_iter : function (name, op_i) {
	memoArg (`${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`);
	return `${name.rwr ()}⦙`;
    },

    // | name                                 -- plain
    argDef_plain : function (name) {
	memoArg (`${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ()\}`);
	return `${name.rwr ()}⦙`;
    },

    // rewriteScope =
    //   | "⎡" s_ "⎨" s_ name s_ argstring* s_ "⎬" s_ rewriteScope s_ "⎦"      -- call
    rewriteScope_call : function (lsb, ws1, lb, ws2, fname, ws3, argString_i, ws4, rb, ws5, rewriteScope, ws6, rsb) {
	return `\n     _.${fname.rwr ()} ("pre", ${argString_i.rwr ().join ('')});\n${rewriteScope.rwr ()}\n     _.${fname.rwr ()} ("post", ${argString_i.rwr ().join ('')});`;
    },
    
    //   | "⎡" s_  name s_ "=" s_ rewriteFormatString  s_ rewriteScope s_ "⎦"  -- parameterbinding
    rewriteScope_parameterbinding : function (lsb, ws1, pname, ws2, _eq, ws3, rewriteFormatString, ws4, rewriteScope, ws5, rsb) {
	return `
    pushParameter ("${pname.rwr ()}",@\`${rewriteFormatString.rwr ()}\`);${rewriteScope.rwr ()}
    popParameter ("${pname.rwr ()}");`;
    },
    
    //   | rewriteFormatString                                                 -- plain
    rewriteScope_plain : function (rewriteFormatString) {
	return `\n    set_return (\`${rewriteFormatString.rwr ()}\`);`;
    },
    
    // rewriteFormatString = "‛" formatItem* "’"
    rewriteFormatString : function (lq, formatItem_i, rq) {
	return `${formatItem_i.rwr ().join ('')}`;
    },
    
    // formatItem =
    //   | "⎨" s_ name s_ argstring* "⎬" -- supportCall
    formatItem_supportCall : function (lb, ws1, name, ws2, argstring_i, rb) {
	return `\$\{_.${name.rwr ()} (${argstring_i.rwr ().join ('')})\}`;
    },

    //   | "⟪" parameterRef "⟫"                         -- parameter
    formatItem_parameter : function (lb, parameterRef, rb) {
	return `${parameterRef.rwr ()}`;
    },
    //   | "«" argRef "»"                               -- arg

    formatItem_arg : function (lb, argRef, rb) {
	return `${argRef.rwr ()}`;
    },

    //   | "\\" any                                     -- escapedCharacter
    formatItem_escapedCharacter : function (backslash, c) {
	return `${backslash.rwr ()}${c.rwr ()}`;
    },

    //   | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any  -- rawCharacter
    formatItem_rawCharacter : function (c) {
	return `${c.rwr ()}`;
    },

    // parenarg = name s_
    parenarg : function (name, ws) {
	memoArg (`${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`);
	return `${name.rwr ()}⦙`;
    },

    // argstring =  rewriteFormatString s_
    argstring : function (rewriteFormatString, ws) {
	return `\`${rewriteFormatString.rwr ()}\`⦙`;
    },
    
    // argRef = name
    argRef : function (name) {
	return `${fetchArg (name.rwr ())}`
        },
    
    // parameterRef = name
    parameterRef : function (name) {
	return `\$\{getParameter ("${name.rwr ()}")\}`;
    },
    
    // ruleName = name
    ruleName : function (name) {
	return `${name.rwr ()}`;
    },
    

    // name (a name)
    //   = nameFirst nameRest*
    name : function (nameFirst, nameRest_i) {
	return `${nameFirst.rwr ()}${nameRest_i.rwr ().join ('')}`;
    },
    
    // nameFirst = ("_" | letter)
    nameFirst : function (c) {
	return `${c.rwr ()}`;
    },
    
    // nameRest  = ("_" | alnum)
    nameRest : function (c) {
	return `${c.rwr ()}`;
    },

    // s_ = space*
    s_ : function (ws_i) {
	return `${ws_i.rwr ().join ('')}`;
    },
    
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
    };



function main (t2t_program) {
}

import * as fs from 'fs';
const argv = process.argv.slice (2);
let t2t_program_filename = argv [0];
if (t2t_program_filename == "-") {
    t2t_program_filename = 0; // "-" means stdin
}
let t2t_program = fs.readFileSync(t2t_program_filename, 'utf-8');
let parser = ohm.grammar (t2t_grammar);
let cst = parser.match (t2t_program);
let semantics = parser.createSemantics ();
semantics.addOperation ('rwr', t2t_rewrite);
let result = semantics (cst).rwr (); // generate code and return it as a string
console.log(result);
