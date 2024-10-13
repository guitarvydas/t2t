'use strict'

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

function print (s) {
    console.log (`print: ${s}`);
    return "";
}

function print2 (s1, s2) {
    console.log (`print2: ${s1} ${s2}`);
    return "";
}

let parameters = {};
function pushParameter (name, v) {
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}

parameters ["paramA"] = [];
parameters ["paramB"] = [];
parameters ["paramC"] = [];

let _rewrite = {

Main : function (a,_semi,b,c,d,) {
    enter_rule ("Main");
     print (`pre down a=${a.rwr ()} _semi=${_semi.rwr ().join ('')} b=${b.rwr ().join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`,);

    pushParameter ("paramA",`${a.rwr ()}`);
    pushParameter ("paramB",`${b.rwr ().join ('')}`);
    pushParameter ("paramC",`${c.rwr ()}`);
     print (`hello`,);

    set_return (`... ${print2 (`middle`,`2nd arg`,)} ${a.rwr ()}${_semi.rwr ().join ('')}${getParameter ("paramB")}${c.rwr ()}${d.rwr ().join ('')}...`);
    popParameter ("paramC");
    popParameter ("paramB");
    popParameter ("paramA");
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
