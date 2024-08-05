'use strict'

var ohm = require('ohm-js');


function set_top (stack, val) {
    stack.pop ();
    stack.push (val);
}

function top (stack) {
    let r = stack.pop ();
    stack.push (r);
    return r;
}

let return_value_stack = [];
let rule_name_stack = [];


const grammar = String.raw`
example {

Main = "a"
}
`;

const rewrite_code = {
Main : function (_A) {
return_value_stack.push ("");
rule_name_stack.push ("");
set_top (rule_name_stack, "Main");

_A = _A.rwr ();

set_top (return_value_stack, `@@@ ${_A} @@@`);


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

let fs = require('fs');
let src = fs.readFileSync(0, 'utf-8');
var result = main (src);
console.log (result);
