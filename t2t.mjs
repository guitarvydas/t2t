'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];

let A_stack = [];
let B_stack = [];
let C_stack = [];

const grammar = String.raw`
example {
Main="a"(";""b")+"c"
}
`;

const rewrite_code = {
Main : function (_A, _Bsemis, _Bs, _C, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "Main");
A_stack.push ('');
B_stack.push ('');
C_stack.push ('');

_A = _A.rwr ();
_Bsemis = _Bsemis.rwr ().join ('');
_Bs = _Bs.rwr ().join ('');
_C = _C.rwr ();

_.set_top (A_stack, `${_A}`);
_.set_top (B_stack, `${_Bs}`);
_.set_top (C_stack, `${_C}`);

_.pre_print (`hello`);
_.set_top (return_value_stack, `... ${_.print (`middle`)} ${_A}${_Bsemis}${_.top (B_stack)}${_C}...`);

_.post_print (`hello`);
A_stack.pop ();
B_stack.pop ();
C_stack.pop ();

rule_name_stack.pop ();
return return_value_stack.pop ();
},
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};


function main (src) {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    if (cst.succeeded ()) {
	let cstSemantics = parser.createSemantics ();
	cstSemantics.addOperation ('rwr', rewrite_code);
	var generated_code = cstSemantics (cst).rwr ();
	return generated_code;
    } else {
	console.log (parser.trace (src).toString ());
	throw ("grammar error");
    }
}

import * as fs from 'fs';
let src = fs.readFileSync(0, 'utf-8');
var result = main (src);
console.log (result);
