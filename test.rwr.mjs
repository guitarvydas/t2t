let _rewrite = {
Main : function (c,) {
_rewrite_support.enter_rule ("Main");
_rewrite_support.set_return (`hello world undefined`);
return _rewrite_support.exit_rule ("Main");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

