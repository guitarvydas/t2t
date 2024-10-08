
'use strict'

import {_} from './bootstrap_support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];

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

const rewrite_js = {
    main : function (_parameterDefs, _rewriteDef, ) {
	let parameterDefs = undefined;
	let rewriteDef = undefined;
	_.enter_rule ("main");
	parameterDefs = _parameterDefs.rwr ().join ('')
	rewriteDef = _rewriteDef.rwr ()


	_.set_return (`let _rewrite = {${parameterDefs}${rewriteDef}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};
`);

	return _.exit_rule ("main");
    },
    parameterDef : function (__pct, __1, __parameter, __2, _name, __3, ) {
	let _pct = undefined;
	let _1 = undefined;
	let _parameter = undefined;
	let _2 = undefined;
	let name = undefined;
	let _3 = undefined;
	_.enter_rule ("parameterDef");
	_pct = __pct.rwr ()
	_1 = __1.rwr ()
	_parameter = __parameter.rwr ()
	_2 = __2.rwr ()
	name = _name.rwr ()
	_3 = __3.rwr ()


	_.set_return (``);

	return _.exit_rule ("parameterDef");
    },
    rewriteDef : function (__pct, __1, __rewrite, __2, _name, __3, __lb, __4, _rewriteRules, __5, _rb, __6, ) {
	let _pct = undefined;
	let _1 = undefined;
	let _rewrite = undefined;
	let _2 = undefined;
	let name = undefined;
	let _3 = undefined;
	let _lb = undefined;
	let _4 = undefined;
	let rewriteRules = undefined;
	let _5 = undefined;
	let rb = undefined;
	let _6 = undefined;
	_.enter_rule ("rewriteDef");
	_pct = __pct.rwr ()
	_1 = __1.rwr ()
	_rewrite = __rewrite.rwr ()
	_2 = __2.rwr ()
	name = _name.rwr ()
	_3 = __3.rwr ()
	_lb = __lb.rwr ()
	_4 = __4.rwr ()
	rewriteRules = _rewriteRules.rwr ().join ('')
	_5 = __5.rwr ()
	rb = _rb.rwr ()
	_6 = __6.rwr ()


	_.set_return (`${rewriteRules}`);

	return _.exit_rule ("rewriteDef");
    },
    rewriteRule : function (_ruleName, __1, _lb, __2, _argDefs, __3s, _rb, __4, __eq, __5, _rewriteScope, __6, ) {
	let ruleName = undefined;
	let _1 = undefined;
	let lb = undefined;
	let _2 = undefined;
	let argDefs = undefined;
	let _3s = undefined;
	let rb = undefined;
	let _4 = undefined;
	let _eq = undefined;
	let _5 = undefined;
	let rewriteScope = undefined;
	let _6 = undefined;
	_.enter_rule ("rewriteRule");
	ruleName = _ruleName.rwr ()
	_1 = __1.rwr ()
	lb = _lb.rwr ()
	_2 = __2.rwr ()
	argDefs = _argDefs.rwr ().join ('')
	_3s = __3s.rwr ().join ('')
	rb = _rb.rwr ()
	_4 = __4.rwr ()
	_eq = __eq.rwr ()
	_5 = __5.rwr ()
	rewriteScope = _rewriteScope.rwr ()
	_6 = __6.rwr ()


	_.set_return (`\n${ruleName} : function (${argDefs}) {
_rewrite_support.enter_rule ("${ruleName}");${rewriteScope}
return _rewrite_support.exit_rule ("${ruleName}");
},`);

	return _.exit_rule ("rewriteRule");
    },
    argDef_parenthesized : function (_lp, _names, _rp, _op, ) {
	let lp = undefined;
	let names = undefined;
	let rp = undefined;
	let op = undefined;
	_.enter_rule ("argDef_parenthesized");
	lp = _lp.rwr ()
	names = _names.rwr ().join ('')
	rp = _rp.rwr ()
	op = _op.rwr ()


	_.set_return (`${names}`);

	return _.exit_rule ("argDef_parenthesized");
    },
    argDef_iter : function (_name, _op, ) {
	let name = undefined;
	let op = undefined;
	_.enter_rule ("argDef_iter");

	name = _name.rwr ()
	op = _op.rwr ()


	_.pre_memoArg (``, `${name}`, `\$\{${name}.rwr ().join ('')\}`);

	_.set_return (`${name},`);

	_.post_memoArg (``, `${name}`, `\$\{${name}.rwr ().join ('')\}`);

	return _.exit_rule ("argDef_iter");
    },
    argDef_plain : function (_name, ) {
	let name = undefined;
	_.enter_rule ("argDef_plain");

	name = _name.rwr ()


	_.pre_memoArg (``, `${name}`, `\$\{${name}.rwr ()\}`);

	_.set_return (`${name},`);

	_.post_memoArg (``, `${name}`, `\$\{${name}.rwr ()\}〕`);

	return _.exit_rule ("argDef_plain");
    },
    rewriteScope_call : function (_lb, __1, _lb2, __a, _fname, __b, _arg, __c, _rb2, __2, _rewriteScope, __3, _rb, ) {
	let lb = undefined;
	let _1 = undefined;
	let lb2 = undefined;
	let _a = undefined;
	let fname = undefined;
	let _b = undefined;
	let arg = undefined;
	let _c = undefined;
	let rb2 = undefined;
	let _2 = undefined;
	let rewriteScope = undefined;
	let _3 = undefined;
	let rb = undefined;
	_.enter_rule ("rewriteScope_call");
	lb = _lb.rwr ()
	_1 = __1.rwr ()
	lb2 = _lb2.rwr ()
	_a = __a.rwr ()
	fname = _fname.rwr ()
	_b = __b.rwr ()
	arg = _arg.rwr ().join ('')
	_c = __c.rwr ()
	rb2 = _rb2.rwr ()
	_2 = __2.rwr ()
	rewriteScope = _rewriteScope.rwr ()
	_3 = __3.rwr ()
	rb = _rb.rwr ()


	_.set_return (`\n_.${fname} ("pre", ${arg});\n${rewriteScope}\n_.${fname} ("post", ${arg});`);

	return _.exit_rule ("rewriteScope_call");
    },
    rewriteScope_parameterbinding : function (_lb, __1, _pname, __2, __eq, __3, _s, __4, _scope, __5, _rb, ) {
	let lb = undefined;
	let _1 = undefined;
	let pname = undefined;
	let _2 = undefined;
	let _eq = undefined;
	let _3 = undefined;
	let s = undefined;
	let _4 = undefined;
	let scope = undefined;
	let _5 = undefined;
	let rb = undefined;
	_.enter_rule ("rewriteScope_parameterbinding");
	lb = _lb.rwr ()
	_1 = __1.rwr ()
	pname = _pname.rwr ()
	_2 = __2.rwr ()
	_eq = __eq.rwr ()
	_3 = __3.rwr ()
	s = _s.rwr ()
	_4 = __4.rwr ()
	scope = _scope.rwr ()
	_5 = __5.rwr ()
	rb = _rb.rwr ()


	_.set_return (`\n_rewrite_support.pushParameter ("${pname}", ${s});${scope}\n_rewrite_support.popParameter ("${pname}");`);

	return _.exit_rule ("rewriteScope_parameterbinding");
    },
    rewriteScope_plain : function (_s, ) {
	let s = undefined;
	_.enter_rule ("rewriteScope_plain");
	s = _s.rwr ()


	_.set_return (`\n_rewrite_support.set_return (${s});`);

	return _.exit_rule ("rewriteScope_plain");
    },
    rewriteFormatString : function (_lq, _formatItems, _rq, ) {
	let lq = undefined;
	let formatItems = undefined;
	let rq = undefined;
	_.enter_rule ("rewriteFormatString");
	lq = _lq.rwr ()
	formatItems = _formatItems.rwr ().join ('')
	rq = _rq.rwr ()


	_.set_return (`\`${formatItems}\``);

	return _.exit_rule ("rewriteFormatString");
    },
    formatItem_supportCall : function (_lb, __1, _name, __2, _argStrings, _rb, ) {
	let lb = undefined;
	let _1 = undefined;
	let name = undefined;
	let _2 = undefined;
	let argStrings = undefined;
	let rb = undefined;
	_.enter_rule ("formatItem_supportCall");
	lb = _lb.rwr ()
	_1 = __1.rwr ()
	name = _name.rwr ()
	_2 = __2.rwr ()
	argStrings = _argStrings.rwr ().join ('')
	rb = _rb.rwr ()


	_.set_return (`\$\{_.${name} ("", ${argStrings})\}`);

	return _.exit_rule ("formatItem_supportCall");
    },
    formatItem_parameter : function (_lb, _parameterRef, _rb, ) {
	let lb = undefined;
	let parameterRef = undefined;
	let rb = undefined;
	_.enter_rule ("formatItem_parameter");
	lb = _lb.rwr ()
	parameterRef = _parameterRef.rwr ()
	rb = _rb.rwr ()


	_.set_return (`${parameterRef}`);

	return _.exit_rule ("formatItem_parameter");
    },
    formatItem_arg : function (_lb, _argRef, _rb, ) {
	let lb = undefined;
	let argRef = undefined;
	let rb = undefined;
	_.enter_rule ("formatItem_arg");
	lb = _lb.rwr ()
	argRef = _argRef.rwr ()
	rb = _rb.rwr ()


	_.set_return (`${argRef}`);

	return _.exit_rule ("formatItem_arg");
    },
    formatItem_escapedCharacter : function (_bslash, _any, ) {
	let bslash = undefined;
	let any = undefined;
	_.enter_rule ("formatItem_escapedCharacter");
	bslash = _bslash.rwr ()
	any = _any.rwr ()


	_.set_return (`${bslash}${any}`);

	return _.exit_rule ("formatItem_escapedCharacter");
    },
    formatItem_rawCharacter : function (_c, ) {
	let c = undefined;
	_.enter_rule ("formatItem_rawCharacter");
	c = _c.rwr ()


	_.set_return (`${c}`);

	return _.exit_rule ("formatItem_rawCharacter");
    },
    parenarg : function (_name, _ws, ) {
	let name = undefined;
	let ws = undefined;
	_.enter_rule ("parenarg");

	name = _name.rwr ()
	ws = _ws.rwr ()


	_.pre_memoArg (``,  `${name}`, `\$\{${name}.rwr ().join ('')\}`);

	_.set_return (`${name},`);

	_.post_memoArg (``, `${name}`, `\$\{${name}.rwr ().join ('')\}`);

	return _.exit_rule ("parenarg");
    },
    argstring : function (_str, _ws, ) {
	let str = undefined;
	let ws = undefined;
	_.enter_rule ("argstring");
	str = _str.rwr ()
	ws = _ws.rwr ()


	_.set_return (`${str}, `);

	return _.exit_rule ("argstring");
    },
    argRef : function (_name, ) {
	let name = undefined;
	_.enter_rule ("argRef");
	name = _name.rwr ();

	_.set_return (`${_.fetchArg ('', `${name}`)}`);

	return _.exit_rule ("argRef");
    },
    parameterRef : function (_name, ) {
	let name = undefined;
	_.enter_rule ("parameterRef");
	name = _name.rwr ()


	_.set_return (`\$\{_rewrite_support.getParameter ("${name}")\}`);

	return _.exit_rule ("parameterRef");
    },
    ruleName : function (_name, ) {
	let name = undefined;
	_.enter_rule ("ruleName");
	name = _name.rwr ()


	_.set_return (`${name}`);

	return _.exit_rule ("ruleName");
    },
    name : function (_nameFirst, _nameRests, ) {
	let nameFirst = undefined;
	let nameRests = undefined;
	_.enter_rule ("name");
	nameFirst = _nameFirst.rwr ()
	nameRests = _nameRests.rwr ().join ('')


	_.set_return (`${nameFirst}${nameRests}`);

	return _.exit_rule ("name");
    },
    nameFirst : function (_c, ) {
	let c = undefined;
	_.enter_rule ("nameFirst");
	c = _c.rwr ()


	_.set_return (`${c}`);

	return _.exit_rule ("nameFirst");
    },
    nameRest : function (_c, ) {
	let c = undefined;
	_.enter_rule ("nameRest");
	c = _c.rwr ()


	_.set_return (`${c}`);

	return _.exit_rule ("nameRest");
    },
    s_ : function (_space, ) {
	let space = undefined;
	_.enter_rule ("s_");
	space = _space.rwr ().join ('')


	_.set_return (`${space}`);

	return _.exit_rule ("s_");
    },
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};





// ~~~~~~ main ~~~~~~
function main (src) {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    if (cst.succeeded ()) {
        let cstSemantics = parser.createSemantics ();
        cstSemantics.addOperation ('rwr', rewrite_js);
        var generated_code = cstSemantics (cst).rwr ();
        return generated_code;
    } else {
        return cst.message;     
    }
}

import * as fs from 'fs';
const argv = process.argv.slice (2);
let srcFilename = argv [0];
let src = fs.readFileSync(srcFilename, 'utf-8');
var result = main (src);
console.log (result);

