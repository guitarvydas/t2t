'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];


const grammar = String.raw`
t2t {


  main = grammarDef applySyntactic<ParameterDef>* rewriteDef

  grammarDef = "% grammar" spaces name spaces rule+
  ParameterDef = "% parameter" name
  rewriteDef = "% rewrite" spaces rewriteRule+


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
  rewriteRule = rwRuleName spaces "[" spaces (rwParameterDef spaces)+ "]" spaces "=" spaces rewriteScope spaces

  rwRuleName = name
  rwPredicateDef = name
  rwIterPredicateDef = name ("+" | "*" | "?")
  rwParenthesizedIterPredicateDef = "(" rwParenPredicateDef+ ")" ("+" | "*" | "?")
  rwParameterDef = (rwParenthesizedIterPredicateDef | rwIterPredicateDef | rwPredicateDef)
  rwParenPredicateDef = name spaces

  rwPredicateRef = name

  rewriteScope =
    | "⎡" spaces "⎨" spaces name spaces rewriteFormatString spaces "⎬" spaces rewriteScope spaces "⎦" spaces -- within_support_wrapper
    | "⎡" spaces name spaces "=" spaces rewriteFormatString spaces rewriteScope spaces "⎦" spaces -- with_parameter
    | #rewriteFormatString -- raw
  rewriteFormatString = "‛" formatChar* "’"
  formatChar =
    | "⎨" spaces name spaces rewriteFormatString spaces "⎬" -- support_interpolation
    | "⟪" rwPredicateRef "⟫" -- parameter_interpolation
    | "«" rwPredicateRef "»" -- predicate_interpolation
    | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any -- raw_character



}
`;

