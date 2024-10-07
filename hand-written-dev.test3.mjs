'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let _rewrite_support = {
    verbose : true,
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
test3 {
  Main = "waltzing" Inner
  Inner = "matilda"
}
`;

let _rewrite = {
Main : function (w,inner,) {
_rewrite_support.enter_rule ("Main");
_rewrite_support.pushParameter ("previous", `${w.rwr ()}`);
_rewrite_support.set_return (`${inner.rwr ()}`);
_rewrite_support.popParameter ("previous");
return _rewrite_support.exit_rule ("Main");
},
Inner : function (m,) {
_rewrite_support.enter_rule ("Inner");
_rewrite_support.set_return (`${_rewrite_support.getParameter ("previous")}...${m.rwr ()}`);
return _rewrite_support.exit_rule ("Inner");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};


// node t2t.mjs test3.txt
import * as fs from 'fs';
const argv = process.argv.slice(2);
console.error (argv);
let srcFilename = argv[0];
if ('-' == srcFilename) { srcFilename = 0 }
let src = fs.readFileSync(srcFilename, 'utf-8');
console.error (srcFilename);
console.error (src);
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
