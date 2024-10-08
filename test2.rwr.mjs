let _rewrite = {,,
Ma,i,n : function (a,,_s,e,m,i,,b,,c,,d,) {
_rewrite_support.enter_rule ("Ma,i,n");
_.pr,i,n,t ("pre", `p,r,e, ,d,o,w,n, ,a,=,undefined, ,_,s,e,m,i,=,undefined, ,b,=,undefined, ,c,=,undefined, ,d,=,undefined`, );

_rewrite_support.pushParameter ("pa,r,a,m,A", `undefined`);
_rewrite_support.pushParameter ("pa,r,a,m,B", `undefined`);
_rewrite_support.pushParameter ("pa,r,a,m,C", `undefined`);
_.pr,i,n,t ("pre", `h,e,l,l,o`, );

_rewrite_support.set_return (`.,.,., ,${_.pr,i,n,t,2 ("", `m,i,d,d,l,e`, ,`2,n,d, ,a,r,g`, )}, ,undefined,undefined,${_rewrite_support.getParameter ("pa,r,a,m,B")},undefined,undefined,.,.,.`);
_.pr,i,n,t ("post", `h,e,l,l,o`, );
_rewrite_support.popParameter ("pa,r,a,m,C");
_rewrite_support.popParameter ("pa,r,a,m,B");
_rewrite_support.popParameter ("pa,r,a,m,A");
_.pr,i,n,t ("post", `p,r,e, ,d,o,w,n, ,a,=,undefined, ,_,s,e,m,i,=,undefined, ,b,=,undefined, ,c,=,undefined, ,d,=,undefined`, );
return _rewrite_support.exit_rule ("Ma,i,n");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

