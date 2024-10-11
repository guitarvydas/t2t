'use strict'

import {_} from './support.mjs';
import * as ohm from 'ohm-js';

let verbose = false;

function top (stack) { let v = stack.pop (); stack.push (v); return v; }

function set_top (stack, v) { stack.pop (); stack.push (v); return v; }

let return_value_stack = [];
let rule_name_stack = [];
let depth_prefix = ' ';

function enter_rule (name) {
    if (verbose) {
	console.error (depth_prefix, ["enter", name]);
	depth_prefix += ' ';
    }
    return_value_stack.push ("");
    rule_name_stack.push (name);
}

function set_return (v) {
    set_top (return_value_stack, v);
}

function exit_rule (name) {
    if (verbose) {
	depth_prefix = depth_prefix.substr (1);
	console.error (depth_prefix, ["exit", name]);
    }
    rule_name_stack.pop ();
    return return_value_stack.pop ()
}

const grammar = String.raw`
example {
  Main = "a" (";" "b")+ "c" "d"+
}

`;

let parameters = {};
function pushParameter (name, v) {
    parameters [name] = v;
}
function getParameter (name) {
    return parameters [name];
}

parameters ["paramA"] = [];
parameters ["paramB"] = [];
parameters ["paramC"] = [];

let _rewrite = {

Main : function (a⦙⦂_semi⦙,b⦙⦂c⦙⦂d⦙) {
    enter_rule ("Main");
     _.print ("pre", `pre down a=${a.rwr ()} _semi=${_semi.join ('')} b=${b.join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`⦙);

    pushParameter ("paramA",@`${a.rwr ()}`);
    pushParameter ("paramB",@`${b.join ('')}`);
    pushParameter ("paramC",@`${c.rwr ()}`);
     _.print ("pre", `hello`⦙);

    set_return (`... ${_.print2 (`middle`⦙`2nd arg`⦙)} ${a.rwr ()}${_semi.join ('')}${getParameter ("paramB")}${c.rwr ()}${d.rwr ().join ('')}...`);
     _.print ("post", `hello`⦙);
    popParameter ("paramC");
    popParameter ("paramB");
    popParameter ("paramA");
     _.print ("post", `pre down a=${a.rwr ()} _semi=${_semi.join ('')} b=${b.join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`⦙);
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

import * as fs from 'fs';
const argv = process.argv.slice(2);
let srcFilename = argv[0];
if ('-' == srcFilename) { srcFilename = 0 }
let src = fs.readFileSync(srcFilename, 'utf-8');
let parser = ohm.grammar (grammar);
let cst = parser.match (src);
let sem = parser.createSemantics ();
sem.addOperation ('rwr', _rewrite);
console.log (sem (cst).rwr ());
