_ = {
    top : function (stack) { v = stack.pop (); stack.push (v); return v; },
    
    // for rewriter
    parameter_names : [],
    arg_expansions : [],

    reset_stacks : function () { 
	_.arg_names = []; 
	_.arg_expansions = [];
    },

    memo_parameter : function (str) {
	_.parameter_names.push (str); 
	return "";
    },
    foreach_parameter : function (str) {
	let s = [];
	_.parameter_names.forEach (p => s.push (str.replaceAll ("☐", `${p}`) + "\n"));
	return s.join ('');
    },


    memo_arg : function (s) { _.arg_expansions.push (`${s} = ${s}.rwr ();\n`); return ""; },
    memo_iter_arg : function (s) { _.arg_expansions.push (`${s} = ${s}.rwr ().join ('');\n`); return ""; },
    arg_expansions_as_string : function () { return _.arg_expansions.join (''); },
}
,
