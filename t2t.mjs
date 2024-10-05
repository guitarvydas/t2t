
        'use strict'

        import {_} from './support.mjs';
        import * as ohm from 'ohm-js';

        let return_value_stack = [];
        let rule_name_stack = [];

        const grammar = String.raw`
    t2t {
  main = applySyntactic<ParameterDef>* rewriteDef

  ParameterDef = "% parameter" name
  rewriteDef = "% rewrite" spaces name spaces "{" spaces rewriteRule+ spaces "}" spaces


  // just pass the grammar through to OhmJS - it parses and checks the grammar
  rule =
    | "\"" "% parameter" "\"" -- parameter_as_string
    | "\"" "% rewrite" "\"" -- rewrite_as_string
    | ~"% parameter" ~"% rewrite" any -- basic

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum


  // rewrite parsing section
  rewriteRule = 
    | rwRuleName spaces "[" spaces (rwParameterDef spaces)+ "]" spaces before spaces "=" spaces rewriteScope spaces -- withbefore
    | rwRuleName spaces "[" spaces (rwParameterDef spaces)+ "]" spaces "=" spaces rewriteScopeRaw spaces -- plain_no_scope
    | rwRuleName spaces "[" spaces (rwParameterDef spaces)+ "]" spaces "=" spaces rewriteScope spaces -- plain

  rwRuleName = name
  rwArgDef = name
  rwIterArgDef = name ("+" | "*" | "?")
  rwParenthesizedIterArgDef = "(" rwParenArgDef+ ")" ("+" | "*" | "?")
  rwParameterDef = (rwParenthesizedIterArgDef | rwIterArgDef | rwArgDef)
  rwParenArgDef = name spaces

  rwArgRef = name

  rewriteScope =
    | "⎡" spaces "⎨" spaces name spaces rewriteFormatString spaces "⎬" spaces rewriteScope spaces "⎦" spaces -- within_support_wrapper
    | "⎡" spaces name spaces "=" spaces rewriteFormatString spaces rewriteScope spaces "⎦" spaces -- with_parameter
    | rewriteScopeRaw -- raw
  rewriteScopeRaw = #rewriteFormatString
  
  rewriteFormatString = "‛" formatChar* "’"
  formatChar =
    | "⎨" spaces name spaces supportArgsForInterpolation spaces "⎬" -- support_interpolation
    | "⟪" rwArgRef "⟫" -- parameter_interpolation
    | "«" rwArgRef "»" -- arg_interpolation
    | "\\" any -- escaped
    | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any -- raw_character

  before = "⎨" spaces name spaces supportArgsForBefore spaces "⎬"

  supportArgsForInterpolation = rewriteFormatString wsRewriteFormatString_for_interpolation*
  wsRewriteFormatString_for_interpolation = spaces rewriteFormatString
  supportArgsForBefore = rewriteFormatString wsRewriteFormatString_for_before*
  wsRewriteFormatString_for_before = spaces rewriteFormatString
}
`;

