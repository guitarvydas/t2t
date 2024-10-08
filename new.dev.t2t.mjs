'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let _rewrite_support = {
    verbose : false,
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
    return_value_stack : [],
    rule_name_stack : [],
    depth_prefix : ' ',
    parameters : {},

    enter_rule : function (name) {
	if (_rewrite_support.verbose) {
	    console.error (_rewrite_support.depth_prefix, ["enter", name]);
	    _rewrite_support.depth_prefix += ' ';
	}
	_rewrite_support.return_value_stack.push ("");
	_rewrite_support.rule_name_stack.push (name);
    },
    set_return : function (v) {
	_rewrite_support.set_top (_rewrite_support.return_value_stack, v);
    },
    exit_rule : function (name) {
	if (_rewrite_support.verbose) {
	    _rewrite_support.depth_prefix = _rewrite_support.depth_prefix.substr (1);
	    console.error (_rewrite_support.depth_prefix, ["exit", name]);
	}
	_rewrite_support.rule_name_stack.pop ();
	return _rewrite_support.return_value_stack.pop ()
    },

    pushParameter : function (name, v) {
	if (! _rewrite_support.parameters [name]) {
	    _rewrite_support.parameters [name] = [];
	}
	_rewrite_support.parameters [name].push (v);
    },

    getParameter : function (name) {
	return _rewrite_support.top (_rewrite_support.parameters [name]);
    },

    popParameter : function (name) {
	if (_rewrite_support.parameters [name]) {
	    _rewrite_support.parameters [name].pop ();
	}
    }

};

// for debugging - use when needed
function dump_stacks () {
    console.error (_rewrite_support.rule_name_stack, _rewrite_support.return_value_stack, _rewrite_support.parameters);
}

