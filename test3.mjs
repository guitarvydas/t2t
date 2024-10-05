
        'use strict'

        import {_} from './support.mjs';
        import * as ohm from 'ohm-js';

        let return_value_stack = [];
        let rule_name_stack = [];

        const grammar = String.raw`
    test3 {
  Main = "waltzing" Inner
  Inner = "matilda"
}

`;

let previous_stack = [];
const rewrite_js = {
Main : function (_w, _inner, ) {
let w = undefined;
let inner = undefined;
_.enter_rule ("Main");
previous_stack.push (previous_stack [previous_stack.length-1]);

w = _w.rwr ()
inner = _inner.rwr ()

_.set_top (previous_stack, `${w}`);

_.set_return (`${inner}`);

previous_stack.pop ();

return _.exit_rule ("Main");
},
Inner : function (_m, ) {
let m = undefined;
_.enter_rule ("Inner");
m = _m.rwr ()


_.set_return (`${_.top (previous_stack)}...${m}`);

return _.exit_rule ("Inner");
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
    
