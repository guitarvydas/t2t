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

parameters ["previous"] = [];

let _rewrite = {

Main : function (w,inner,) {
    enter_rule ("Main");
    pushParameter ("previous",`${w.rwr ()}`);
    set_return (`${inner.rwr ()}`);
    popParameter ("previous");
    return exit_rule ("Main");
},
Inner : function (m,) {
    enter_rule ("Inner");
    set_return (`${getParameter ("previous")}...${m.rwr ()}`);
    return exit_rule ("Inner");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

