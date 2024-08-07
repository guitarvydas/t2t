_ = {
    top : function (stack) { v = stack.pop (); stack.push (v); return v; },
    
    // for rewriter
    parameter_names : [],
    predicate_expansions : [],

    reset_stacks : function () { 
	_.predicate_names = []; 
	_.predicate_expansions = [];
    },

    memo_parameter : function (str) {
	_.parameter_names.push (str); 
	return "";
    },
    foreach_parameter : function (str) {
	s = [];
	_.parameter_names.forEach (p => s.push (`${p}${str}\n`));
	return s.join ('');
    },

    memo_predicate : function (s) { _.predicate_expansions.push (`${s} = ${s}.rwr ();\n`); return ""; },
    memo_iter_predicate : function (s) { _.predicate_expansions.push (`${s} = ${s}.rwr ().join ('');\n`); return ""; },
    predicate_expansions_as_string : function () { return _.predicate_expansions.join (''); },
}
,
