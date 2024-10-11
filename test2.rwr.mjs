parameters = {};
function pushParameter (name, v) {
    parameters [name] = v;
}
function getParameter (name) {
    return parameters [name];
}

parameters ["paramA"] = [];
parameters ["paramB"] = [];
parameters ["paramC"] = [];

let _rewrite = {

Main : function (a,_semi,bc,[semantics wrapper for t2t],) {
    enter_rule ("Main");
_.print ("pre", `pre down a=${a.rwr ()} _semi=${_semi.join ('')} b=${b.join ('')} c=${c.rwr ()} d=undefined,`);

    pushParameter ("paramA", `${a.rwr ()}`);
    pushParameter ("paramB", `${b.join ('')}`);
    pushParameter ("paramC", `${c.rwr ()}`);
_.print ("pre", `hello,`);

    set_return (`... _.${print2 (middle,2nd arg,)} ${a.rwr ()}${_semi.join ('')}${getParameter ("paramB")}${c.rwr ()}undefined...`);
_.print ("post", hello,
    popParameter ("paramC");
    popParameter ("paramB");
    popParameter ("paramA");
_.print ("post", pre down a=${a.rwr ()} _semi=${_semi.join ('')} b=${b.join ('')} c=${c.rwr ()} d=undefined,
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

