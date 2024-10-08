
        'use strict'

        import {_} from './support.mjs';
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
argDef_iter : function (_name, _op, ) {
let name = undefined;
let op = undefined;
_.enter_rule ("argDef_iter");

name = _name.rwr ()
op = _op.rwr ()


_.pre_fnxyz (`〔a〕〔b〕`);

_.set_return (`${name},`);

_.post_fnxyz (`〔a〕〔b〕`);

return _.exit_rule ("argDef_iter");
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
    
