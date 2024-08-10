
'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];


const grammar = String.raw`
example {

  Main = "a"


}
`;

const rewrite_code = {
Main : function (_pA, /*memo_arg ☐ = ☐.rwr ()
*/
) {
let _pre = _.print (`pre down`);
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "Main");

_pA = _pA.rwr ()

_.set_top (return_value_stack, `... ${_.print (`xxx middle`)} ${_pA}`);


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
	return parser.trace (src).toString ();
    }
}

import * as fs from 'fs';
let src = fs.readFileSync(0, 'utf-8');
var result = main (src);
console.log (result);

