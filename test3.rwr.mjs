let _rewrite = {
Main : function (w,inner,) {
_rewrite_support.enter_rule ("Main");
_rewrite_support.pushParameter ("previous", `inner`);
_rewrite_support.set_return (`inner`);
_rewrite_support.popParameter ("previous");
return _rewrite_support.exit_rule ("Main");
},
Inner : function (m,) {
_rewrite_support.enter_rule ("Inner");
_rewrite_support.set_return (`${_rewrite_support.getParameter ("previous")}...m`);
return _rewrite_support.exit_rule ("Inner");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

