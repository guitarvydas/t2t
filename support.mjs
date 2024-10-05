let _ = {
    top : function (stack) { let v = stack.pop (); stack.push (v); return v; },
    
    set_top : function (stack, v) { stack.pop (); stack.push (v); return v; },
        

    // for rewriter
    parameter_names : [],
    argnames : [],
    evaled_args : [],
    return_value_stack : [],
    rule_name_stack : [],


    reset_stacks : function () { 
        _.argnames = [];
        _.evaled_args = [];
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
        let s = [];
        _.argnames.forEach (p => s.push (str.replaceAll ("☐", `${p}`)));
        return s.join ('\n');
    },

    memo_arg : function (name, s) { _.argnames.push (name); _.evaled_args.push (s.replaceAll ("☐", `${name}`)); return ""; },
    args_as_string : function () { return _.evaled_args.join (''); },

    insert_grammar_here : function () { return dslGrammar; },
    
    enter_rule : function (name) { console.error (["enter", name]); _.return_value_stack.push (""); _.rule_name_stack.push (""); _.set_top (_.rule_name_stack, name);},
    set_return : function (v) { _.set_top (_.return_value_stack, v); },
    exit_rule : function (name) { console.error (["exit", name]); _.rule_name_stack.pop (); return _.return_value_stack.pop ()},


    // for examples
    pre_print : function (s) {console.log (`pre: ${s}`);},
    post_print : function (s) {console.log (`post: ${s}`);},

    print2 : function (s1, s2) {console.log (`print2: ${s1} ${s2}`); return "";},

    

};

export {_};
