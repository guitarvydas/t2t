let _ = {
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
	

    // for rewriter
    parameter_names : [],
    args : [],
    arg_joins : [],

    reset_stacks : function () { 
	_.args = [],
	_.arg_joins = [];
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

    foreach_arg : function (str) {
	let s = [`//foreach_arg (${str})\n`];
	_.arg_joins.forEach (p => s.push (str.replaceAll ("☐", `${p}`) + "\n"));
	return s.join ('');
    },

    memo_arg : function (s) { _.args.push (s); return `/*memo_arg ${s}*/\n`; },
    memo_iter_arg : function (s) { _.arg_joins.push (`${s} = ${s}.join ('');\n`); return `/*memo_iter_arg ${s}*/\n`; },
    arg_expansions_as_string : function () { return _.arg_joins.join (''); },

    pre_print : function (s) {console.log (`pre: ${s}`);},
    print : function (s) {console.log (`mid: ${s}`); return "";},
    post_print : function (s) {console.log (`post: ${s}`);},

    print2 : function (s1, s2) {console.log (`print2: ${s1} ${s2}`); return "";},

    

};

export {_};