const rewrite_js = {
main : function (_ParameterDefs, _rewriteDef, ) {
let ParameterDefs = undefined;
let rewriteDef = undefined;
_.enter_rule ("main");
ParameterDefs = _ParameterDefs.rwr ().join ('')
rewriteDef = _rewriteDef.rwr ()


_.set_return (`
${ParameterDefs}
${rewriteDef}

`);

return _.exit_rule ("main");
},
ParameterDef : function (__p, _name, ) {
let _p = undefined;
let name = undefined;
_.enter_rule ("ParameterDef");
_p = __p.rwr ()
name = _name.rwr ()


_.set_return (`\nlet ${name}_stack = [];${_.memo_parameter (`${name}`)}`);

return _.exit_rule ("ParameterDef");
},
rewriteDef : function (__r, _ws, _name, _ws2, _lb, _ws3, _rewriteRules, _ws4, _rb, _ws5, ) {
let _r = undefined;
let ws = undefined;
let name = undefined;
let ws2 = undefined;
let lb = undefined;
let ws3 = undefined;
let rewriteRules = undefined;
let ws4 = undefined;
let rb = undefined;
let ws5 = undefined;
_.enter_rule ("rewriteDef");
_r = __r.rwr ()
ws = _ws.rwr ()
name = _name.rwr ()
ws2 = _ws2.rwr ()
lb = _lb.rwr ()
ws3 = _ws3.rwr ()
rewriteRules = _rewriteRules.rwr ().join ('')
ws4 = _ws4.rwr ()
rb = _rb.rwr ()
ws5 = _ws5.rwr ()


_.set_return (`const rewrite_js = {${rewriteRules}
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};


`);

return _.exit_rule ("rewriteDef");
},
rule_parameter_as_string : function (_lq, _cs, _rq, ) {
let lq = undefined;
let cs = undefined;
let rq = undefined;
_.enter_rule ("rule_parameter_as_string");
lq = _lq.rwr ()
cs = _cs.rwr ()
rq = _rq.rwr ()


_.set_return (`"% parameter"`);

return _.exit_rule ("rule_parameter_as_string");
},
rule_rewrite_as_string : function (_lq, _cs, _rq, ) {
let lq = undefined;
let cs = undefined;
let rq = undefined;
_.enter_rule ("rule_rewrite_as_string");
lq = _lq.rwr ()
cs = _cs.rwr ()
rq = _rq.rwr ()


_.set_return (`"% rewrite"`);

return _.exit_rule ("rule_rewrite_as_string");
},
rule_basic : function (_cs, ) {
let cs = undefined;
_.enter_rule ("rule_basic");
cs = _cs.rwr ()


_.set_return (`${cs}`);

return _.exit_rule ("rule_basic");
},
name : function (_nameFirst, _nameRest, ) {
let nameFirst = undefined;
let nameRest = undefined;
_.enter_rule ("name");
nameFirst = _nameFirst.rwr ()
nameRest = _nameRest.rwr ().join ('')


_.set_return (`${nameFirst}${nameRest}`);

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
rewriteRule_withbefore : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, _before, _ws7, __eq, _ws5, _rewriteScope, _ws6, ) {
let rwName = undefined;
let ws1 = undefined;
let lb = undefined;
let ws2 = undefined;
let rwParameterDefs = undefined;
let ws3 = undefined;
let rb = undefined;
let ws4 = undefined;
let before = undefined;
let ws7 = undefined;
let _eq = undefined;
let ws5 = undefined;
let rewriteScope = undefined;
let ws6 = undefined;
let _pre = _.reset_stacks (``);
_.enter_rule ("rewriteRule_withbefore");

rwName = _rwName.rwr ()
ws1 = _ws1.rwr ()
lb = _lb.rwr ()
ws2 = _ws2.rwr ()
rwParameterDefs = _rwParameterDefs.rwr ().join ('')
ws3 = _ws3.rwr ().join ('')
rb = _rb.rwr ()
ws4 = _ws4.rwr ()
before = _before.rwr ()
ws7 = _ws7.rwr ()
_eq = __eq.rwr ()
ws5 = _ws5.rwr ()
rewriteScope = _rewriteScope.rwr ()
ws6 = _ws6.rwr ()


_.set_return (`
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
let _pre = ${before};
_.enter_rule ("${rwName}");
${_.foreach_parameter (`☐_stack.push (☐_stack [☐_stack.length-1]);`)}
${_.args_as_string (``)}
${rewriteScope}
${_.foreach_parameter (`☐_stack.pop ();`)}
return _.exit_rule ("${rwName}");
},`);


return _.exit_rule ("rewriteRule_withbefore");
},
rewriteRule_plain_no_scope : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, __eq, _ws5, _raw, _ws6, ) {
let rwName = undefined;
let ws1 = undefined;
let lb = undefined;
let ws2 = undefined;
let rwParameterDefs = undefined;
let ws3 = undefined;
let rb = undefined;
let ws4 = undefined;
let _eq = undefined;
let ws5 = undefined;
let raw = undefined;
let ws6 = undefined;
let _pre = _.reset_stacks (``);
_.enter_rule ("rewriteRule_plain_no_scope");

rwName = _rwName.rwr ()
ws1 = _ws1.rwr ()
lb = _lb.rwr ()
ws2 = _ws2.rwr ()
rwParameterDefs = _rwParameterDefs.rwr ().join ('')
ws3 = _ws3.rwr ().join ('')
rb = _rb.rwr ()
ws4 = _ws4.rwr ()
_eq = __eq.rwr ()
ws5 = _ws5.rwr ()
raw = _raw.rwr ()
ws6 = _ws6.rwr ()


_.set_return (`
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
_.enter_rule ("${rwName}");
${_.args_as_string (``)}
${raw}
return _.exit_rule ("${rwName}");
},`);


return _.exit_rule ("rewriteRule_plain_no_scope");
},
rewriteRule_plain : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, __eq, _ws5, _rewriteScope, _ws6, ) {
let rwName = undefined;
let ws1 = undefined;
let lb = undefined;
let ws2 = undefined;
let rwParameterDefs = undefined;
let ws3 = undefined;
let rb = undefined;
let ws4 = undefined;
let _eq = undefined;
let ws5 = undefined;
let rewriteScope = undefined;
let ws6 = undefined;
let _pre = _.reset_stacks (``);
_.enter_rule ("rewriteRule_plain");

rwName = _rwName.rwr ()
ws1 = _ws1.rwr ()
lb = _lb.rwr ()
ws2 = _ws2.rwr ()
rwParameterDefs = _rwParameterDefs.rwr ().join ('')
ws3 = _ws3.rwr ().join ('')
rb = _rb.rwr ()
ws4 = _ws4.rwr ()
_eq = __eq.rwr ()
ws5 = _ws5.rwr ()
rewriteScope = _rewriteScope.rwr ()
ws6 = _ws6.rwr ()


_.set_return (`
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
_.enter_rule ("${rwName}");
${_.foreach_parameter (`☐_stack.push (☐_stack [☐_stack.length-1]);`)}
${_.args_as_string (``)}
${rewriteScope}
${_.foreach_parameter (`☐_stack.pop ();`)}
return _.exit_rule ("${rwName}");
},`);


return _.exit_rule ("rewriteRule_plain");
},
rwRuleName : function (_name, ) {
let name = undefined;
_.enter_rule ("rwRuleName");
name = _name.rwr ()


_.set_return (`${name}`);

return _.exit_rule ("rwRuleName");
},
rwArgDef : function (_name, ) {
let name = undefined;
_.enter_rule ("rwArgDef");
name = _name.rwr ()


_.set_return (`_${name}, ${_.memo_arg (`${name}`, `☐ = _☐.rwr ()\n`)}`);

return _.exit_rule ("rwArgDef");
},
rwIterArgDef : function (_name, _op, ) {
let name = undefined;
let op = undefined;
_.enter_rule ("rwIterArgDef");
name = _name.rwr ()
op = _op.rwr ()


_.set_return (`_${name}, ${_.memo_arg (`${name}`, `☐ = _☐.rwr ().join ('')\n`)}`);

return _.exit_rule ("rwIterArgDef");
},
rwParenthesizedIterArgDef : function (_lb, _defs, _rb, _op, ) {
let lb = undefined;
let defs = undefined;
let rb = undefined;
let op = undefined;
_.enter_rule ("rwParenthesizedIterArgDef");
lb = _lb.rwr ()
defs = _defs.rwr ().join ('')
rb = _rb.rwr ()
op = _op.rwr ()


_.set_return (`${defs}`);

return _.exit_rule ("rwParenthesizedIterArgDef");
},
rwParameterDef : function (_def, ) {
let def = undefined;
_.enter_rule ("rwParameterDef");
def = _def.rwr ()


_.set_return (`${def}`);

return _.exit_rule ("rwParameterDef");
},
rwArgRef : function (_name, ) {
let name = undefined;
_.enter_rule ("rwArgRef");
name = _name.rwr ()


_.set_return (`${name}`);

return _.exit_rule ("rwArgRef");
},
rwParenArgDef : function (_name, _ws, ) {
let name = undefined;
let ws = undefined;
_.enter_rule ("rwParenArgDef");
name = _name.rwr ()
ws = _ws.rwr ()


_.set_return (`_${name}, ${_.memo_arg (`${name}`, `☐ = _☐.rwr ().join ('')\n`)}`);

return _.exit_rule ("rwParenArgDef");
},
rewriteScope_within_support_wrapper : function (_lb, _ws1, _lb2, _ws2, _name, _ws3, _s, _ws4, _rb2, _ws5, _scope, _ws6, _rb, _ws7, ) {
let lb = undefined;
let ws1 = undefined;
let lb2 = undefined;
let ws2 = undefined;
let name = undefined;
let ws3 = undefined;
let s = undefined;
let ws4 = undefined;
let rb2 = undefined;
let ws5 = undefined;
let scope = undefined;
let ws6 = undefined;
let rb = undefined;
let ws7 = undefined;
_.enter_rule ("rewriteScope_within_support_wrapper");
lb = _lb.rwr ()
ws1 = _ws1.rwr ()
lb2 = _lb2.rwr ()
ws2 = _ws2.rwr ()
name = _name.rwr ()
ws3 = _ws3.rwr ()
s = _s.rwr ()
ws4 = _ws4.rwr ()
rb2 = _rb2.rwr ()
ws5 = _ws5.rwr ()
scope = _scope.rwr ()
ws6 = _ws6.rwr ()
rb = _rb.rwr ()
ws7 = _ws7.rwr ()


_.set_return (`
_.pre_${name} (\`${s}\`);
${scope}
_.post_${name} (\`${s}\`);`);

return _.exit_rule ("rewriteScope_within_support_wrapper");
},
rewriteScope_with_parameter : function (_lb, _ws1, _name, _ws2, __eq, _ws3, _rewriteFormatString, _ws4, _rewriteScope, _ws5, _rb, _ws6, ) {
let lb = undefined;
let ws1 = undefined;
let name = undefined;
let ws2 = undefined;
let _eq = undefined;
let ws3 = undefined;
let rewriteFormatString = undefined;
let ws4 = undefined;
let rewriteScope = undefined;
let ws5 = undefined;
let rb = undefined;
let ws6 = undefined;
_.enter_rule ("rewriteScope_with_parameter");
lb = _lb.rwr ()
ws1 = _ws1.rwr ()
name = _name.rwr ()
ws2 = _ws2.rwr ()
_eq = __eq.rwr ()
ws3 = _ws3.rwr ()
rewriteFormatString = _rewriteFormatString.rwr ()
ws4 = _ws4.rwr ()
rewriteScope = _rewriteScope.rwr ()
ws5 = _ws5.rwr ()
rb = _rb.rwr ()
ws6 = _ws6.rwr ()


_.set_return (`_.set_top (${name}_stack, \`${rewriteFormatString}\`);\n${rewriteScope}`);

return _.exit_rule ("rewriteScope_with_parameter");
},
rewriteScope_raw : function (_x, ) {
let x = undefined;
_.enter_rule ("rewriteScope_raw");
x = _x.rwr ()


_.set_return (`${x}`);

return _.exit_rule ("rewriteScope_raw");
},
rewriteScopeRaw : function (_rewriteFormatString, ) {
let rewriteFormatString = undefined;
_.enter_rule ("rewriteScopeRaw");
rewriteFormatString = _rewriteFormatString.rwr ()


_.set_return (`\n_.set_return (\`${rewriteFormatString}\`);\n`);

return _.exit_rule ("rewriteScopeRaw");
},
rewriteFormatString : function (_lq, _formatChars, _rq, ) {
let lq = undefined;
let formatChars = undefined;
let rq = undefined;
_.enter_rule ("rewriteFormatString");
lq = _lq.rwr ()
formatChars = _formatChars.rwr ().join ('')
rq = _rq.rwr ()


_.set_return (`${formatChars}`);

return _.exit_rule ("rewriteFormatString");
},
formatChar_support_interpolation : function (_lb, _ws1, _name, _ws2, _interpolation_args, _ws3, _rb, ) {
let lb = undefined;
let ws1 = undefined;
let name = undefined;
let ws2 = undefined;
let interpolation_args = undefined;
let ws3 = undefined;
let rb = undefined;
_.enter_rule ("formatChar_support_interpolation");
lb = _lb.rwr ()
ws1 = _ws1.rwr ()
name = _name.rwr ()
ws2 = _ws2.rwr ()
interpolation_args = _interpolation_args.rwr ()
ws3 = _ws3.rwr ()
rb = _rb.rwr ()


_.set_return (`\$\{_.${name} (${interpolation_args})\}`);

return _.exit_rule ("formatChar_support_interpolation");
},
formatChar_arg_interpolation : function (_lb, _rwRef, _rb, ) {
let lb = undefined;
let rwRef = undefined;
let rb = undefined;
_.enter_rule ("formatChar_arg_interpolation");
lb = _lb.rwr ()
rwRef = _rwRef.rwr ()
rb = _rb.rwr ()


_.set_return (`\$\{${rwRef}\}`);

return _.exit_rule ("formatChar_arg_interpolation");
},
formatChar_parameter_interpolation : function (_lb, _rwRef, _rb, ) {
let lb = undefined;
let rwRef = undefined;
let rb = undefined;
_.enter_rule ("formatChar_parameter_interpolation");
lb = _lb.rwr ()
rwRef = _rwRef.rwr ()
rb = _rb.rwr ()


_.set_return (`\$\{_.top (${rwRef}_stack)\}`);

return _.exit_rule ("formatChar_parameter_interpolation");
},
formatChar_escaped : function (__bslash, _c, ) {
let _bslash = undefined;
let c = undefined;
_.enter_rule ("formatChar_escaped");
_bslash = __bslash.rwr ()
c = _c.rwr ()


_.set_return (`${_bslash}${c}`);

return _.exit_rule ("formatChar_escaped");
},
formatChar_raw_character : function (_c, ) {
let c = undefined;
_.enter_rule ("formatChar_raw_character");
c = _c.rwr ()


_.set_return (`${c}`);

return _.exit_rule ("formatChar_raw_character");
},
before : function (_lb, _ws1, _name, _ws2, _before_args, _ws3, _rb, ) {
let lb = undefined;
let ws1 = undefined;
let name = undefined;
let ws2 = undefined;
let before_args = undefined;
let ws3 = undefined;
let rb = undefined;
_.enter_rule ("before");
lb = _lb.rwr ()
ws1 = _ws1.rwr ()
name = _name.rwr ()
ws2 = _ws2.rwr ()
before_args = _before_args.rwr ()
ws3 = _ws3.rwr ()
rb = _rb.rwr ()


_.set_return (`_.${name} (${before_args})`);

return _.exit_rule ("before");
},
supportArgsForInterpolation : function (_s, _more, ) {
let s = undefined;
let more = undefined;
_.enter_rule ("supportArgsForInterpolation");
s = _s.rwr ()
more = _more.rwr ().join ('')


_.set_return (`\`${s}\`${more}`);

return _.exit_rule ("supportArgsForInterpolation");
},
wsRewriteFormatString_for_interpolation : function (_ws, _s, ) {
let ws = undefined;
let s = undefined;
_.enter_rule ("wsRewriteFormatString_for_interpolation");
ws = _ws.rwr ()
s = _s.rwr ()


_.set_return (`, \`${s}\``);

return _.exit_rule ("wsRewriteFormatString_for_interpolation");
},
supportArgsForBefore : function (_s, _more, ) {
let s = undefined;
let more = undefined;
_.enter_rule ("supportArgsForBefore");
s = _s.rwr ()
more = _more.rwr ().join ('')


_.set_return (`\`${s}\`${more}`);

return _.exit_rule ("supportArgsForBefore");
},
wsRewriteFormatString_for_before : function (_ws, _s, ) {
let ws = undefined;
let s = undefined;
_.enter_rule ("wsRewriteFormatString_for_before");
ws = _ws.rwr ()
s = _s.rwr ()


_.set_return (`, \`${s}\``);

return _.exit_rule ("wsRewriteFormatString_for_before");
},
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};







