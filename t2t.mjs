'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];


const grammar = String.raw`
t2t {


  main = grammarDef applySyntactic<StackDef>* rewriteDef

  grammarDef = "% grammar" spaces name spaces rule+
  StackDef = "% parameter" name
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
  rewriteRule = rwRuleName spaces "[" spaces (rwArgDef spaces)+ "]" spaces pre? spaces "=" spaces rewriteScope spaces

  rwArgDef = (rwParenthesizedIterArgDef | rwIterArgDef | rwSimpleArgDef)
  rwRuleName = name

  rwSimpleArgDef = name
  rwIterArgDef = name ("+" | "*" | "?")
  rwParenthesizedIterArgDef = "(" rwInsideParenArgDef+ ")" ("+" | "*" | "?")
  rwInsideParenArgDef = name spaces


  rewriteScope =
    | "⎡" spaces "⎨" spaces name spaces rewriteFormatString spaces "⎬" spaces rewriteScope spaces "⎦" spaces -- within_support_wrapper
    | "⎡" spaces name spaces "=" spaces rewriteFormatString spaces rewriteScope spaces "⎦" spaces -- with_parameter
    | #rewriteFormatString -- raw
  rewriteFormatString = "‛" formatChar* "’"
  formatChar =
    | "⎨" spaces name spaces rewriteFormatString spaces "⎬" -- support_interpolation
    | "⟪" rwStack_Ref "⟫" -- stack_interpolation
    | "«" rwArg_Ref "»" -- arg_interpolation
    | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any -- raw_character

  rwArg_Ref = name
  rwStack_Ref = name

  pre = rewriteFormatString
  

}
`;

const rewrite_code = {
main : function (grammarDef, StackDefs, rewriteDef, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "main");

grammarDef = grammarDef.rwr ();
StackDefs = StackDefs.rwr ().join ('');
rewriteDef = rewriteDef.rwr ();

_.set_top (return_value_stack, `
      'use strict'

      import {_} from './support.mjs';
      import * as ohm from 'ohm-js';

      let return_value_stack = [];
      let rule_name_stack = [];
      ${StackDefs}
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
StackDef : function (_p, name, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "StackDef");

_p = _p.rwr ();
name = name.rwr ();

_.set_top (return_value_stack, `\nlet ${name}_stack = [];${_.memo_parameter (`${name}`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
grammarDef : function (_g, ws, name, ws2, rules, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "grammarDef");

_g = _g.rwr ();
ws = ws.rwr ();
name = name.rwr ();
ws2 = ws2.rwr ();
rules = rules.rwr ().join ('');

_.set_top (return_value_stack, `
      const grammar = String.raw\`
      ${name} {
      ${rules}
      }
      \`;
      `);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteDef : function (_r, ws, rewriteRules, ) {
let _pre = "";
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
let _pre = "";
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
let _pre = "";
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
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_basic");

cs = cs.rwr ();

_.set_top (return_value_stack, `${cs}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
name : function (nameFirst, nameRest, ) {
let _pre = "";
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
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameFirst");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
nameRest : function (c, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameRest");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteRule : function (rwName, ws1, lb, ws2, rwArgDefs, ws3, rb, ws4, pre, ws7, _eq, ws5, rewriteScope, ws6, ) {
let _pre = "${_.reset_stacks (``)}";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteRule");

rwName = rwName.rwr ();
ws1 = ws1.rwr ();
lb = lb.rwr ();
ws2 = ws2.rwr ();
rwArgDefs = rwArgDefs.rwr ().join ('');
ws3 = ws3.rwr ().join ('');
rb = rb.rwr ();
ws4 = ws4.rwr ();
pre = pre.rwr ().join ('');
ws7 = ws7.rwr ();
_eq = _eq.rwr ();
ws5 = ws5.rwr ();
rewriteScope = rewriteScope.rwr ();
ws6 = ws6.rwr ();

_.set_top (return_value_stack, `
      ${rwName} : function (${rwArgDefs}) {
      let _pre = "${pre}";
      return_value_stack.push ("");
      rule_name_stack.push ("");
      _.set_top (rule_name_stack, "${rwName}");
      ${_.foreach_parameter (`☐_stack.push ('');`)}
      ${_.foreach_arg (`☐ = ☐.rwr ();`)}
      ${_.arg_joins_as_string (``)}
      ${rewriteScope}
      ${_.foreach_parameter (`☐_stack.pop ();`)}
      rule_name_stack.pop ();
      return return_value_stack.pop ();
      },
    `);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwArgDef : function (def, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwArgDef");

def = def.rwr ();

_.set_top (return_value_stack, `${def}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwRuleName : function (name, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwRuleName");

name = name.rwr ();

_.set_top (return_value_stack, `${name}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwSimpleArgDef : function (name, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwSimpleArgDef");

name = name.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwIterArgDef : function (name, op, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwIterArgDef");

name = name.rwr ();
op = op.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_iter_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParenthesizedIterArgDef : function (lb, defs, rb, op, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParenthesizedIterArgDef");

lb = lb.rwr ();
defs = defs.rwr ().join ('');
rb = rb.rwr ();
op = op.rwr ();

_.set_top (return_value_stack, `${defs}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwInsideParenArgDef : function (name, ws, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwInsideParenArgDef");

name = name.rwr ();
ws = ws.rwr ();

_.set_top (return_value_stack, `${name}, ${_.memo_iter_predicate (`name`)}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_within_support_wrapper : function (lb, ws1, lb2, ws2, name, ws3, s, ws4, rb2, ws5, scope, ws6, rb, ws7, ) {
let _pre = "";
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
_.pre_${name} (\`${s}\`);
${scope}
_.post_${name} (\`${s}\`);`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_with_parameter : function (lb, ws1, name, ws2, _eq, ws3, rewriteFormatString, ws4, rewriteScope, ws5, rb, ws6, ) {
let _pre = "";
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

_.set_top (return_value_stack, `_.set_top (${name}_stack, \`${rewriteFormatString}\`);\n${rewriteScope}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_raw : function (rewriteFormatString, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_raw");

rewriteFormatString = rewriteFormatString.rwr ();

_.set_top (return_value_stack, `_.set_top (return_value_stack, \`${rewriteFormatString}\`);\n`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteFormatString : function (lq, formatChars, rq, ) {
let _pre = "";
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
let _pre = "";
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

_.set_top (return_value_stack, `\$\{_.${name} (\`${s}\`)\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_stack_interpolation : function (lb, rwRef, rb, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_stack_interpolation");

lb = lb.rwr ();
rwRef = rwRef.rwr ();
rb = rb.rwr ();

_.set_top (return_value_stack, `\$\{_.top (${rwRef}_stack)\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_arg_interpolation : function (lb, rwRef, rb, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_arg_interpolation");

lb = lb.rwr ();
rwRef = rwRef.rwr ();
rb = rb.rwr ();

_.set_top (return_value_stack, `\$\{${rwRef}\}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_raw_character : function (c, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_raw_character");

c = c.rwr ();

_.set_top (return_value_stack, `${c}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwArg_Ref : function (name, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwArg_Ref");

name = name.rwr ();

_.set_top (return_value_stack, `${name}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwStack_Ref : function (name, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwStack_Ref");

name = name.rwr ();

_.set_top (return_value_stack, `${name}`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
pre : function (s, ) {
let _pre = "";
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "pre");

s = s.rwr ();

_.set_top (return_value_stack, `${s}`);


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
