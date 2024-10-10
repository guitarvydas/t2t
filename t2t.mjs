let initilialization = '';

let _rewrite = {
    main : function (parameterDefs_i, rewriteDef) {
	return
`let _rewrite = {
initializeParameters : function () {
${parameterDefs_i.rwr ().join ('')}
},
${rewriteDef.rwr ()}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
};
`;
    },

    parameterDef : function (pct, ws1, _parameter, ws2, name, ws3) {
	return `\n_.freshParameter ("${name.rwr ()}");`
    },

    rewriteDef : function (pct, ws1, _rewrite, ws2, name, ws3, lb, ws4, firstRewriteRule, ws5, subsequentRewriteRule_i, ws6, rb, ws7) {
	return `${firstRewriteRule.rwr ()}${subsequentRewriteRule_i.rwr ().join ('')}`;
    },

    firstRewriteRule : function (rewriteRule) {
	initialization = `\n.initializeParameters ();`;
	return `${rewriteRule.rwr ()}`;
    },

    subsequentRewriteRule : function (rewriteRule) {
	initialization = ``;
	return `${rewriteRule.rwr ()}`;
    },

    // rewriteRule =        ruleName s_    "[" s_   (argDef   s_)*  "]"  s_   "="  s_   rewriteScope  s_
    rewriteRule : function (ruleName, ws1, lb, ws2, argDef_i, ws3_i, rb, ws4, _eq, ws5, rewriteScope, ws6) {
	return `\n«ruleName» : function (${argDef_i.rwr ().join ('')}) {
	    ${initialization}
	    _rewrite_support.enter_rule ("${ruleName.rwr ()}");${rewriteScope.rwr ()}
	    return _rewrite_support.exit_rule ("${ruleName.rwr ()}");
	},`;
    },
    
    //argDef = 
    // | "(" parenarg+ ")" ("+" | "*" | "?")  -- parenthesized
    argDef_parenthesized : function (lb, parenarg_i, rb, i_op) {
	return `${parenarg_i.rwr ()}`;
    },

    // | name ("+" | "*" | "?")               -- iter
    argDef_iter : function (name, i_op) {
	memoArg (`${name}`, `\$\{${name}.rwr ().join ('')\}`);
	return `${name},`;
    },

    // | name                                 -- plain
    argDef_plain : function (name) {
	memoArg (`${name}`, `\$\{${name}.rwr ()\}`);
	return `${name},`;
    },

    // rewriteScope =
    //   | "⎡" s_ "⎨" s_ name s_ argstring* s_ "⎬" s_ rewriteScope s_ "⎦"      -- call
    rewriteScope_call : function (lsb, ws1, lb, ws2, fname, ws3, argString_i, ws4, rb, ws5, rewriteScope, ws6, rsb) {
	return `\n_.${fname.rwr ()} ("pre", ${argString_i.rwr.join ('')}\n${rewriteScope.rwr ()}\n_.${fname.rwr ()} ("post", ${argString_i.rwr.join ('')}`;
    },
    
    //   | "⎡" s_  name s_ "=" s_ rewriteFormatString  s_ rewriteScope s_ "⎦"  -- parameterbinding
    rewriteScope_parameterbinding : function (lsb, ws1, pname, ws2, _eq, ws3, rewriteFormatString, ws4, rewriteScope, ws5, rsb) {
	return `\npushParameter ("${pname.rwr ()}", ${rewriteFormatString.rwr ()});${rewriteScope.rwr ()}\npopParameter ("${pname}") );`;
    },
    
    //   | rewriteFormatString                                                 -- plain
    rewriteScope_plain : function (rewriteFormatString) {
	return `\nset_return (${rewriteFormatString.rwr ()});`;
    },
    
    // rewriteFormatString = "‛" formatItem* "’"
    rewriteFormatString : function (lq, formatItem_i, rq) {
	return `${formatItem_i.rwr ().join ('')}`;
    },
    
    // formatItem =
    //   | "⎨" s_ name s_ argstring* "⎬" -- supportCall
    formatItem_supportCall : function (lb, ws1, name, ws2, argstring_i, rb) {
	return `_.\$\{${name.rwr ()} (${argstring_i.rwr ().join ('')})\}`;
    },

    //   | "⟪" parameterRef "⟫"                         -- parameter
    formatItem_parameter : function (lb, parameterRef, rb) {
	return `${parameterRef.rwr ()}`;
    },
    //   | "«" argRef "»"                               -- arg

    formatItem_arg : function (lb, argRef, rb) {
	return `${argRef.rwr ()}`;
    },

    //   | "\\" any                                     -- escapedCharacter
    formatItem_escapedCharacter : function (backslash, c) {
	return `${backslash.rwr ()}${c.rwr ()}`;
    },

    //   | ~"‛" ~"’" ~"⎡" ~"⎦" ~"⟪" ~"⟫" ~"«" ~"»" any  -- rawCharacter
    formatItem_rawCharacter : function (c) {
	return `${c.rwr ()}`;
    },

    // parenarg = name s_
    parenarg : function (name, ws) {
	memoArg (name.rwr (), `\$\{${name.rwr ()}.join ('')\}`);
	return `${name.rwr ()}`;
    },

    // argstring =  rewriteFormatString s_
    argstring : function (rewriteFormatString, ws) {
	return `${rewriteFormatString.rwr ()},`;
    },
    
    // argRef = name
    argRef : function (name) {
	return `${fetchArg (name)}`;
    },
    
    // parameterRef = name
    parameterRef : function (name) {
	return `\$\{getParameter ("${name.rwr ()}")\}`;
    },
    
    // ruleName = name
    ruleName : function (name) {
	return `${name.rwr ()}`;
    },
    

    // name (a name)
    //   = nameFirst nameRest*
    name : function (nameFirst, nameRest_i) {
	return `${nameFist.rwr ()}${nameRest_i.rwr ().join ('')}`;
    },
    
    // nameFirst = ("_" | letter)
    nameFirst : function (c) {
	return `${c.rwr ()}`;
    },
    
    // nameRest  = ("_" | alnum)
    nameRest : function (c) {
	return `${c.rwr ()}`;
    },

    // s_ = space*
    s_ : function (ws_i) {
	return `${ws_i.rwr ().join ('')}`;
    },
};

