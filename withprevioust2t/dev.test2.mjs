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
example {
  Main = "a" (";" "b")+ "c" "d"+
}

`;

let _rewrite = {
Main : function (a,_semi,b,c,d,) {
_rewrite_support.enter_rule ("Main");
_.print ("pre", `pre down a=${a.rwr ()} _semi=${_semi.rwr ()} b=${b.rwr ()} c=${c.rwr ()} d=${d.rwr ()}`, );

_rewrite_support.pushParameter ("paramA", `${a.rwr ()}`);
_rewrite_support.pushParameter ("paramB", `${b.rwr ()}`);
_rewrite_support.pushParameter ("paramC", `${c.rwr ()}`);
_.print ("pre", `hello`, );

_rewrite_support.set_return (`... ${_.print2 ("", `middle`, `2nd arg`, )} ${a.rwr ()}${_semi.rwr ()}${_rewrite_support.getParameter ("paramB")}${c.rwr ()}${d.rwr ()}...`);
_.print ("post", `hello`, );
_rewrite_support.popParameter ("paramC");
_rewrite_support.popParameter ("paramB");
_rewrite_support.popParameter ("paramA");
_.print ("post", `pre down a=${a.rwr ()} _semi=${_semi.rwr ()} b=${b.rwr ()} c=${c.rwr ()} d=${d.rwr ()}`, );
return _rewrite_support.exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

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
