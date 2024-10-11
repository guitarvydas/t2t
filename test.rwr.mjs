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


let _rewrite = {

Main : function (c,) {
    enter_rule ("Main");
    set_return (`hello world ${c.rwr ()}`);
    return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