function transpile_t2t (grammar_spec, rewrite_spec) {
    let parser = ohm.grammar (grammar_spec);
    let cst = parser.match (rewrite_spec);
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
const argv = process.argv.slice(2);
let dslGrammarFilename = argv[0];
let dslRewriteFilename = argv[1];
let srcFilename = argv[2];
let dslGrammar = fs.readFileSync(dslGrammarFilename, 'utf-8');
let dslRewrite = fs.readFileSync(dslRewriteFilename, 'utf-8');
var generated = transpile_t2t (grammar, dslRewrite);
if (srcFilename) {
    var boilerplate = `

    function t2t_phase2 (grammr, sem, scn) {
        let parser = ohm.grammar (grammr);
        let cst = parser.match (src);
        if (cst.succeeded ()) {
            let cstSemantics = parser.createSemantics ();
            cstSemantics.addOperation ('rwr', sem);
            var generated_code = cstSemantics (cst).rwr ();
            return generated_code;
        } else {
            return cst.message; 
        }
    }

    t2t_phase2 (dslGrammar, rewrite_js, src);
    `;
    var phase2 = generated + boilerplate;
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    try {
	var result = eval (phase2);
	console.log (result);
    }
    catch (e) {
	console.log (phase2);
	console.log (e);
    }
} else {
    var pre_boilerplate = `
        'use strict'

        import {_} from './support.mjs';
        import * as ohm from 'ohm-js';

        let return_value_stack = [];
        let rule_name_stack = [];

        const grammar = String.raw${"`"}
    `;
    var mid_boilerplate = "`;";
    var post_boilerplate = `
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
    `;
    let program = pre_boilerplate + dslGrammar + mid_boilerplate + generated + post_boilerplate;
    console.log (program);
}
