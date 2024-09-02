
'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let return_value_stack = [];
let rule_name_stack = [];


const grammar = String.raw`
t2t {
 
  main = grammarDef applySyntactic<ParameterDef>* rewriteDef

  grammarDef = "% grammar" spaces name rule+
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

const rewrite_code = {
main : function (_grammarDef, _ParameterDefs, _rewriteDef, ) {
//grammarDef,ParameterDefs,rewriteDef
let grammarDef = undefined;
let ParameterDefs = undefined;
let rewriteDef = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "main");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
ParameterDef : function (__p, _name, ) {
//_p,name
let _p = undefined;
let name = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "ParameterDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
grammarDef : function (__g, _ws, _name, _rules, ) {
//_g,ws,name,rules
let _g = undefined;
let ws = undefined;
let name = undefined;
let rules = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "grammarDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteDef : function (__r, _ws, _rewriteRules, ) {
//_r,ws,rewriteRules
let _r = undefined;
let ws = undefined;
let rewriteRules = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_parameter_as_string : function (_lq, _cs, _rq, ) {
//lq,cs,rq
let lq = undefined;
let cs = undefined;
let rq = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_parameter_as_string");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_rewrite_as_string : function (_lq, _cs, _rq, ) {
//lq,cs,rq
let lq = undefined;
let cs = undefined;
let rq = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_rewrite_as_string");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rule_basic : function (_cs, ) {
//cs
let cs = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rule_basic");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
name : function (_nameFirst, _nameRest, ) {
//nameFirst,nameRest
let nameFirst = undefined;
let nameRest = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "name");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
nameFirst : function (_c, ) {
//c
let c = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameFirst");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
nameRest : function (_c, ) {
//c
let c = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "nameRest");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteRule_withbefore : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, _before, _ws7, __eq, _ws5, _rewriteScope, _ws6, ) {
//rwName,ws1,lb,ws2,rwParameterDefs,ws3,rb,ws4,before,ws7,_eq,ws5,rewriteScope,ws6
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
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteRule_withbefore");

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


_.set_top (return_value_stack, `
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
let _pre = ${before};
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "${rwName}");
${_.foreach_parameter (`☐_stack.push (☐_stack [☐_stack.length-1]);`)}
${_.args_as_string (``)}
${rewriteScope}
${_.foreach_parameter (`☐_stack.pop ();`)}
rule_name_stack.pop ();
return return_value_stack.pop ();
},`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteRule_plain_no_scope : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, __eq, _ws5, _raw, _ws6, ) {
//rwName,ws1,lb,ws2,rwParameterDefs,ws3,rb,ws4,_eq,ws5,raw,ws6
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
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteRule_plain_no_scope");

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


_.set_top (return_value_stack, `
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "${rwName}");
${raw}
rule_name_stack.pop ();
return return_value_stack.pop ();
},`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteRule_plain : function (_rwName, _ws1, _lb, _ws2, _rwParameterDefs, _ws3, _rb, _ws4, __eq, _ws5, _rewriteScope, _ws6, ) {
//rwName,ws1,lb,ws2,rwParameterDefs,ws3,rb,ws4,_eq,ws5,rewriteScope,ws6
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
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteRule_plain");

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


_.set_top (return_value_stack, `
${rwName} : function (${rwParameterDefs}) {
${_.foreach_arg (`let ☐ = undefined;`)}
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "${rwName}");
${_.foreach_parameter (`☐_stack.push (☐_stack [☐_stack.length-1]);`)}
${_.args_as_string (``)}
${rewriteScope}
${_.foreach_parameter (`☐_stack.pop ();`)}
rule_name_stack.pop ();
return return_value_stack.pop ();
},`);


rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwRuleName : function (_name, ) {
//name
let name = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwRuleName");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwArgDef : function (_name, ) {
//name
let name = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwArgDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwIterArgDef : function (_name, _op, ) {
//name,op
let name = undefined;
let op = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwIterArgDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParenthesizedIterArgDef : function (_lb, _defs, _rb, _op, ) {
//lb,defs,rb,op
let lb = undefined;
let defs = undefined;
let rb = undefined;
let op = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParenthesizedIterArgDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParameterDef : function (_def, ) {
//def
let def = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParameterDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwArgRef : function (_name, ) {
//name
let name = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwArgRef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rwParenArgDef : function (_name, _ws, ) {
//name,ws
let name = undefined;
let ws = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rwParenArgDef");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_within_support_wrapper : function (_lb, _ws1, _lb2, _ws2, _name, _ws3, _s, _ws4, _rb2, _ws5, _scope, _ws6, _rb, _ws7, ) {
//lb,ws1,lb2,ws2,name,ws3,s,ws4,rb2,ws5,scope,ws6,rb,ws7
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
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_within_support_wrapper");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_with_parameter : function (_lb, _ws1, _name, _ws2, __eq, _ws3, _rewriteFormatString, _ws4, _rewriteScope, _ws5, _rb, _ws6, ) {
//lb,ws1,name,ws2,_eq,ws3,rewriteFormatString,ws4,rewriteScope,ws5,rb,ws6
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
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_with_parameter");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScope_raw : function (_x, ) {
//x
let x = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScope_raw");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteScopeRaw : function (_rewriteFormatString, ) {
//rewriteFormatString
let rewriteFormatString = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteScopeRaw");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
rewriteFormatString : function (_lq, _formatChars, _rq, ) {
//lq,formatChars,rq
let lq = undefined;
let formatChars = undefined;
let rq = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "rewriteFormatString");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_support_interpolation : function (_lb, _ws1, _name, _ws2, _interpolation_args, _ws3, _rb, ) {
//lb,ws1,name,ws2,interpolation_args,ws3,rb
let lb = undefined;
let ws1 = undefined;
let name = undefined;
let ws2 = undefined;
let interpolation_args = undefined;
let ws3 = undefined;
let rb = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_support_interpolation");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_arg_interpolation : function (_lb, _rwRef, _rb, ) {
//lb,rwRef,rb
let lb = undefined;
let rwRef = undefined;
let rb = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_arg_interpolation");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_parameter_interpolation : function (_lb, _rwRef, _rb, ) {
//lb,rwRef,rb
let lb = undefined;
let rwRef = undefined;
let rb = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_parameter_interpolation");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_escaped : function (__bslash, _c, ) {
//_bslash,c
let _bslash = undefined;
let c = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_escaped");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
formatChar_raw_character : function (_c, ) {
//c
let c = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "formatChar_raw_character");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
before : function (_lb, _ws1, _name, _ws2, _before_args, _ws3, _rb, ) {
//lb,ws1,name,ws2,before_args,ws3,rb
let lb = undefined;
let ws1 = undefined;
let name = undefined;
let ws2 = undefined;
let before_args = undefined;
let ws3 = undefined;
let rb = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "before");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
supportArgsForInterpolation : function (_s, _more, ) {
//s,more
let s = undefined;
let more = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "supportArgsForInterpolation");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
wsRewriteFormatString_for_interpolation : function (_ws, _s, ) {
//ws,s
let ws = undefined;
let s = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "wsRewriteFormatString_for_interpolation");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
supportArgsForBefore : function (_s, _more, ) {
//s,more
let s = undefined;
let more = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "supportArgsForBefore");
«raw»
rule_name_stack.pop ();
return return_value_stack.pop ();
},
wsRewriteFormatString_for_before : function (_ws, _s, ) {
//ws,s
let ws = undefined;
let s = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "wsRewriteFormatString_for_before");
«raw»
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
        return cst.message;	
    }
}

import * as fs from 'fs';
let src = fs.readFileSync(0, 'utf-8');
var result = main (src);
console.log (result);

