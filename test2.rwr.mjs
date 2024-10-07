let _rewrite = {
Main : function (a,_semi,b,c,d,) {
_rewrite_support.enter_rule ("Main");
_.print (`pre down a=${a.rwr ()} _semis=${_semis.rwr ()} b=${b.rwr ()} c=${c.rwr ()} d=${d.rwr ()}`, );

_rewrite_support.pushParameter ("paramA", `${a.rwr ()}`);
_rewrite_support.pushParameter ("paramB", `${b.rwr ()}`);
_rewrite_support.pushParameter ("paramC", `${c.rwr ()}`);
_.print (`hello`, );

_rewrite_support.set_return (`... print2 (`middle`, `2nd arg`, ) ${a.rwr ()}${_semis.rwr ()}${_rewrite_support.getParameter ("paramB")}${c.rwr ()}${d.rwr ()}...`);
_rewrite_support.popParameter ("paramC");
_rewrite_support.popParameter ("paramB");
_rewrite_support.popParameter ("paramA");
return _rewrite_support.exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

