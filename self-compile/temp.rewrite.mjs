let parameters = {};
function pushParameter (name, v) {
    if (!parameters [name]) {
	parameters [name] = [];
    }
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}

parameters ["param"] = [];

let _rewrite = {

Main : function (c,) {
enter_rule ("Main");
    pushParameter ("param", `${c.rwr ()}`);
    set_return (`hello world ${print (`the letter is: ${getParameter ("param")} ${c.rwr ()}`,)}`);
popParameter ("param");
return exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
