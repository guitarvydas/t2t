let _rewrite = {
main : function (parameterDefs,rewriteDef,) {
_rewrite_support.enter_rule ("main");
_rewrite_support.set_return (`let _rewrite = {${parameterDefs.rwr ()}${rewriteDef.rwr ()}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};
`);
return _rewrite_support.exit_rule ("main");
},
parameterDef : function (_pct,_1,_parameter,_2,name,_3,) {
_rewrite_support.enter_rule ("parameterDef");
_rewrite_support.set_return (``);
return _rewrite_support.exit_rule ("parameterDef");
},
rewriteDef : function (_pct,_1,_rewrite,_2,name,_3,_lb,_4,rewriteRules,_5,rb,_6,) {
_rewrite_support.enter_rule ("rewriteDef");
_rewrite_support.set_return (`${rewriteRules.rwr ()}`);
return _rewrite_support.exit_rule ("rewriteDef");
},
rewriteRule : function (ruleName,_1,lb,_2,argDefs,_3s,rb,_4,_eq,_5,rewriteScope,_6,) {
_rewrite_support.enter_rule ("rewriteRule");
_rewrite_support.set_return (`\n${ruleName.rwr ()} : function (${argDefs.rwr ()}) {
_rewrite_support.enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
return _rewrite_support.exit_rule ("${ruleName.rwr ()}");
},`);
return _rewrite_support.exit_rule ("rewriteRule");
},
argDef_parenthesized : function (lp,names,rp,op,) {
_rewrite_support.enter_rule ("argDef_parenthesized");
_rewrite_support.set_return (`${names.rwr ()}`);
return _rewrite_support.exit_rule ("argDef_parenthesized");
},
argDef_iter : function (name,op,) {
_rewrite_support.enter_rule ("argDef_iter");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );
return _rewrite_support.exit_rule ("argDef_iter");
},
argDef_plain : function (name,) {
_rewrite_support.enter_rule ("argDef_plain");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ()\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ()\}`, );
return _rewrite_support.exit_rule ("argDef_plain");
},
rewriteScope_call : function (lb,_1,lb2,_a,fname,_b,arg,_c,rb2,_2,rewriteScope,_3,rb,) {
_rewrite_support.enter_rule ("rewriteScope_call");
_rewrite_support.set_return (`\n_.${fname.rwr ()} ("pre", ${arg.rwr ()});\n${rewriteScope.rwr ()}\n_.${fname.rwr ()} ("post", ${arg.rwr ()});`);
return _rewrite_support.exit_rule ("rewriteScope_call");
},
rewriteScope_parameterbinding : function (lb,_1,pname,_2,_eq,_3,s,_4,scope,_5,rb,) {
_rewrite_support.enter_rule ("rewriteScope_parameterbinding");
_rewrite_support.set_return (`\n_rewrite_support.pushParameter ("${pname.rwr ()}", ${s.rwr ()});${scope.rwr ()}\n_rewrite_support.popParameter ("${pname.rwr ()}");`);
return _rewrite_support.exit_rule ("rewriteScope_parameterbinding");
},
rewriteScope_plain : function (s,) {
_rewrite_support.enter_rule ("rewriteScope_plain");
_rewrite_support.set_return (`\n_rewrite_support.set_return (${s.rwr ()});`);
return _rewrite_support.exit_rule ("rewriteScope_plain");
},
rewriteFormatString : function (lq,formatItems,rq,) {
_rewrite_support.enter_rule ("rewriteFormatString");
_rewrite_support.set_return (`\`${formatItems.rwr ()}\``);
return _rewrite_support.exit_rule ("rewriteFormatString");
},
formatItem_supportCall : function (lb,_1,name,_2,argStrings,rb,) {
_rewrite_support.enter_rule ("formatItem_supportCall");
_rewrite_support.set_return (`\$\{_.${name.rwr ()} ("", ${argStrings.rwr ()})\}`);
return _rewrite_support.exit_rule ("formatItem_supportCall");
},
formatItem_parameter : function (lb,parameterRef,rb,) {
_rewrite_support.enter_rule ("formatItem_parameter");
_rewrite_support.set_return (`${parameterRef.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_parameter");
},
formatItem_arg : function (lb,argRef,rb,) {
_rewrite_support.enter_rule ("formatItem_arg");
_rewrite_support.set_return (`${argRef.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_arg");
},
formatItem_escapedCharacter : function (bslash,any,) {
_rewrite_support.enter_rule ("formatItem_escapedCharacter");
_rewrite_support.set_return (`${bslash.rwr ()}${any.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_escapedCharacter");
},
formatItem_rawCharacter : function (c,) {
_rewrite_support.enter_rule ("formatItem_rawCharacter");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("formatItem_rawCharacter");
},
parenarg : function (name,ws,) {
_rewrite_support.enter_rule ("parenarg");
_.memoArg ("pre", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );

_rewrite_support.set_return (`${name.rwr ()},`);
_.memoArg ("post", ``, `${name.rwr ()}`, `\$\{${name.rwr ()}.rwr ().join ('')\}`, );
return _rewrite_support.exit_rule ("parenarg");
},
argstring : function (str,ws,) {
_rewrite_support.enter_rule ("argstring");
_rewrite_support.set_return (`${str.rwr ()}, `);
return _rewrite_support.exit_rule ("argstring");
},
argRef : function (name,) {
_rewrite_support.enter_rule ("argRef");
_rewrite_support.set_return (`${_.fetchArg ("", `${name.rwr ()}`, )}`);
return _rewrite_support.exit_rule ("argRef");
},
parameterRef : function (name,) {
_rewrite_support.enter_rule ("parameterRef");
_rewrite_support.set_return (`\$\{_rewrite_support.getParameter ("${name.rwr ()}")\}`);
return _rewrite_support.exit_rule ("parameterRef");
},
ruleName : function (name,) {
_rewrite_support.enter_rule ("ruleName");
_rewrite_support.set_return (`${name.rwr ()}`);
return _rewrite_support.exit_rule ("ruleName");
},
name : function (nameFirst,nameRests,) {
_rewrite_support.enter_rule ("name");
_rewrite_support.set_return (`${nameFirst.rwr ()}${nameRests.rwr ()}`);
return _rewrite_support.exit_rule ("name");
},
nameFirst : function (c,) {
_rewrite_support.enter_rule ("nameFirst");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("nameFirst");
},
nameRest : function (c,) {
_rewrite_support.enter_rule ("nameRest");
_rewrite_support.set_return (`${c.rwr ()}`);
return _rewrite_support.exit_rule ("nameRest");
},
s_ : function (space,) {
_rewrite_support.enter_rule ("s_");
_rewrite_support.set_return (`${space.rwr ()}`);
return _rewrite_support.exit_rule ("s_");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};

