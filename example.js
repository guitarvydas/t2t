// parse a,b,b,c with recursively many ,b's

// this version is done in raw OhmJS + Javascript
// see example.generated.js for the same parser done in OhmJS + RWR

// usage: $ node example.js

'use strict'

var ohm = require('ohm-js');

const grammar = String.raw`

example {
    Main = "a" (";" "b")+ "c"
}

`;

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
let A_stack = [];
let B_stack = [];
let C_stack = [];

const semantics_code = {
    Main : function (a, semiBs, bs, c) {
	// a = CST for matched "a"
	// semiBs = list of CSTs, one CST for each ";" matched by (";" "b")+
	// bs = list of CSTs, one CST for each "b" matched by (";" "b")+
	// c = CST for matched "c"
	return_value_stack.push ("");
	rule_name_stack.push ("");
	set_top (rule_name_stack, "Main");

	A_stack.push ("");
	B_stack.push ("");
	C_stack.push ("");
	set_top (A_stack, `${a.rwr ()}`);
	set_top (B_stack, `${bs.rwr ().join ('')}`);
	set_top (C_stack, `${c.rwr ()}`);
	set_top (return_value_stack, `...${a.rwr ()}${semiBs.rwr ().join ('')}${top (B_stack)}${c.rwr ()}...`);
  	    console.log (A_stack);
  	    console.log (B_stack);
  	    console.log (C_stack);
  	    console.log (rule_name_stack);
  	    console.log (return_value_stack);
        C_stack.pop ();
        B_stack.pop ();
        A_stack.pop ();

	rule_name_stack.pop ();
	return return_value_stack.pop ();
    },
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};

const src = "a;b;b;bc";

function main () {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    if (cst.succeeded ()) {
	let cstSemantics = parser.createSemantics ();
	cstSemantics.addOperation ('rwr', semantics_code);
	var generated_code = cstSemantics (cst).rwr ();
	return generated_code;
    } else {
	console.log (parser.trace (src).toString ());
	throw ("grammar error");
    }
}

var result = main ();
console.log (result);