const grammar = String.raw`
t2t {
  main = parameterDef* rewriteDef

  parameterDef = "%" s_ "parameter" s_ name s_
  rewriteDef = "%" s_ "rewrite" s_ name s_ "{" s_ rewriteRule+ s_ "}" s_

  rewriteRule = ruleName s_ "[" s_ (argDef s_)* "]" s_ "=" s_ rewriteScope s_

  argDef = 
    | "(" parenarg+ ")" ("+" | "*" | "?")  -- parenthesized
    | name ("+" | "*" | "?")               -- iter
    | name                                 -- plain

  rewriteScope =
    | "⎡" s_ "⎨" s_ name s_ argstring+ s_ "⎬" s_ rewriteScope s_ "⎦"      -- call
    | "⎡" s_  name s_ "=" s_ rewriteFormatString  s_ rewriteScope s_ "⎦"  -- parameterbinding
    | rewriteFormatString                                                 -- plain
  
  rewriteFormatString = "‛" formatItem* "’"
  formatItem =
    | "⎨" s_ name s_ argstring+ "⎬" -- supportCall
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

let _rewrite = {
main : function (parameterDefs,rewriteDef,) {
_rewrite_support.enter_rule ("main");
_rewrite_support.set_return (`let _rewrite = {${parameterDefs.rwr ().join ('')}${rewriteDef.rwr ()}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};
`);
return _rewrite_support.exit_rule ("main");
},
parameterDef : function (_pct,_1,_parameter,_2,name,_3,) {
_rewrite_support.enter_rule ("parameterDef");
_rewrite_support.set_return (``);
return _rewrite_support.exit_rule ("parameterDef");
},
rewriteDef : function (_pct,_1,_rewrite,_2,name,_3,_lb,_4,rewriteRules,_5,rb,_6,) {
_rewrite_support.enter_rule ("rewriteDef");
_rewrite_support.set_return (`${rewriteRules.rwr ().join ('')}`);
return _rewrite_support.exit_rule ("rewriteDef");
},
rewriteRule : function (ruleName,_1,lb,_2,argDefs,_3s,rb,_4,_eq,_5,rewriteScope,_6,) {
_rewrite_support.enter_rule ("rewriteRule");
_rewrite_support.set_return (`\n${ruleName.rwr ()} : function (${argDefs.rwr ().join ('')}) {
_rewrite_support.enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
return _rewrite_support.exit_rule ("${ruleName.rwr ()}");
},`);
return _rewrite_support.exit_rule ("rewriteRule");
},
argDef_parenthesized : function (lp,names,rp,op,) {
_rewrite_support.enter_rule ("argDef_parenthesized");
_rewrite_support.set_return (`${names.rwr ().join ('')}`);
return _rewrite_support.exit_rule ("argDef_parenthesized");
},
argDef_iter : function (name,op,) {
_rewrite_support.enter_rule ("argDef_iter");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );
return _rewrite_support.exit_rule ("argDef_iter");
},
argDef_plain : function (name,) {
_rewrite_support.enter_rule ("argDef_plain");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ()\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ()\}`, );
return _rewrite_support.exit_rule ("argDef_plain");
},
rewriteScope_call : function (lb,_1,lb2,_a,fname,_b,arg,_c,rb2,_2,rewriteScope,_3,rb,) {
_rewrite_support.enter_rule ("rewriteScope_call");
_rewrite_support.set_return (`\n_.${fname.rwr ()} ("pre", ${arg.rwr ().join ('')});\n${rewriteScope.rwr ()}\n_.${fname.rwr ()} ("post", ${arg.rwr ().join ('')});`);
return _rewrite_support.exit_rule ("rewriteScope_call");
},
rewriteScope_parameterbinding : function (lb,_1,pname,_2,_eq,_3,s,_4,scope,_5,rb,) {
_rewrite_support.enter_rule ("rewriteScope_parameterbinding");
_rewrite_support.set_return (`\n_rewrite_support.pushParameter ("${pname.rwr ()}", ${s.rwr ()});${scope.rwr ()}\n_rewrite_support.popParameter ("${pname.rwr ()}");`);
return _rewrite_support.exit_rule ("rewriteScope_parameterbinding");
},
rewriteScope_plain : function (s,) {
_rewrite_support.enter_rule ("rewriteScope_plain");
_rewrite_support.set_return (`\n_rewrite_support.set_return (${s.rwr ()});`);
return _rewrite_support.exit_rule ("rewriteScope_plain");
},
rewriteFormatString : function (lq,formatItems,rq,) {
_rewrite_support.enter_rule ("rewriteFormatString");
_rewrite_support.set_return (`\`${formatItems.rwr ().join ('')}\``);
return _rewrite_support.exit_rule ("rewriteFormatString");
},
formatItem_supportCall : function (lb,_1,name,_2,argStrings,rb,) {
_rewrite_support.enter_rule ("formatItem_supportCall");
_rewrite_support.set_return (`\$\{_.${name.rwr ()} ("", ${argStrings.rwr ().join ('')})\}`);
return _rewrite_support.exit_rule ("formatItem_supportCall");
},
formatItem_parameter : function (lb,parameterRef,rb,) {
_rewrite_support.enter_rule ("formatItem_parameter");
_rewrite_support.set_return (`${parameterRef.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_parameter");
},
formatItem_arg : function (lb,argRef,rb,) {
_rewrite_support.enter_rule ("formatItem_arg");
_rewrite_support.set_return (`${argRef.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_arg");
},
formatItem_escapedCharacter : function (bslash,any,) {
_rewrite_support.enter_rule ("formatItem_escapedCharacter");
_rewrite_support.set_return (`${bslash.rwr ()}${any.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_escapedCharacter");
},
formatItem_rawCharacter : function (c,) {
_rewrite_support.enter_rule ("formatItem_rawCharacter");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_rawCharacter");
},
parenarg : function (name,ws,) {
_rewrite_support.enter_rule ("parenarg");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );
return _rewrite_support.exit_rule ("parenarg");
},
argstring : function (str,ws,) {
_rewrite_support.enter_rule ("argstring");
_rewrite_support.set_return (`${str.rwr ()}, `);
return _rewrite_support.exit_rule ("argstring");
},
argRef : function (name,) {
_rewrite_support.enter_rule ("argRef");
_rewrite_support.set_return (`${_.fetchArg ("", ``, `${name.rwr ()}`, )}`);
return _rewrite_support.exit_rule ("argRef");
},
parameterRef : function (name,) {
_rewrite_support.enter_rule ("parameterRef");
_rewrite_support.set_return (`\$\{_rewrite_support.getParameter ("${name.rwr ()}")\}`);
return _rewrite_support.exit_rule ("parameterRef");
},
ruleName : function (name,) {
_rewrite_support.enter_rule ("ruleName");
_rewrite_support.set_return (`${name.rwr ()}`);
return _rewrite_support.exit_rule ("ruleName");
},
name : function (nameFirst,nameRests,) {
_rewrite_support.enter_rule ("name");
_rewrite_support.set_return (`${nameFirst.rwr ()}${nameRests.rwr ().join ('')}`);
return _rewrite_support.exit_rule ("name");
},
nameFirst : function (c,) {
_rewrite_support.enter_rule ("nameFirst");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("nameFirst");
},
nameRest : function (c,) {
_rewrite_support.enter_rule ("nameRest");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("nameRest");
},
s_ : function (space,) {
_rewrite_support.enter_rule ("s_");
_rewrite_support.set_return (`${space.rwr ().join ('')}`);
return _rewrite_support.exit_rule ("s_");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

// node t2t.mjs test3.txt
import * as fs from 'fs';
const argv = process.argv.slice(2);
let srcFilename = argv[0];
if ('-' == srcFilename) { srcFilename = 0 }
let src = fs.readFileSync(srcFilename, 'utf-8');
try {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    let sem = parser.createSemantics ();
    sem.addOperation ('rwr', _rewrite);
    console.log (sem (cst).rwr ());
}
catch (e) {
    console.log (e);
}
