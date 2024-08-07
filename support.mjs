let _ = {
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
	

    // for rewriter
    parameter_names : [],
    arg_joins : [],

    pre_reset_stacks : function () { 
	_.predicate_names = []; 
	_.arg_joins = [];
    },
    post_reset_stacks : function () { },

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
	let s = [];
	_.arg_joins.forEach (p => s.push (str.replaceAll ("☐", `${p}`) + "\n"));
	return s.join ('');
    },

    memo_predicate : function (s) { return ""; },
    memo_iter_predicate : function (s) { _.arg_joins.push (`${s} = ${s}.join ('');\n`); return ""; },
    arg_joins_as_string : function () { return _.arg_joins.join (''); },

    pre_print : function (s) {console.log (`pre: ${s}`);},
    print : function (s) {console.log (`mid: ${s}`); return "";},
    post_print : function (s) {console.log (`post: ${s}`);},


};

export {_};
