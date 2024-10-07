
let _rewrite_support = {
    verbose : false,
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
    return_value_stack : [],
    rule_name_stack : [],
    depth_prefix : ' ',
    parameters : {},
    enter_rule : function (name) {
	_rewrite_support.return_value_stack.push ("");
	_rewrite_support.rule_name_stack.push ("");
	_rewrite_support.set_top (_rewrite_support.rule_name_stack, name);
    },
    set_return : function (v) { _.set_top (_rewrite_support.return_value_stack, v); },
    exit_rule : function (name) {
	_rewrite_support.rule_name_stack.pop ();
	return _rewrite_support.return_value_stack.pop ()
    },

    // verbose versions
    enter_rule : function (name) {
	if (_rewrite_support.verbose) {
	    console.error (_rewrite_support.depth_prefix, ["enter", name]);
	    _rewrite_support.depth_prefix += ' ';
	}
	_rewrite_support.return_value_stack.push ("");
	_rewrite_support.rule_name_stack.push (name);
    },
    set_return : function (v) { _.set_top (_.return_value_stack, v); },
    exit_rule : function (name) {
	if (_rewrite_support.verbose) {
	    _rewrite_support.depth_prefix = _rewrite_support.depth_prefix.substr (1);
	    console.error (_rewrite_support.depth_prefix, ["exit", name]);
	}
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

const grammar = String.raw`
test3 {
  Main = "waltzing" Inner
  Inner = "matilda"
}
`;
let _rewrite = {
    previous_stack : [],
    
    Main : function (w,inner,) {
	_.pushParameter ("previous", `${w.rwr ()}`);
	_rewrite_support.set_return `${inner.rwr ()}`;
	_.popParameter ("previous");
    },
    Inner : function (m,) {
	_rewrite_support.set_return `${_.getParameter ("previous_stack")}...${m.rwr ()}`;
    },
    
    
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};

import * as fs from 'fs';
const argv = process.argv.slice(2);
console.error (argv);
let dslGrammarFilename = argv[0];
let dslRewriteFilename = argv[1];
let srcFilename = argv[2];
let dslGrammar = fs.readFileSync(dslGrammarFilename, 'utf-8');
let dslRewrite = fs.readFileSync(dslRewriteFilename, 'utf-8');
if (srcFilename) {
    // stand-alone version
    // node t2t.mjs test3.grammar test3.rewrite test3.txt
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    console.error (srcFilename);
    console.error (src);
    try {
	let parser = ohm.grammar (dslGrammar);
	let cst = parser.match (src);
	let sem = parser.createSemantics ();
	sem.addOperation ('rwr', _rewrite);
	console.log (sem (cst).rwr ());
    }
    catch (e) {
	console.log (e);
    }
} else {
    throw Error ("gen mode NIY");
    process.exit (1);
    
    // gen mode
    // node t2t.mjs test3.grammar test3.rewrite >new-dsl.mjs
    
}
