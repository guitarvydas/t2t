_ = {
    rulename_stack : [],
    formals_stack : [],
    ruleDescr_stack : [],

    top : function (stack) { v = stack.pop (); stack.push (v); return v; },
    
    initialize_stacks : function () { 
	rulename_stack = []; 
	formals_stack = [];
	ruleDescr_stack = [];
    },

    setrule : function (name, formals, desc) {
	_.rulename_stack.push (name.trim ());
	_.formals_stack.push (formals) ;
	_.ruleDescr_stack.push (desc) ;
	return "";
    },
    getrulename : function () { return _.top (_.rulename_stack); },
    getformals : function () { return _.top (_.formals_stack); },
    getruleDescr : function () { return _.top (_.ruleDescr_stack); },


    // for rewriter
    parameter_names : [],
    predicate_expansions : [],
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
