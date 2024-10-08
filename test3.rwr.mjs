let _rewrite = {
Ma,i,n : function (w,,in,n,e,r,) {
_rewrite_support.enter_rule ("Ma,i,n");
_rewrite_support.pushParameter ("pr,e,v,i,o,u,s", `undefined`);
_rewrite_support.set_return (`undefined`);
_rewrite_support.popParameter ("pr,e,v,i,o,u,s");
return _rewrite_support.exit_rule ("Ma,i,n");
},,
In,n,e,r : function (m,) {
_rewrite_support.enter_rule ("In,n,e,r");
_rewrite_support.set_return (`${_rewrite_support.getParameter ("pr,e,v,i,o,u,s")},.,.,.,undefined`);
return _rewrite_support.exit_rule ("In,n,e,r");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

