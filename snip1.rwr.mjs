let _rewrite = {
parameterDef : function (_pct,_1,_parameter,_2,name,_3,) {
_rewrite_support.enter_rule ("parameterDef");
_rewrite_support.set_return (`\n_.freshParameter ("${name.rwr ()}");`);
return _rewrite_support.exit_rule ("parameterDef");
},
rewriteDef : function (_pct,_1,_rewrite,_2,name,_3,_lb,_4,firstRewriteRule,_7,subsequentRewriteRules,_5,rb,_6,) {
_rewrite_support.enter_rule ("rewriteDef");
_rewrite_support.set_return (`${firstRewriteRule.rwr ()}${subsequentRewriteRules.rwr ().join ('')}`);
return _rewrite_support.exit_rule ("rewriteDef");
},
firstRewriteRule : function (rule,) {
_rewrite_support.enter_rule ("firstRewriteRule");
_rewrite_support.pushParameter ("initialization", `\n_.initializeParameters ();`);
_rewrite_support.set_return (`${rule.rwr ()}`);
_rewrite_support.popParameter ("initialization");
return _rewrite_support.exit_rule ("firstRewriteRule");
},
subsequentRewriteRule : function (rule,) {
_rewrite_support.enter_rule ("subsequentRewriteRule");
_rewrite_support.pushParameter ("initialization", ``);
_rewrite_support.set_return (`${rule.rwr ()}`);
_rewrite_support.popParameter ("initialization");
return _rewrite_support.exit_rule ("subsequentRewriteRule");
},
rewriteRule : function (ruleName,_1,lb,_2,argDefs,_3s,rb,_4,_eq,_5,rewriteScope,_6,) {
_rewrite_support.enter_rule ("rewriteRule");
_.resetArgs ("pre", );

_rewrite_support.set_return (`\n${ruleName.rwr ()} : function (${argDefs.rwr ().join ('')}) {
${_rewrite_support.getParameter ("initialization")}
_rewrite_support.enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
return _rewrite_support.exit_rule ("${ruleName.rwr ()}");
},`);
_.resetArgs ("post", );
return _rewrite_support.exit_rule ("rewriteRule");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

