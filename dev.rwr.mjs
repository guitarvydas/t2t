
        'use strict'

        import {_} from './support.mjs';
        import * as ohm from 'ohm-js';

        let return_value_stack = [];
        let rule_name_stack = [];

        const grammar = String.raw`
    t2t {
  main = parameterDef* rewriteDef
}
`;

const rewrite_js = {
main : function (_parameterDefs, _rewriteDef, ) {
let parameterDefs = undefined;
let rewriteDef = undefined;
_.enter_rule ("main");
parameterDefs = _parameterDefs.rwr ().join ('')
rewriteDef = _rewriteDef.rwr ()


_.set_return (`${parameterDefs}`);

return _.exit_rule ("main");
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
    
