let _rewrite = {
Ma,i,n : function (c,) {
_rewrite_support.enter_rule ("Ma,i,n");
_rewrite_support.set_return (`h,e,l,l,o, ,w,o,r,l,d, ,undefined`);
return _rewrite_support.exit_rule ("Ma,i,n");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

