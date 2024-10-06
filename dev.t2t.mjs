
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
    | "(" (name s_)+ ")" ("+" | "*" | "?") -- parenthesized
    | name ("+" | "*" | "?")               -- iter
    | name                                 -- plain

  rewriteScope =
    | "⎡" s_ binding s_ rewriteScope s_ "⎦" -- scope
    | rewriteFormatString                   -- plain
  
  binding =
    | "⎨" s_ name s_ rewriteFormatString s_ "⎬" -- call
    | name s_ "=" s_ rewriteFormatString        -- parameterAssignment

  rewriteFormatString = "‛" formatItem* "’"
  formatItem =
    | "⎨" s_ name s_ (rewriteFormatString s_)+ "⎬" -- supportCall
    | "⟪" parameterRef "⟫"                         -- parameter
    | "«" argRef "»"                               -- arg
    | "\\" any                                     -- escapedCharacter
    | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any  -- rawCharacter

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


_.set_return (`${parameterDefs}${rewriteDef}`);

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


_.set_return (`${_pct}${_1}${_parameter}${_2}${name}${_3}`);

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


_.set_return (`${_pct}${_1}${_rewrite}${_2}${name}${_3}${_lb}${_4}${rewriteRules}${_5}${rb}${_6}`);

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


_.set_return (`${ruleName}${_1}${lb}${_2}${argDefs}${_3s}${rb}${_4}${_eq}${_5}${rewriteScope}${_6}`);

return _.exit_rule ("rewriteRule");
},
argDef_parenthesized : function (_lp, _names, __1s, _rp, _op, ) {
let lp = undefined;
let names = undefined;
let _1s = undefined;
let rp = undefined;
let op = undefined;
_.enter_rule ("argDef_parenthesized");
lp = _lp.rwr ()
names = _names.rwr ().join ('')
_1s = __1s.rwr ().join ('')
rp = _rp.rwr ()
op = _op.rwr ()


_.set_return (`${lp}${names}${_1s}${rp}${op} `);

return _.exit_rule ("argDef_parenthesized");
},
argDef_iter : function (_name, _op, ) {
let name = undefined;
let op = undefined;
_.enter_rule ("argDef_iter");
name = _name.rwr ()
op = _op.rwr ()


_.set_return (`${name}${op} `);

return _.exit_rule ("argDef_iter");
},
argDef_plain : function (_name, ) {
let name = undefined;
_.enter_rule ("argDef_plain");
name = _name.rwr ()


_.set_return (`${name} `);

return _.exit_rule ("argDef_plain");
},
rewriteScope_scope : function (_lb, __1, _binding, __2, _rewriteScope, __3, _rb, ) {
let lb = undefined;
let _1 = undefined;
let binding = undefined;
let _2 = undefined;
let rewriteScope = undefined;
let _3 = undefined;
let rb = undefined;
_.enter_rule ("rewriteScope_scope");
lb = _lb.rwr ()
_1 = __1.rwr ()
binding = _binding.rwr ()
_2 = __2.rwr ()
rewriteScope = _rewriteScope.rwr ()
_3 = __3.rwr ()
rb = _rb.rwr ()


_.set_return (`${lb}${_1}${binding}${_2}${rewriteScope}${_3}${rb}`);

return _.exit_rule ("rewriteScope_scope");
},
rewriteScope_plain : function (_s, ) {
let s = undefined;
_.enter_rule ("rewriteScope_plain");
s = _s.rwr ()


_.set_return (`${s}`);

return _.exit_rule ("rewriteScope_plain");
},
binding_call : function (_lb, __1, _name, __2, _rewriteFormatString, __3, _rb, ) {
let lb = undefined;
let _1 = undefined;
let name = undefined;
let _2 = undefined;
let rewriteFormatString = undefined;
let _3 = undefined;
let rb = undefined;
_.enter_rule ("binding_call");
lb = _lb.rwr ()
_1 = __1.rwr ()
name = _name.rwr ()
_2 = __2.rwr ()
rewriteFormatString = _rewriteFormatString.rwr ()
_3 = __3.rwr ()
rb = _rb.rwr ()


_.set_return (`${lb}${_1}${name}${_2}${rewriteFormatString}${_3}${rb}`);

return _.exit_rule ("binding_call");
},
binding_parameterAssignment : function (_name, __1, __eq, __2, _rewriteFormatString, ) {
let name = undefined;
let _1 = undefined;
let _eq = undefined;
let _2 = undefined;
let rewriteFormatString = undefined;
_.enter_rule ("binding_parameterAssignment");
name = _name.rwr ()
_1 = __1.rwr ()
_eq = __eq.rwr ()
_2 = __2.rwr ()
rewriteFormatString = _rewriteFormatString.rwr ()


_.set_return (`${name}${_1}${_eq}${_2}${rewriteFormatString}`);

return _.exit_rule ("binding_parameterAssignment");
},
rewriteFormatString : function (_lq, _formatItems, _rq, ) {
let lq = undefined;
let formatItems = undefined;
let rq = undefined;
_.enter_rule ("rewriteFormatString");
lq = _lq.rwr ()
formatItems = _formatItems.rwr ().join ('')
rq = _rq.rwr ()


_.set_return (`${lq}${formatItems}${rq}`);

return _.exit_rule ("rewriteFormatString");
},
formatItem_supportCall : function (_lb, __1, _name, __2, _rewriteFormatStrings, __3s, _rb, ) {
let lb = undefined;
let _1 = undefined;
let name = undefined;
let _2 = undefined;
let rewriteFormatStrings = undefined;
let _3s = undefined;
let rb = undefined;
_.enter_rule ("formatItem_supportCall");
lb = _lb.rwr ()
_1 = __1.rwr ()
name = _name.rwr ()
_2 = __2.rwr ()
rewriteFormatStrings = _rewriteFormatStrings.rwr ().join ('')
_3s = __3s.rwr ().join ('')
rb = _rb.rwr ()


_.set_return (`${lb}${_1}${name}${_2}${rewriteFormatStrings}${_3s}${rb}`);

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


_.set_return (`${lb}${parameterRef}${rb}`);

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


_.set_return (`${lb}${argRef}${rb}`);

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
argRef : function (_name, ) {
let name = undefined;
_.enter_rule ("argRef");
name = _name.rwr ()


_.set_return (`${name}.rwr ()`);

return _.exit_rule ("argRef");
},
parameterRef : function (_name, ) {
let name = undefined;
_.enter_rule ("parameterRef");
name = _name.rwr ()


_.set_return (`_.top (${name}_stack)`);

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
    
