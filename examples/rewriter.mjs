
'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];

let sA_stack = [];
let sB_stack = [];
let sC_stack = [];

const grammar = String.raw`
example {

  Main = "a" (";" "b")+ "c" Tailx
  Tailx = "d"+


}
`;

const rewrite_code = {
Main : function (__pA, __pBsemis, __pBs, __pC, _tail, ) {
//** foreach_arg (let ☐ = undefined;)
//** argnames=_pA,_pBsemis,_pBs,_pC,tail
let _pA = undefined;
let _pBsemis = undefined;
let _pBs = undefined;
let _pC = undefined;
let tail = undefined;
let _pre = _.print (`pre down`);
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "Main");
sA_stack.push ('');
sB_stack.push ('');
sC_stack.push ('');

_pA = __pA.rwr ()
_pBsemis = __pBsemis.rwr ().join ('')
_pBs = __pBs.rwr ().join ('')
_pC = __pC.rwr ()
tail = _tail.rwr ()

_.set_top (sA_stack, `${_pA}`);
_.set_top (sB_stack, `${_pBs}`);
_.set_top (sC_stack, `${_pC}`);

_.pre_print (`hello`);
_pA = __pA.rwr ()
_pBsemis = __pBsemis.rwr ().join ('')
_pBs = __pBs.rwr ().join ('')
_pC = __pC.rwr ()
tail = _tail.rwr ()

_.set_top (return_value_stack, `... ${_.print2 (`middle`, `2nd arg`)} ### ${_pA}${_pBsemis}${_.top (sB_stack)}${_pC}${tail}...`);

_.post_print (`hello`);
sA_stack.pop ();
sB_stack.pop ();
sC_stack.pop ();

rule_name_stack.pop ();
return return_value_stack.pop ();
},
Tailx : function (_ds, ) {
//** foreach_arg (let ☐ = undefined;)
//** argnames=ds
let ds = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "Tailx");
sA_stack.push ('');
sB_stack.push ('');
sC_stack.push ('');

ds = _ds.rwr ().join ('')

ds = _ds.rwr ().join ('')

_.set_top (return_value_stack, `... ${_.print2 (`Tail`, `arg2`)} (sA=${_.top (sA_stack)} sB=${_.top (sB_stack)} sC=${_.top (sC_stack)} ${ds}...)`);

sA_stack.pop ();
sB_stack.pop ();
sC_stack.pop ();

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
