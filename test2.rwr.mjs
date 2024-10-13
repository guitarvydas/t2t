let parameters = {};
function pushParameter (name, v) {
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}

parameters ["paramA"] = [];
parameters ["paramB"] = [];
parameters ["paramC"] = [];

let _rewrite = {

Main : function (a,_semi,b,c,d,) {
    enter_rule ("Main");
     print (`pre down a=${a.rwr ()} _semi=${_semi.rwr ().join ('')} b=${b.rwr ().join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`,);

    pushParameter ("paramA",`${a.rwr ()}`);
    pushParameter ("paramB",`${b.rwr ().join ('')}`);
    pushParameter ("paramC",`${c.rwr ()}`);
     print (`hello`,);

    set_return (`... ${print2 ("", `middle`,`2nd arg`,)} ${a.rwr ()}${_semi.rwr ().join ('')}${getParameter ("paramB")}${c.rwr ()}${d.rwr ().join ('')}...`);
    popParameter ("paramC");
    popParameter ("paramB");
    popParameter ("paramA");
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

