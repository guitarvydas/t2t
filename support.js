_ = {
    rulename : "",
    formals : "",
    ruleDescr : "",

    setrule : function (name, formals, desc) { _.rulename = name.trim (); _.formals = formals ; _.ruleDescr = desc ; return ""; },
    getrulename : function () { return _.rulename; },
    getformals : function () { return _.formals; },
    getruleDescr : function () { return _.ruleDescr; },


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
