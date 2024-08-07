let _ = {
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
	

    // for rewriter
    parameter_names : [],
    predicate_expansions : [],

    pre_reset_stacks : function () { 
	_.predicate_names = []; 
	_.predicate_expansions = [];
    },
    post_reset_stacks : function () { },

    memo_parameter : function (str) {
	_.parameter_names.push (str); 
	return "";
    },
    foreach_parameter : function (str) {
	let s = [];
	_.parameter_names.forEach (p => s.push (`${p}${str}\n`));
	return s.join ('');
    },

    memo_predicate : function (s) { _.predicate_expansions.push (`${s} = ${s}.rwr ();\n`); return ""; },
    memo_iter_predicate : function (s) { _.predicate_expansions.push (`${s} = ${s}.rwr ().join ('');\n`); return ""; },
    predicate_expansions_as_string : function () { return _.predicate_expansions.join (''); },

    pre_print : function (s) {console.log (`pre: ${s}`);},
    print : function (s) {console.log (`mid: ${s}`);},
    post_print : function (s) {console.log (`post: ${s}`);},


};

export {_};
