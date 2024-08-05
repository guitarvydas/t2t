_ = {
    counter : 1,
    rulename : "",
    formals : "",
    ruleDescr : "",
    getn : function (s) { let n = _.counter; _.counter += 1; return `${s}${n}`; },
    stripbrackets : function (s) { return s
				   .replace (/\\«/g, '')
				   .replace (/\\»/g, '')
				   .replace (/«/g, '')
				   .replace (/»/g, ''); }, // strip out brackets «»
    stripsuffixes : function (s) { return s.replace (/\+/g, '').replace (/\*/g, '').replace (/\?/g, ''); }, // strip out suffixes (+/*/?)
    blanks : function (s) { return s.replace (/❍/g, ' '); },
    noblanks : function (s) { return s.replace (/❍/g, ''); },
    
    // rulename, args, rewrite are all variations on the same string...
    asargs : function (s) { return _.blanks (_.stripbrackets (s)); }, 
    asrulename : function (s) { return _.blanks (_.stripbrackets (s)); }, 
    asrewrite : function (s) { return _.noblanks (_.stripsuffixes (s)); },

    setrule : function (name, formals, desc) { _.rulename = name.trim (); _.formals = formals ; _.ruleDescr = desc ; return ""; },
    getrulename : function () { return _.rulename; },
    getformals : function () { return _.formals; },
    getruleDescr : function () { return _.ruleDescr; }

}
,
