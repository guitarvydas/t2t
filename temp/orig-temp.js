

const rewrite_js = {
Main : function (_c, ) {
//c
let c = undefined;
return_value_stack.push ("");
rule_name_stack.push ("");
_.set_top (rule_name_stack, "Main");
c = _c.rwr ()


_.set_top (return_value_stack, `hello world ${c}`);

rule_name_stack.pop ();
return return_value_stack.pop ();
},
    _terminal: function () { return this.sourceString; },
    _iter: function (...children) { return children.map(c => c.rwr ()); }
};


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