const rewrite_code = {
main : function (grammarDef, ParameterDefs, rewriteDef, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "main");

grammarDef = grammarDef.rwr ();
ParameterDefs = ParameterDefs.rwr ().join ('');
rewriteDef = rewriteDef.rwr ();

_.set_top (return_value_stack, `
      'use strict'

      import {_} from './support.mjs';
      import * as ohm from 'ohm-js';

      let return_value_stack = [];
      let rule_name_stack = [];
      ${ParameterDefs}
      ${grammarDef}
      ${rewriteDef}

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

      import * as fs from 'fs';
      let src = fs.readFileSync(0, 'utf-8');
      var result = main (src);
      console.log (result);
      `);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
ParameterDef : function (_p, name, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "ParameterDef");

_p = _p.rwr ();
name = name.rwr ();

_.set_top (return_value_stack, `\nlet ${name}_stack = [];${_.memo_parameter (`${name}`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
grammarDef : function (_g, ws, name, ws2, rules, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "grammarDef");

_g = _g.rwr ();
ws = ws.rwr ();
name = name.rwr ();
ws2 = ws2.rwr ();
rules = rules.rwr ().join ('');

_.set_top (return_value_stack, `
      const grammar = String.raw\\\`
      ${name} {
      ${rules}
      }
      \\\`;
      `);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteDef : function (_r, ws, rewriteRules, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteDef");

_r = _r.rwr ();
ws = ws.rwr ();
rewriteRules = rewriteRules.rwr ().join ('');

_.set_top (return_value_stack, `const rewrite_code = {${rewriteRules}
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};
`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_parameter_as_string : function (lq, cs, rq, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_parameter_as_string");

lq = lq.rwr ();
cs = cs.rwr ();
rq = rq.rwr ();

_.set_top (return_value_stack, `"% parameter"`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_rewrite_as_string : function (lq, cs, rq, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_rewrite_as_string");

lq = lq.rwr ();
cs = cs.rwr ();
rq = rq.rwr ();

_.set_top (return_value_stack, `"% rewrite"`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_basic : function (cs, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_basic");

cs = cs.rwr ();

_.set_top (return_value_stack, `${cs}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
name : function (nameFirst, nameRest, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "name");

nameFirst = nameFirst.rwr ();
nameRest = nameRest.rwr ().join ('');

_.set_top (return_value_stack, `${nameFirst}${nameRest}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
nameFirst : function (c, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameFirst");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
nameRest : function (c, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameRest");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteRule : function (rwName, ws1, lb, ws2, rwParameterDefs, ws3, rb, ws4, _eq, ws5, rewriteScope, ws6, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteRule");

rwName = rwName.rwr ();
ws1 = ws1.rwr ();
lb = lb.rwr ();
ws2 = ws2.rwr ();
rwParameterDefs = rwParameterDefs.rwr ().join ('');
ws3 = ws3.rwr ().join ('');
rb = rb.rwr ();
ws4 = ws4.rwr ();
_eq = _eq.rwr ();
ws5 = ws5.rwr ();
rewriteScope = rewriteScope.rwr ();
ws6 = ws6.rwr ();


_.pre_reset_stacks (``);
_.set_top (return_value_stack, `
      ${rwName} : function (${rwParameterDefs}) {
      return_value_stack.push ("");
      rule_name_stack.push ("");
      _.set_top (rule_name_stack, "${rwName}");
      ${_.foreach_parameter (`_stack.push ('');`)}
      ${_.predicate_expansions_as_string (``)}
      ${rewriteScope}
      ${_.foreach_parameter (`_stack.pop ();`)}
      rule_name_stack.pop ();
      return return_value_stack.pop ();
      },
    `);

_.post_reset_stacks (``);

rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwRuleName : function (name, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwRuleName");

name = name.rwr ();

_.set_top (return_value_stack, `${name}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwPredicateDef : function (name, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwPredicateDef");

name = name.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwIterPredicateDef : function (name, op, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwIterPredicateDef");

name = name.rwr ();
op = op.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_iter_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParenthesizedIterPredicateDef : function (lb, defs, rb, op, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParenthesizedIterPredicateDef");

lb = lb.rwr ();
defs = defs.rwr ().join ('');
rb = rb.rwr ();
op = op.rwr ();

_.set_top (return_value_stack, `${defs}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParameterDef : function (def, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParameterDef");

def = def.rwr ();

_.set_top (return_value_stack, `${def}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwPredicateRef : function (name, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwPredicateRef");

name = name.rwr ();

_.set_top (return_value_stack, `${name}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParenPredicateDef : function (name, ws, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParenPredicateDef");

name = name.rwr ();
ws = ws.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_iter_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_within_support_wrapper : function (lb, ws1, lb2, ws2, name, ws3, s, ws4, rb2, ws5, scope, ws6, rb, ws7, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_within_support_wrapper");

lb = lb.rwr ();
ws1 = ws1.rwr ();
lb2 = lb2.rwr ();
ws2 = ws2.rwr ();
name = name.rwr ();
ws3 = ws3.rwr ();
s = s.rwr ();
ws4 = ws4.rwr ();
rb2 = rb2.rwr ();
ws5 = ws5.rwr ();
scope = scope.rwr ();
ws6 = ws6.rwr ();
rb = rb.rwr ();
ws7 = ws7.rwr ();

_.set_top (return_value_stack, `
_.pre_${name} (\\\`${s}\\\`);
${scope}
_.post_${name} (\\\`${s}\\\`);`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_with_parameter : function (lb, ws1, name, ws2, _eq, ws3, rewriteFormatString, ws4, rewriteScope, ws5, rb, ws6, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_with_parameter");

lb = lb.rwr ();
ws1 = ws1.rwr ();
name = name.rwr ();
ws2 = ws2.rwr ();
_eq = _eq.rwr ();
ws3 = ws3.rwr ();
rewriteFormatString = rewriteFormatString.rwr ();
ws4 = ws4.rwr ();
rewriteScope = rewriteScope.rwr ();
ws5 = ws5.rwr ();
rb = rb.rwr ();
ws6 = ws6.rwr ();

_.set_top (return_value_stack, `_.set_top (${name}_stack, \\\`${rewriteFormatString}\\\`);\n${rewriteScope}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_raw : function (rewriteFormatString, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_raw");

rewriteFormatString = rewriteFormatString.rwr ();

_.set_top (return_value_stack, `_.set_top (return_value_stack, \\\`${rewriteFormatString}\\\`);\n`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteFormatString : function (lq, formatChars, rq, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteFormatString");

lq = lq.rwr ();
formatChars = formatChars.rwr ().join ('');
rq = rq.rwr ();

_.set_top (return_value_stack, `${formatChars}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_support_interpolation : function (lb, ws1, name, ws2, s, ws3, rb, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_support_interpolation");

lb = lb.rwr ();
ws1 = ws1.rwr ();
name = name.rwr ();
ws2 = ws2.rwr ();
s = s.rwr ();
ws3 = ws3.rwr ();
rb = rb.rwr ();

_.set_top (return_value_stack, `\\\$\\\{_.${name} (\\\`${s}\\\`)\\\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_predicate_interpolation : function (lb, rwRef, rb, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_predicate_interpolation");

lb = lb.rwr ();
rwRef = rwRef.rwr ();
rb = rb.rwr ();

_.set_top (return_value_stack, `\\\$\\\{${rwRef}\\\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_parameter_interpolation : function (lb, rwRef, rb, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_parameter_interpolation");

lb = lb.rwr ();
rwRef = rwRef.rwr ();
rb = rb.rwr ();

_.set_top (return_value_stack, `\\\$\\\{_.top (${rwRef}_stack)\\\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_raw_character : function (c, ) {
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_raw_character");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


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

import * as fs from 'fs';
let src = fs.readFileSync(0, 'utf-8');
var result = main (src);
console.log (result);
