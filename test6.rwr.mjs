let parameters = {};
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

Main : function (x⦙y⦙) {
    enter_rule ("Main");
    set_return (`... ${x.rwr ().join ('')}...${y.rwr ().join ('')}...`);
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

