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

Main : function (d,) {
    enter_rule ("Main");
_.test5_print ("pre", `d=${d.rwr ().join ('')},`);

    set_return (`... ${d.rwr ().join ('')}...`);
_.test5_print ("post", `d=${d.rwr ().join ('')},`);
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

