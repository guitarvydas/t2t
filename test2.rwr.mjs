let _rewrite = {
Main : function (a,_semi,b,c,d,) {
_rewrite_support.enter_rule ("Main");
_.print ("pre", `pre down a=${a.rwr ()} _semi=${_semi.rwr ().join ('')} b=${b.rwr ().join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`, );

_rewrite_support.pushParameter ("paramA", `${a.rwr ()}`);
_rewrite_support.pushParameter ("paramB", `${b.rwr ().join ('')}`);
_rewrite_support.pushParameter ("paramC", `${c.rwr ()}`);
_.print ("pre", `hello`, );

_rewrite_support.set_return (`... ${_.print2 ("", `middle`, `2nd arg`, )} ${a.rwr ()}${_semi.rwr ().join ('')}${_rewrite_support.getParameter ("paramB")}${c.rwr ()}${d.rwr ().join ('')}...`);
_.print ("post", `hello`, );
_rewrite_support.popParameter ("paramC");
_rewrite_support.popParameter ("paramB");
_rewrite_support.popParameter ("paramA");
_.print ("post", `pre down a=${a.rwr ()} _semi=${_semi.rwr ().join ('')} b=${b.rwr ().join ('')} c=${c.rwr ()} d=${d.rwr ().join ('')}`, );
return _rewrite_support.exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

