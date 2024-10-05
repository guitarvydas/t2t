
        'use strict'

        import {_} from './support.mjs';
        import * as ohm from 'ohm-js';

        let return_value_stack = [];
        let rule_name_stack = [];

        const grammar = String.raw`
    example {
  Main = "a" (";" "b")+ "c" "d"+
}

`;

let paramA_stack = [];
let paramB_stack = [];
let paramC_stack = [];
const rewrite_js = {
Main : function (_a, __semis, _b, _c, _d, ) {
let a = undefined;
let _semis = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
_.enter_rule ("Main");
paramA_stack.push (paramA_stack [paramA_stack.length-1]);
paramB_stack.push (paramB_stack [paramB_stack.length-1]);
paramC_stack.push (paramC_stack [paramC_stack.length-1]);

a = _a.rwr ()
_semis = __semis.rwr ().join ('')
b = _b.rwr ().join ('')
c = _c.rwr ()
d = _d.rwr ().join ('')


_.pre_print (`pre down a=${a} _semis=${_semis} b=${b} c=${c} d=${d}`);
_.set_top (paramA_stack, `${a}`);
_.set_top (paramB_stack, `${b}`);
_.set_top (paramC_stack, `${c}`);

_.pre_print (`hello`);

_.set_return (`... ${_.print2 (`middle`, `2nd arg`)} ${a}${_semis}${_.top (paramB_stack)}${c}${d}...`);

_.post_print (`hello`);
_.post_print (`pre down a=${a} _semis=${_semis} b=${b} c=${c} d=${d}`);
paramA_stack.pop ();
paramB_stack.pop ();
paramC_stack.pop ();

return _.exit_rule ("Main");
},
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};





// ~~~~~~ stock main ~~~~~~
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
        let src = fs.readFileSync(0, 'utf-8');
        var result = main (src);
        console.log (result);
    
