'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let _rewrite_support = {
    verbose : false,
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
    return_value_stack : [],
    rule_name_stack : [],
    depth_prefix : ' ',
    parameters : {},

    enter_rule : function (name) {
	if (_rewrite_support.verbose) {
	    console.error (_rewrite_support.depth_prefix, ["enter", name]);
	    _rewrite_support.depth_prefix += ' ';
	}
	_rewrite_support.return_value_stack.push ("");
	_rewrite_support.rule_name_stack.push (name);
    },
    set_return : function (v) {
	_rewrite_support.set_top (_rewrite_support.return_value_stack, v);
    },
    exit_rule : function (name) {
	if (_rewrite_support.verbose) {
	    _rewrite_support.depth_prefix = _rewrite_support.depth_prefix.substr (1);
	    console.error (_rewrite_support.depth_prefix, ["exit", name]);
	}
	_rewrite_support.rule_name_stack.pop ();
	return _rewrite_support.return_value_stack.pop ()
    },

    pushParameter : function (name, v) {
	if (! _rewrite_support.parameters [name]) {
	    _rewrite_support.parameters [name] = [];
	}
	_rewrite_support.parameters [name].push (v);
    },

    getParameter : function (name) {
	return _rewrite_support.top (_rewrite_support.parameters [name]);
    },

    popParameter : function (name) {
	if (_rewrite_support.parameters [name]) {
	    _rewrite_support.parameters [name].pop ();
	}
    }

};

// for debugging - use when needed
function dump_stacks () {
    console.error (_rewrite_support.rule_name_stack, _rewrite_support.return_value_stack, _rewrite_support.parameters);
}

const grammar = String.raw`
t2t  {
  Main = "a"
}
`;

Error: Found errors in the action dictionary of the 'rwr' operation:
- 'main' is not a valid semantic action for 't2t'
- 'parameterDef' is not a valid semantic action for 't2t'
- 'rewriteDef' is not a valid semantic action for 't2t'
- 'rewriteRule' is not a valid semantic action for 't2t'
- 'argDef_parenthesized' is not a valid semantic action for 't2t'
- 'argDef_iter' is not a valid semantic action for 't2t'
- 'argDef_plain' is not a valid semantic action for 't2t'
- 'rewriteScope_call' is not a valid semantic action for 't2t'
- 'rewriteScope_parameterbinding' is not a valid semantic action for 't2t'
- 'rewriteScope_plain' is not a valid semantic action for 't2t'
- 'rewriteFormatString' is not a valid semantic action for 't2t'
- 'formatItem_supportCall' is not a valid semantic action for 't2t'
- 'formatItem_parameter' is not a valid semantic action for 't2t'
- 'formatItem_arg' is not a valid semantic action for 't2t'
- 'formatItem_escapedCharacter' is not a valid semantic action for 't2t'
- 'formatItem_rawCharacter' is not a valid semantic action for 't2t'
- 'parenarg' is not a valid semantic action for 't2t'
- 'argstring' is not a valid semantic action for 't2t'
- 'argRef' is not a valid semantic action for 't2t'
- 'parameterRef' is not a valid semantic action for 't2t'
- 'ruleName' is not a valid semantic action for 't2t'
- 'name' is not a valid semantic action for 't2t'
- 'nameFirst' is not a valid semantic action for 't2t'
- 'nameRest' is not a valid semantic action for 't2t'
- 's_' is not a valid semantic action for 't2t'
    at Grammar._checkTopDownActionDict (file:///Users/paultarvydas/projects/node_modules/ohm-js/src/Grammar.js:141:21)
    at Operation.checkActionDict (file:///Users/paultarvydas/projects/node_modules/ohm-js/src/Semantics.js:620:13)
    at Semantics.addOperationOrAttribute (file:///Users/paultarvydas/projects/node_modules/ohm-js/src/Semantics.js:334:11)
    at proxy.addOperation (file:///Users/paultarvydas/projects/node_modules/ohm-js/src/Semantics.js:538:7)
    at file:///Users/paultarvydas/projects/t2t/new.dev.t2t.mjs:212:9
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:120:12) {
  problems: [
    "'main' is not a valid semantic action for 't2t'",
    "'parameterDef' is not a valid semantic action for 't2t'",
    "'rewriteDef' is not a valid semantic action for 't2t'",
    "'rewriteRule' is not a valid semantic action for 't2t'",
    "'argDef_parenthesized' is not a valid semantic action for 't2t'",
    "'argDef_iter' is not a valid semantic action for 't2t'",
    "'argDef_plain' is not a valid semantic action for 't2t'",
    "'rewriteScope_call' is not a valid semantic action for 't2t'",
    "'rewriteScope_parameterbinding' is not a valid semantic action for 't2t'",
    "'rewriteScope_plain' is not a valid semantic action for 't2t'",
    "'rewriteFormatString' is not a valid semantic action for 't2t'",
    "'formatItem_supportCall' is not a valid semantic action for 't2t'",
    "'formatItem_parameter' is not a valid semantic action for 't2t'",
    "'formatItem_arg' is not a valid semantic action for 't2t'",
    "'formatItem_escapedCharacter' is not a valid semantic action for 't2t'",
    "'formatItem_rawCharacter' is not a valid semantic action for 't2t'",
    "'parenarg' is not a valid semantic action for 't2t'",
    "'argstring' is not a valid semantic action for 't2t'",
    "'argRef' is not a valid semantic action for 't2t'",
    "'parameterRef' is not a valid semantic action for 't2t'",
    "'ruleName' is not a valid semantic action for 't2t'",
    "'name' is not a valid semantic action for 't2t'",
    "'nameFirst' is not a valid semantic action for 't2t'",
    "'nameRest' is not a valid semantic action for 't2t'",
    "'s_' is not a valid semantic action for 't2t'"
  ]
}
// node t2t.mjs test3.txt
import * as fs from 'fs';
const argv = process.argv.slice(2);
let srcFilename = argv[0];
if ('-' == srcFilename) { srcFilename = 0 }
let src = fs.readFileSync(srcFilename, 'utf-8');
try {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    let sem = parser.createSemantics ();
    sem.addOperation ('rwr', _rewrite);
    console.log (sem (cst).rwr ());
}
catch (e) {
    console.log (e);
}
