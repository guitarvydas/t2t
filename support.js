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
	console.error (`foreach_parameter ${str}`);
	let s = [];
	_.parameter_names.forEach (p => s.push (str.replaceAll ("☐", `${p}`) + "\n"));
	return s.join ('');
    },


    memo_arg : function (name, s) { console.error (`memo_arg ${name} ${s}`); _.arg_expansions.push (s.replaceAll ("☐", name)); return ""; },
    memo_iter_arg : function (name, s) { console.error (`memo_iter_arg ${name} ${s}`); _.arg_expansions.push (s.replaceAll ("☐", name)); return ""; },
    arg_expansions_as_string : function () { return _.arg_expansions.join (''); },
}
,
