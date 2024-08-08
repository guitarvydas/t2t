%⋅grammar⋅ ✗ main
%⋅grammar⋅   ✗ grammarDef applySyntactic<StackDef>* rewriteDef
%⋅grammar⋅     ✓ grammarDef ⇒  "%⋅grammar⋅example␊⋅⋅Main⋅=⋅"a"⋅(";"⋅"b")+⋅"c"␊␊"
%⋅grammar⋅       ✓ "% grammar" spaces name spaces rule+ ⇒  "%⋅grammar⋅example␊⋅⋅Main⋅=⋅"a"⋅(";"⋅"b")+⋅"c"␊␊"
%⋅grammar⋅         ✓ "% grammar" ⇒  "%⋅grammar"
⋅example␊⋅         ✓ spaces ⇒  "⋅"
⋅example␊⋅           ✓ space* ⇒  "⋅"
⋅example␊⋅             ✓ space ⇒  "⋅"
⋅example␊⋅               ✓ "\u0000".." " ⇒  "⋅"
example␊⋅⋅             ✗ space
example␊⋅⋅               ✗ "\u0000".." "
example␊⋅⋅         ✓ name ⇒  "example"
example␊⋅⋅           ✓ nameFirst nameRest* ⇒  "example"
example␊⋅⋅             ✓ nameFirst ⇒  "e"
example␊⋅⋅                 ✗ "_"
example␊⋅⋅                 ✓ letter ⇒  "e"
example␊⋅⋅                     ✓ lower ⇒  "e"
example␊⋅⋅                       ✓ Unicode [Ll] character ⇒  "e"
xample␊⋅⋅M             ✓ nameRest* ⇒  "xample"
xample␊⋅⋅M               ✓ nameRest ⇒  "x"
xample␊⋅⋅M                   ✗ "_"
xample␊⋅⋅M                   ✓ alnum ⇒  "x"
xample␊⋅⋅M                       ✓ letter ⇒  "x"
xample␊⋅⋅M                           ✓ lower ⇒  "x"
xample␊⋅⋅M                             ✓ Unicode [Ll] character ⇒  "x"
ample␊⋅⋅Ma               ✓ nameRest ⇒  "a"
ample␊⋅⋅Ma                   ✗ "_"
ample␊⋅⋅Ma                   ✓ alnum ⇒  "a"
ample␊⋅⋅Ma                       ✓ letter ⇒  "a"
ample␊⋅⋅Ma                           ✓ lower ⇒  "a"
ample␊⋅⋅Ma                             ✓ Unicode [Ll] character ⇒  "a"
mple␊⋅⋅Mai               ✓ nameRest ⇒  "m"
mple␊⋅⋅Mai                   ✗ "_"
mple␊⋅⋅Mai                   ✓ alnum ⇒  "m"
mple␊⋅⋅Mai                       ✓ letter ⇒  "m"
mple␊⋅⋅Mai                           ✓ lower ⇒  "m"
mple␊⋅⋅Mai                             ✓ Unicode [Ll] character ⇒  "m"
ple␊⋅⋅Main               ✓ nameRest ⇒  "p"
ple␊⋅⋅Main                   ✗ "_"
ple␊⋅⋅Main                   ✓ alnum ⇒  "p"
ple␊⋅⋅Main                       ✓ letter ⇒  "p"
ple␊⋅⋅Main                           ✓ lower ⇒  "p"
ple␊⋅⋅Main                             ✓ Unicode [Ll] character ⇒  "p"
le␊⋅⋅Main⋅               ✓ nameRest ⇒  "l"
le␊⋅⋅Main⋅                   ✗ "_"
le␊⋅⋅Main⋅                   ✓ alnum ⇒  "l"
le␊⋅⋅Main⋅                       ✓ letter ⇒  "l"
le␊⋅⋅Main⋅                           ✓ lower ⇒  "l"
le␊⋅⋅Main⋅                             ✓ Unicode [Ll] character ⇒  "l"
e␊⋅⋅Main⋅=               ✓ nameRest ⇒  "e"
e␊⋅⋅Main⋅=                   ✗ "_"
e␊⋅⋅Main⋅=                   ✓ alnum ⇒  "e"
e␊⋅⋅Main⋅=                       ✓ letter ⇒  "e"
e␊⋅⋅Main⋅=                           ✓ lower ⇒  "e"
e␊⋅⋅Main⋅=                             ✓ Unicode [Ll] character ⇒  "e"
␊⋅⋅Main⋅=⋅               ✗ nameRest
␊⋅⋅Main⋅=⋅                   ✗ "_"
␊⋅⋅Main⋅=⋅                   ✗ alnum
␊⋅⋅Main⋅=⋅                       ✗ letter
␊⋅⋅Main⋅=⋅                           ✗ lower
␊⋅⋅Main⋅=⋅                             ✗ Unicode [Ll] character
␊⋅⋅Main⋅=⋅                           ✗ upper
␊⋅⋅Main⋅=⋅                             ✗ Unicode [Lu] character
␊⋅⋅Main⋅=⋅                           ✗ unicodeLtmo
␊⋅⋅Main⋅=⋅                             ✗ Unicode [Ltmo] character
␊⋅⋅Main⋅=⋅                       ✗ digit
␊⋅⋅Main⋅=⋅                         ✗ "0".."9"
␊⋅⋅Main⋅=⋅         ✓ spaces ⇒  "␊⋅⋅"
␊⋅⋅Main⋅=⋅           ✓ space* ⇒  "␊⋅⋅"
␊⋅⋅Main⋅=⋅             ✓ space ⇒  "␊"
␊⋅⋅Main⋅=⋅               ✓ "\u0000".." " ⇒  "␊"
⋅⋅Main⋅=⋅"             ✓ space ⇒  "⋅"
⋅⋅Main⋅=⋅"               ✓ "\u0000".." " ⇒  "⋅"
⋅Main⋅=⋅"a             ✓ space ⇒  "⋅"
⋅Main⋅=⋅"a               ✓ "\u0000".." " ⇒  "⋅"
Main⋅=⋅"a"             ✗ space
Main⋅=⋅"a"               ✗ "\u0000".." "
Main⋅=⋅"a"         ✓ rule+ ⇒  "Main⋅=⋅"a"⋅(";"⋅"b")+⋅"c"␊␊"
Main⋅=⋅"a"           ✓ rule ⇒  "M"
Main⋅=⋅"a"               ✗ rule_parameter_as_string
Main⋅=⋅"a"                 ✗ "\"" "% parameter" "\""
Main⋅=⋅"a"                   ✗ "\""
Main⋅=⋅"a"               ✗ rule_rewrite_as_string
Main⋅=⋅"a"                 ✗ "\"" "% rewrite" "\""
Main⋅=⋅"a"                   ✗ "\""
Main⋅=⋅"a"               ✓ rule_basic ⇒  "M"
Main⋅=⋅"a"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "M"
Main⋅=⋅"a"                   ✓ ~"% parameter" ⇒  ""
Main⋅=⋅"a"                     ✗ "% parameter"
Main⋅=⋅"a"                   ✓ ~"% rewrite" ⇒  ""
Main⋅=⋅"a"                     ✗ "% rewrite"
Main⋅=⋅"a"                   ✓ any ⇒  "M"
Main⋅=⋅"a"                     ✓ any ⇒  "M"
ain⋅=⋅"a"⋅           ✓ rule ⇒  "a"
ain⋅=⋅"a"⋅               ✗ rule_parameter_as_string
ain⋅=⋅"a"⋅                 ✗ "\"" "% parameter" "\""
ain⋅=⋅"a"⋅                   ✗ "\""
ain⋅=⋅"a"⋅               ✗ rule_rewrite_as_string
ain⋅=⋅"a"⋅                 ✗ "\"" "% rewrite" "\""
ain⋅=⋅"a"⋅                   ✗ "\""
ain⋅=⋅"a"⋅               ✓ rule_basic ⇒  "a"
ain⋅=⋅"a"⋅                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "a"
ain⋅=⋅"a"⋅                   ✓ ~"% parameter" ⇒  ""
ain⋅=⋅"a"⋅                     ✗ "% parameter"
ain⋅=⋅"a"⋅                   ✓ ~"% rewrite" ⇒  ""
ain⋅=⋅"a"⋅                     ✗ "% rewrite"
ain⋅=⋅"a"⋅                   ✓ any ⇒  "a"
ain⋅=⋅"a"⋅                     ✓ any ⇒  "a"
in⋅=⋅"a"⋅(           ✓ rule ⇒  "i"
in⋅=⋅"a"⋅(               ✗ rule_parameter_as_string
in⋅=⋅"a"⋅(                 ✗ "\"" "% parameter" "\""
in⋅=⋅"a"⋅(                   ✗ "\""
in⋅=⋅"a"⋅(               ✗ rule_rewrite_as_string
in⋅=⋅"a"⋅(                 ✗ "\"" "% rewrite" "\""
in⋅=⋅"a"⋅(                   ✗ "\""
in⋅=⋅"a"⋅(               ✓ rule_basic ⇒  "i"
in⋅=⋅"a"⋅(                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "i"
in⋅=⋅"a"⋅(                   ✓ ~"% parameter" ⇒  ""
in⋅=⋅"a"⋅(                     ✗ "% parameter"
in⋅=⋅"a"⋅(                   ✓ ~"% rewrite" ⇒  ""
in⋅=⋅"a"⋅(                     ✗ "% rewrite"
in⋅=⋅"a"⋅(                   ✓ any ⇒  "i"
in⋅=⋅"a"⋅(                     ✓ any ⇒  "i"
n⋅=⋅"a"⋅("           ✓ rule ⇒  "n"
n⋅=⋅"a"⋅("               ✗ rule_parameter_as_string
n⋅=⋅"a"⋅("                 ✗ "\"" "% parameter" "\""
n⋅=⋅"a"⋅("                   ✗ "\""
n⋅=⋅"a"⋅("               ✗ rule_rewrite_as_string
n⋅=⋅"a"⋅("                 ✗ "\"" "% rewrite" "\""
n⋅=⋅"a"⋅("                   ✗ "\""
n⋅=⋅"a"⋅("               ✓ rule_basic ⇒  "n"
n⋅=⋅"a"⋅("                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "n"
n⋅=⋅"a"⋅("                   ✓ ~"% parameter" ⇒  ""
n⋅=⋅"a"⋅("                     ✗ "% parameter"
n⋅=⋅"a"⋅("                   ✓ ~"% rewrite" ⇒  ""
n⋅=⋅"a"⋅("                     ✗ "% rewrite"
n⋅=⋅"a"⋅("                   ✓ any ⇒  "n"
n⋅=⋅"a"⋅("                     ✓ any ⇒  "n"
⋅=⋅"a"⋅(";           ✓ rule ⇒  "⋅"
⋅=⋅"a"⋅(";               ✗ rule_parameter_as_string
⋅=⋅"a"⋅(";                 ✗ "\"" "% parameter" "\""
⋅=⋅"a"⋅(";                   ✗ "\""
⋅=⋅"a"⋅(";               ✗ rule_rewrite_as_string
⋅=⋅"a"⋅(";                 ✗ "\"" "% rewrite" "\""
⋅=⋅"a"⋅(";                   ✗ "\""
⋅=⋅"a"⋅(";               ✓ rule_basic ⇒  "⋅"
⋅=⋅"a"⋅(";                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "⋅"
⋅=⋅"a"⋅(";                   ✓ ~"% parameter" ⇒  ""
⋅=⋅"a"⋅(";                     ✗ "% parameter"
⋅=⋅"a"⋅(";                   ✓ ~"% rewrite" ⇒  ""
⋅=⋅"a"⋅(";                     ✗ "% rewrite"
⋅=⋅"a"⋅(";                   ✓ any ⇒  "⋅"
⋅=⋅"a"⋅(";                     ✓ any ⇒  "⋅"
=⋅"a"⋅(";"           ✓ rule ⇒  "="
=⋅"a"⋅(";"               ✗ rule_parameter_as_string
=⋅"a"⋅(";"                 ✗ "\"" "% parameter" "\""
=⋅"a"⋅(";"                   ✗ "\""
=⋅"a"⋅(";"               ✗ rule_rewrite_as_string
=⋅"a"⋅(";"                 ✗ "\"" "% rewrite" "\""
=⋅"a"⋅(";"                   ✗ "\""
=⋅"a"⋅(";"               ✓ rule_basic ⇒  "="
=⋅"a"⋅(";"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "="
=⋅"a"⋅(";"                   ✓ ~"% parameter" ⇒  ""
=⋅"a"⋅(";"                     ✗ "% parameter"
=⋅"a"⋅(";"                   ✓ ~"% rewrite" ⇒  ""
=⋅"a"⋅(";"                     ✗ "% rewrite"
=⋅"a"⋅(";"                   ✓ any ⇒  "="
=⋅"a"⋅(";"                     ✓ any ⇒  "="
⋅"a"⋅(";"⋅           ✓ rule ⇒  "⋅"
⋅"a"⋅(";"⋅               ✗ rule_parameter_as_string
⋅"a"⋅(";"⋅                 ✗ "\"" "% parameter" "\""
⋅"a"⋅(";"⋅                   ✗ "\""
⋅"a"⋅(";"⋅               ✗ rule_rewrite_as_string
⋅"a"⋅(";"⋅                 ✗ "\"" "% rewrite" "\""
⋅"a"⋅(";"⋅                   ✗ "\""
⋅"a"⋅(";"⋅               ✓ rule_basic ⇒  "⋅"
⋅"a"⋅(";"⋅                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "⋅"
⋅"a"⋅(";"⋅                   ✓ ~"% parameter" ⇒  ""
⋅"a"⋅(";"⋅                     ✗ "% parameter"
⋅"a"⋅(";"⋅                   ✓ ~"% rewrite" ⇒  ""
⋅"a"⋅(";"⋅                     ✗ "% rewrite"
⋅"a"⋅(";"⋅                   ✓ any ⇒  "⋅"
⋅"a"⋅(";"⋅                     ✓ any ⇒  "⋅"
"a"⋅(";"⋅"           ✓ rule ⇒  """
"a"⋅(";"⋅"               ✗ rule_parameter_as_string
"a"⋅(";"⋅"                 ✗ "\"" "% parameter" "\""
"a"⋅(";"⋅"                   ✓ "\"" ⇒  """
a"⋅(";"⋅"b                   ✗ "% parameter"
"a"⋅(";"⋅"               ✗ rule_rewrite_as_string
"a"⋅(";"⋅"                 ✗ "\"" "% rewrite" "\""
"a"⋅(";"⋅"                   ✓ "\"" ⇒  """
a"⋅(";"⋅"b                   ✗ "% rewrite"
"a"⋅(";"⋅"               ✓ rule_basic ⇒  """
"a"⋅(";"⋅"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"a"⋅(";"⋅"                   ✓ ~"% parameter" ⇒  ""
"a"⋅(";"⋅"                     ✗ "% parameter"
"a"⋅(";"⋅"                   ✓ ~"% rewrite" ⇒  ""
"a"⋅(";"⋅"                     ✗ "% rewrite"
"a"⋅(";"⋅"                   ✓ any ⇒  """
"a"⋅(";"⋅"                     ✓ any ⇒  """
a"⋅(";"⋅"b           ✓ rule ⇒  "a"
a"⋅(";"⋅"b               ✗ rule_parameter_as_string
a"⋅(";"⋅"b                 ✗ "\"" "% parameter" "\""
a"⋅(";"⋅"b                   ✗ "\""
a"⋅(";"⋅"b               ✗ rule_rewrite_as_string
a"⋅(";"⋅"b                 ✗ "\"" "% rewrite" "\""
a"⋅(";"⋅"b                   ✗ "\""
a"⋅(";"⋅"b               ✓ rule_basic ⇒  "a"
a"⋅(";"⋅"b                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "a"
a"⋅(";"⋅"b                   ✓ ~"% parameter" ⇒  ""
a"⋅(";"⋅"b                     ✗ "% parameter"
a"⋅(";"⋅"b                   ✓ ~"% rewrite" ⇒  ""
a"⋅(";"⋅"b                     ✗ "% rewrite"
a"⋅(";"⋅"b                   ✓ any ⇒  "a"
a"⋅(";"⋅"b                     ✓ any ⇒  "a"
"⋅(";"⋅"b"           ✓ rule ⇒  """
"⋅(";"⋅"b"               ✗ rule_parameter_as_string
"⋅(";"⋅"b"                 ✗ "\"" "% parameter" "\""
"⋅(";"⋅"b"                   ✓ "\"" ⇒  """
⋅(";"⋅"b")                   ✗ "% parameter"
"⋅(";"⋅"b"               ✗ rule_rewrite_as_string
"⋅(";"⋅"b"                 ✗ "\"" "% rewrite" "\""
"⋅(";"⋅"b"                   ✓ "\"" ⇒  """
⋅(";"⋅"b")                   ✗ "% rewrite"
"⋅(";"⋅"b"               ✓ rule_basic ⇒  """
"⋅(";"⋅"b"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"⋅(";"⋅"b"                   ✓ ~"% parameter" ⇒  ""
"⋅(";"⋅"b"                     ✗ "% parameter"
"⋅(";"⋅"b"                   ✓ ~"% rewrite" ⇒  ""
"⋅(";"⋅"b"                     ✗ "% rewrite"
"⋅(";"⋅"b"                   ✓ any ⇒  """
"⋅(";"⋅"b"                     ✓ any ⇒  """
⋅(";"⋅"b")           ✓ rule ⇒  "⋅"
⋅(";"⋅"b")               ✗ rule_parameter_as_string
⋅(";"⋅"b")                 ✗ "\"" "% parameter" "\""
⋅(";"⋅"b")                   ✗ "\""
⋅(";"⋅"b")               ✗ rule_rewrite_as_string
⋅(";"⋅"b")                 ✗ "\"" "% rewrite" "\""
⋅(";"⋅"b")                   ✗ "\""
⋅(";"⋅"b")               ✓ rule_basic ⇒  "⋅"
⋅(";"⋅"b")                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "⋅"
⋅(";"⋅"b")                   ✓ ~"% parameter" ⇒  ""
⋅(";"⋅"b")                     ✗ "% parameter"
⋅(";"⋅"b")                   ✓ ~"% rewrite" ⇒  ""
⋅(";"⋅"b")                     ✗ "% rewrite"
⋅(";"⋅"b")                   ✓ any ⇒  "⋅"
⋅(";"⋅"b")                     ✓ any ⇒  "⋅"
(";"⋅"b")+           ✓ rule ⇒  "("
(";"⋅"b")+               ✗ rule_parameter_as_string
(";"⋅"b")+                 ✗ "\"" "% parameter" "\""
(";"⋅"b")+                   ✗ "\""
(";"⋅"b")+               ✗ rule_rewrite_as_string
(";"⋅"b")+                 ✗ "\"" "% rewrite" "\""
(";"⋅"b")+                   ✗ "\""
(";"⋅"b")+               ✓ rule_basic ⇒  "("
(";"⋅"b")+                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "("
(";"⋅"b")+                   ✓ ~"% parameter" ⇒  ""
(";"⋅"b")+                     ✗ "% parameter"
(";"⋅"b")+                   ✓ ~"% rewrite" ⇒  ""
(";"⋅"b")+                     ✗ "% rewrite"
(";"⋅"b")+                   ✓ any ⇒  "("
(";"⋅"b")+                     ✓ any ⇒  "("
";"⋅"b")+⋅           ✓ rule ⇒  """
";"⋅"b")+⋅               ✗ rule_parameter_as_string
";"⋅"b")+⋅                 ✗ "\"" "% parameter" "\""
";"⋅"b")+⋅                   ✓ "\"" ⇒  """
;"⋅"b")+⋅"                   ✗ "% parameter"
";"⋅"b")+⋅               ✗ rule_rewrite_as_string
";"⋅"b")+⋅                 ✗ "\"" "% rewrite" "\""
";"⋅"b")+⋅                   ✓ "\"" ⇒  """
;"⋅"b")+⋅"                   ✗ "% rewrite"
";"⋅"b")+⋅               ✓ rule_basic ⇒  """
";"⋅"b")+⋅                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
";"⋅"b")+⋅                   ✓ ~"% parameter" ⇒  ""
";"⋅"b")+⋅                     ✗ "% parameter"
";"⋅"b")+⋅                   ✓ ~"% rewrite" ⇒  ""
";"⋅"b")+⋅                     ✗ "% rewrite"
";"⋅"b")+⋅                   ✓ any ⇒  """
";"⋅"b")+⋅                     ✓ any ⇒  """
;"⋅"b")+⋅"           ✓ rule ⇒  ";"
;"⋅"b")+⋅"               ✗ rule_parameter_as_string
;"⋅"b")+⋅"                 ✗ "\"" "% parameter" "\""
;"⋅"b")+⋅"                   ✗ "\""
;"⋅"b")+⋅"               ✗ rule_rewrite_as_string
;"⋅"b")+⋅"                 ✗ "\"" "% rewrite" "\""
;"⋅"b")+⋅"                   ✗ "\""
;"⋅"b")+⋅"               ✓ rule_basic ⇒  ";"
;"⋅"b")+⋅"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  ";"
;"⋅"b")+⋅"                   ✓ ~"% parameter" ⇒  ""
;"⋅"b")+⋅"                     ✗ "% parameter"
;"⋅"b")+⋅"                   ✓ ~"% rewrite" ⇒  ""
;"⋅"b")+⋅"                     ✗ "% rewrite"
;"⋅"b")+⋅"                   ✓ any ⇒  ";"
;"⋅"b")+⋅"                     ✓ any ⇒  ";"
"⋅"b")+⋅"c           ✓ rule ⇒  """
"⋅"b")+⋅"c               ✗ rule_parameter_as_string
"⋅"b")+⋅"c                 ✗ "\"" "% parameter" "\""
"⋅"b")+⋅"c                   ✓ "\"" ⇒  """
⋅"b")+⋅"c"                   ✗ "% parameter"
"⋅"b")+⋅"c               ✗ rule_rewrite_as_string
"⋅"b")+⋅"c                 ✗ "\"" "% rewrite" "\""
"⋅"b")+⋅"c                   ✓ "\"" ⇒  """
⋅"b")+⋅"c"                   ✗ "% rewrite"
"⋅"b")+⋅"c               ✓ rule_basic ⇒  """
"⋅"b")+⋅"c                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"⋅"b")+⋅"c                   ✓ ~"% parameter" ⇒  ""
"⋅"b")+⋅"c                     ✗ "% parameter"
"⋅"b")+⋅"c                   ✓ ~"% rewrite" ⇒  ""
"⋅"b")+⋅"c                     ✗ "% rewrite"
"⋅"b")+⋅"c                   ✓ any ⇒  """
"⋅"b")+⋅"c                     ✓ any ⇒  """
⋅"b")+⋅"c"           ✓ rule ⇒  "⋅"
⋅"b")+⋅"c"               ✗ rule_parameter_as_string
⋅"b")+⋅"c"                 ✗ "\"" "% parameter" "\""
⋅"b")+⋅"c"                   ✗ "\""
⋅"b")+⋅"c"               ✗ rule_rewrite_as_string
⋅"b")+⋅"c"                 ✗ "\"" "% rewrite" "\""
⋅"b")+⋅"c"                   ✗ "\""
⋅"b")+⋅"c"               ✓ rule_basic ⇒  "⋅"
⋅"b")+⋅"c"                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "⋅"
⋅"b")+⋅"c"                   ✓ ~"% parameter" ⇒  ""
⋅"b")+⋅"c"                     ✗ "% parameter"
⋅"b")+⋅"c"                   ✓ ~"% rewrite" ⇒  ""
⋅"b")+⋅"c"                     ✗ "% rewrite"
⋅"b")+⋅"c"                   ✓ any ⇒  "⋅"
⋅"b")+⋅"c"                     ✓ any ⇒  "⋅"
"b")+⋅"c"␊           ✓ rule ⇒  """
"b")+⋅"c"␊               ✗ rule_parameter_as_string
"b")+⋅"c"␊                 ✗ "\"" "% parameter" "\""
"b")+⋅"c"␊                   ✓ "\"" ⇒  """
b")+⋅"c"␊␊                   ✗ "% parameter"
"b")+⋅"c"␊               ✗ rule_rewrite_as_string
"b")+⋅"c"␊                 ✗ "\"" "% rewrite" "\""
"b")+⋅"c"␊                   ✓ "\"" ⇒  """
b")+⋅"c"␊␊                   ✗ "% rewrite"
"b")+⋅"c"␊               ✓ rule_basic ⇒  """
"b")+⋅"c"␊                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"b")+⋅"c"␊                   ✓ ~"% parameter" ⇒  ""
"b")+⋅"c"␊                     ✗ "% parameter"
"b")+⋅"c"␊                   ✓ ~"% rewrite" ⇒  ""
"b")+⋅"c"␊                     ✗ "% rewrite"
"b")+⋅"c"␊                   ✓ any ⇒  """
"b")+⋅"c"␊                     ✓ any ⇒  """
b")+⋅"c"␊␊           ✓ rule ⇒  "b"
b")+⋅"c"␊␊               ✗ rule_parameter_as_string
b")+⋅"c"␊␊                 ✗ "\"" "% parameter" "\""
b")+⋅"c"␊␊                   ✗ "\""
b")+⋅"c"␊␊               ✗ rule_rewrite_as_string
b")+⋅"c"␊␊                 ✗ "\"" "% rewrite" "\""
b")+⋅"c"␊␊                   ✗ "\""
b")+⋅"c"␊␊               ✓ rule_basic ⇒  "b"
b")+⋅"c"␊␊                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "b"
b")+⋅"c"␊␊                   ✓ ~"% parameter" ⇒  ""
b")+⋅"c"␊␊                     ✗ "% parameter"
b")+⋅"c"␊␊                   ✓ ~"% rewrite" ⇒  ""
b")+⋅"c"␊␊                     ✗ "% rewrite"
b")+⋅"c"␊␊                   ✓ any ⇒  "b"
b")+⋅"c"␊␊                     ✓ any ⇒  "b"
")+⋅"c"␊␊%           ✓ rule ⇒  """
")+⋅"c"␊␊%               ✗ rule_parameter_as_string
")+⋅"c"␊␊%                 ✗ "\"" "% parameter" "\""
")+⋅"c"␊␊%                   ✓ "\"" ⇒  """
)+⋅"c"␊␊%⋅                   ✗ "% parameter"
")+⋅"c"␊␊%               ✗ rule_rewrite_as_string
")+⋅"c"␊␊%                 ✗ "\"" "% rewrite" "\""
")+⋅"c"␊␊%                   ✓ "\"" ⇒  """
)+⋅"c"␊␊%⋅                   ✗ "% rewrite"
")+⋅"c"␊␊%               ✓ rule_basic ⇒  """
")+⋅"c"␊␊%                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
")+⋅"c"␊␊%                   ✓ ~"% parameter" ⇒  ""
")+⋅"c"␊␊%                     ✗ "% parameter"
")+⋅"c"␊␊%                   ✓ ~"% rewrite" ⇒  ""
")+⋅"c"␊␊%                     ✗ "% rewrite"
")+⋅"c"␊␊%                   ✓ any ⇒  """
")+⋅"c"␊␊%                     ✓ any ⇒  """
)+⋅"c"␊␊%⋅           ✓ rule ⇒  ")"
)+⋅"c"␊␊%⋅               ✗ rule_parameter_as_string
)+⋅"c"␊␊%⋅                 ✗ "\"" "% parameter" "\""
)+⋅"c"␊␊%⋅                   ✗ "\""
)+⋅"c"␊␊%⋅               ✗ rule_rewrite_as_string
)+⋅"c"␊␊%⋅                 ✗ "\"" "% rewrite" "\""
)+⋅"c"␊␊%⋅                   ✗ "\""
)+⋅"c"␊␊%⋅               ✓ rule_basic ⇒  ")"
)+⋅"c"␊␊%⋅                 ✓ ~"% parameter" ~"% rewrite" any ⇒  ")"
)+⋅"c"␊␊%⋅                   ✓ ~"% parameter" ⇒  ""
)+⋅"c"␊␊%⋅                     ✗ "% parameter"
)+⋅"c"␊␊%⋅                   ✓ ~"% rewrite" ⇒  ""
)+⋅"c"␊␊%⋅                     ✗ "% rewrite"
)+⋅"c"␊␊%⋅                   ✓ any ⇒  ")"
)+⋅"c"␊␊%⋅                     ✓ any ⇒  ")"
+⋅"c"␊␊%⋅p           ✓ rule ⇒  "+"
+⋅"c"␊␊%⋅p               ✗ rule_parameter_as_string
+⋅"c"␊␊%⋅p                 ✗ "\"" "% parameter" "\""
+⋅"c"␊␊%⋅p                   ✗ "\""
+⋅"c"␊␊%⋅p               ✗ rule_rewrite_as_string
+⋅"c"␊␊%⋅p                 ✗ "\"" "% rewrite" "\""
+⋅"c"␊␊%⋅p                   ✗ "\""
+⋅"c"␊␊%⋅p               ✓ rule_basic ⇒  "+"
+⋅"c"␊␊%⋅p                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "+"
+⋅"c"␊␊%⋅p                   ✓ ~"% parameter" ⇒  ""
+⋅"c"␊␊%⋅p                     ✗ "% parameter"
+⋅"c"␊␊%⋅p                   ✓ ~"% rewrite" ⇒  ""
+⋅"c"␊␊%⋅p                     ✗ "% rewrite"
+⋅"c"␊␊%⋅p                   ✓ any ⇒  "+"
+⋅"c"␊␊%⋅p                     ✓ any ⇒  "+"
⋅"c"␊␊%⋅pa           ✓ rule ⇒  "⋅"
⋅"c"␊␊%⋅pa               ✗ rule_parameter_as_string
⋅"c"␊␊%⋅pa                 ✗ "\"" "% parameter" "\""
⋅"c"␊␊%⋅pa                   ✗ "\""
⋅"c"␊␊%⋅pa               ✗ rule_rewrite_as_string
⋅"c"␊␊%⋅pa                 ✗ "\"" "% rewrite" "\""
⋅"c"␊␊%⋅pa                   ✗ "\""
⋅"c"␊␊%⋅pa               ✓ rule_basic ⇒  "⋅"
⋅"c"␊␊%⋅pa                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "⋅"
⋅"c"␊␊%⋅pa                   ✓ ~"% parameter" ⇒  ""
⋅"c"␊␊%⋅pa                     ✗ "% parameter"
⋅"c"␊␊%⋅pa                   ✓ ~"% rewrite" ⇒  ""
⋅"c"␊␊%⋅pa                     ✗ "% rewrite"
⋅"c"␊␊%⋅pa                   ✓ any ⇒  "⋅"
⋅"c"␊␊%⋅pa                     ✓ any ⇒  "⋅"
"c"␊␊%⋅par           ✓ rule ⇒  """
"c"␊␊%⋅par               ✗ rule_parameter_as_string
"c"␊␊%⋅par                 ✗ "\"" "% parameter" "\""
"c"␊␊%⋅par                   ✓ "\"" ⇒  """
c"␊␊%⋅para                   ✗ "% parameter"
"c"␊␊%⋅par               ✗ rule_rewrite_as_string
"c"␊␊%⋅par                 ✗ "\"" "% rewrite" "\""
"c"␊␊%⋅par                   ✓ "\"" ⇒  """
c"␊␊%⋅para                   ✗ "% rewrite"
"c"␊␊%⋅par               ✓ rule_basic ⇒  """
"c"␊␊%⋅par                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"c"␊␊%⋅par                   ✓ ~"% parameter" ⇒  ""
"c"␊␊%⋅par                     ✗ "% parameter"
"c"␊␊%⋅par                   ✓ ~"% rewrite" ⇒  ""
"c"␊␊%⋅par                     ✗ "% rewrite"
"c"␊␊%⋅par                   ✓ any ⇒  """
"c"␊␊%⋅par                     ✓ any ⇒  """
c"␊␊%⋅para           ✓ rule ⇒  "c"
c"␊␊%⋅para               ✗ rule_parameter_as_string
c"␊␊%⋅para                 ✗ "\"" "% parameter" "\""
c"␊␊%⋅para                   ✗ "\""
c"␊␊%⋅para               ✗ rule_rewrite_as_string
c"␊␊%⋅para                 ✗ "\"" "% rewrite" "\""
c"␊␊%⋅para                   ✗ "\""
c"␊␊%⋅para               ✓ rule_basic ⇒  "c"
c"␊␊%⋅para                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "c"
c"␊␊%⋅para                   ✓ ~"% parameter" ⇒  ""
c"␊␊%⋅para                     ✗ "% parameter"
c"␊␊%⋅para                   ✓ ~"% rewrite" ⇒  ""
c"␊␊%⋅para                     ✗ "% rewrite"
c"␊␊%⋅para                   ✓ any ⇒  "c"
c"␊␊%⋅para                     ✓ any ⇒  "c"
"␊␊%⋅param           ✓ rule ⇒  """
"␊␊%⋅param               ✗ rule_parameter_as_string
"␊␊%⋅param                 ✗ "\"" "% parameter" "\""
"␊␊%⋅param                   ✓ "\"" ⇒  """
␊␊%⋅parame                   ✗ "% parameter"
"␊␊%⋅param               ✗ rule_rewrite_as_string
"␊␊%⋅param                 ✗ "\"" "% rewrite" "\""
"␊␊%⋅param                   ✓ "\"" ⇒  """
␊␊%⋅parame                   ✗ "% rewrite"
"␊␊%⋅param               ✓ rule_basic ⇒  """
"␊␊%⋅param                 ✓ ~"% parameter" ~"% rewrite" any ⇒  """
"␊␊%⋅param                   ✓ ~"% parameter" ⇒  ""
"␊␊%⋅param                     ✗ "% parameter"
"␊␊%⋅param                   ✓ ~"% rewrite" ⇒  ""
"␊␊%⋅param                     ✗ "% rewrite"
"␊␊%⋅param                   ✓ any ⇒  """
"␊␊%⋅param                     ✓ any ⇒  """
␊␊%⋅parame           ✓ rule ⇒  "␊"
␊␊%⋅parame               ✗ rule_parameter_as_string
␊␊%⋅parame                 ✗ "\"" "% parameter" "\""
␊␊%⋅parame                   ✗ "\""
␊␊%⋅parame               ✗ rule_rewrite_as_string
␊␊%⋅parame                 ✗ "\"" "% rewrite" "\""
␊␊%⋅parame                   ✗ "\""
␊␊%⋅parame               ✓ rule_basic ⇒  "␊"
␊␊%⋅parame                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "␊"
␊␊%⋅parame                   ✓ ~"% parameter" ⇒  ""
␊␊%⋅parame                     ✗ "% parameter"
␊␊%⋅parame                   ✓ ~"% rewrite" ⇒  ""
␊␊%⋅parame                     ✗ "% rewrite"
␊␊%⋅parame                   ✓ any ⇒  "␊"
␊␊%⋅parame                     ✓ any ⇒  "␊"
␊%⋅paramet           ✓ rule ⇒  "␊"
␊%⋅paramet               ✗ rule_parameter_as_string
␊%⋅paramet                 ✗ "\"" "% parameter" "\""
␊%⋅paramet                   ✗ "\""
␊%⋅paramet               ✗ rule_rewrite_as_string
␊%⋅paramet                 ✗ "\"" "% rewrite" "\""
␊%⋅paramet                   ✗ "\""
␊%⋅paramet               ✓ rule_basic ⇒  "␊"
␊%⋅paramet                 ✓ ~"% parameter" ~"% rewrite" any ⇒  "␊"
␊%⋅paramet                   ✓ ~"% parameter" ⇒  ""
␊%⋅paramet                     ✗ "% parameter"
␊%⋅paramet                   ✓ ~"% rewrite" ⇒  ""
␊%⋅paramet                     ✗ "% rewrite"
␊%⋅paramet                   ✓ any ⇒  "␊"
␊%⋅paramet                     ✓ any ⇒  "␊"
%⋅paramete           ✗ rule
%⋅paramete               ✗ rule_parameter_as_string
%⋅paramete                 ✗ "\"" "% parameter" "\""
%⋅paramete                   ✗ "\""
%⋅paramete               ✗ rule_rewrite_as_string
%⋅paramete                 ✗ "\"" "% rewrite" "\""
%⋅paramete                   ✗ "\""
%⋅paramete               ✗ rule_basic
%⋅paramete                 ✗ ~"% parameter" ~"% rewrite" any
%⋅paramete                   ✗ ~"% parameter"
%⋅paramete                     ✓ "% parameter" ⇒  "%⋅parameter"
%⋅paramete     ✓ applySyntactic<StackDef>* ⇒  "%⋅parameter⋅sA␊%⋅parameter⋅sB␊%⋅parameter⋅sC␊␊"
%⋅paramete       ✓ applySyntactic<StackDef> ⇒  "%⋅parameter⋅sA␊"
%⋅paramete         ✓ $0 ⇒  "%⋅parameter⋅sA"
%⋅paramete           ✓ StackDef ⇒  "%⋅parameter⋅sA"
%⋅paramete             ✓ "% parameter" name ⇒  "%⋅parameter⋅sA"
%⋅paramete               ✓ spaces ⇒  ""
%⋅paramete                 ✓ space* ⇒  ""
%⋅paramete                   ✗ space
%⋅paramete                     ✗ "\u0000".." "
%⋅paramete               ✓ "% parameter" ⇒  "%⋅parameter"
⋅sA␊%⋅para               ✓ spaces ⇒  "⋅"
⋅sA␊%⋅para                 ✓ space* ⇒  "⋅"
⋅sA␊%⋅para                   ✓ space ⇒  "⋅"
⋅sA␊%⋅para                     ✓ "\u0000".." " ⇒  "⋅"
sA␊%⋅param                   ✗ space
sA␊%⋅param                     ✗ "\u0000".." "
sA␊%⋅param               ✓ name ⇒  "sA"
sA␊%⋅param                 ✓ nameFirst nameRest* ⇒  "sA"
sA␊%⋅param                   ✓ nameFirst ⇒  "s"
sA␊%⋅param                       ✗ "_"
sA␊%⋅param                       ✓ letter ⇒  "s"
sA␊%⋅param                           ✓ lower ⇒  "s"
sA␊%⋅param                             ✓ Unicode [Ll] character ⇒  "s"
A␊%⋅parame                   ✓ nameRest* ⇒  "A"
A␊%⋅parame                     ✓ nameRest ⇒  "A"
A␊%⋅parame                         ✗ "_"
A␊%⋅parame                         ✓ alnum ⇒  "A"
A␊%⋅parame                             ✓ letter ⇒  "A"
A␊%⋅parame                                 ✗ lower
A␊%⋅parame                                   ✗ Unicode [Ll] character
A␊%⋅parame                                 ✓ upper ⇒  "A"
A␊%⋅parame                                   ✓ Unicode [Lu] character ⇒  "A"
␊%⋅paramet                     ✗ nameRest
␊%⋅paramet                         ✗ "_"
␊%⋅paramet                         ✗ alnum
␊%⋅paramet                             ✗ letter
␊%⋅paramet                                 ✗ lower
␊%⋅paramet                                   ✗ Unicode [Ll] character
␊%⋅paramet                                 ✗ upper
␊%⋅paramet                                   ✗ Unicode [Lu] character
␊%⋅paramet                                 ✗ unicodeLtmo
␊%⋅paramet                                   ✗ Unicode [Ltmo] character
␊%⋅paramet                             ✗ digit
␊%⋅paramet                               ✗ "0".."9"
␊%⋅paramet         ✓ spaces ⇒  "␊"
␊%⋅paramet           ✓ space* ⇒  "␊"
␊%⋅paramet             ✓ space ⇒  "␊"
␊%⋅paramet               ✓ "\u0000".." " ⇒  "␊"
%⋅paramete             ✗ space
%⋅paramete               ✗ "\u0000".." "
%⋅paramete       ✓ applySyntactic<StackDef> ⇒  "%⋅parameter⋅sB␊"
%⋅paramete         ✓ $0 ⇒  "%⋅parameter⋅sB"
%⋅paramete           ✓ StackDef ⇒  "%⋅parameter⋅sB"
%⋅paramete             ✓ "% parameter" name ⇒  "%⋅parameter⋅sB"
%⋅paramete               ✓ spaces ⇒  ""
%⋅paramete                 ✓ space* ⇒  ""
%⋅paramete                   ✗ space
%⋅paramete                     ✗ "\u0000".." "
%⋅paramete               ✓ "% parameter" ⇒  "%⋅parameter"
⋅sB␊%⋅para               ✓ spaces ⇒  "⋅"
⋅sB␊%⋅para                 ✓ space* ⇒  "⋅"
⋅sB␊%⋅para                   ✓ space ⇒  "⋅"
⋅sB␊%⋅para                     ✓ "\u0000".." " ⇒  "⋅"
sB␊%⋅param                   ✗ space
sB␊%⋅param                     ✗ "\u0000".." "
sB␊%⋅param               ✓ name ⇒  "sB"
sB␊%⋅param                 ✓ nameFirst nameRest* ⇒  "sB"
sB␊%⋅param                   ✓ nameFirst ⇒  "s"
sB␊%⋅param                       ✗ "_"
sB␊%⋅param                       ✓ letter ⇒  "s"
sB␊%⋅param                           ✓ lower ⇒  "s"
sB␊%⋅param                             ✓ Unicode [Ll] character ⇒  "s"
B␊%⋅parame                   ✓ nameRest* ⇒  "B"
B␊%⋅parame                     ✓ nameRest ⇒  "B"
B␊%⋅parame                         ✗ "_"
B␊%⋅parame                         ✓ alnum ⇒  "B"
B␊%⋅parame                             ✓ letter ⇒  "B"
B␊%⋅parame                                 ✗ lower
B␊%⋅parame                                   ✗ Unicode [Ll] character
B␊%⋅parame                                 ✓ upper ⇒  "B"
B␊%⋅parame                                   ✓ Unicode [Lu] character ⇒  "B"
␊%⋅paramet                     ✗ nameRest
␊%⋅paramet                         ✗ "_"
␊%⋅paramet                         ✗ alnum
␊%⋅paramet                             ✗ letter
␊%⋅paramet                                 ✗ lower
␊%⋅paramet                                   ✗ Unicode [Ll] character
␊%⋅paramet                                 ✗ upper
␊%⋅paramet                                   ✗ Unicode [Lu] character
␊%⋅paramet                                 ✗ unicodeLtmo
␊%⋅paramet                                   ✗ Unicode [Ltmo] character
␊%⋅paramet                             ✗ digit
␊%⋅paramet                               ✗ "0".."9"
␊%⋅paramet         ✓ spaces ⇒  "␊"
␊%⋅paramet           ✓ space* ⇒  "␊"
␊%⋅paramet             ✓ space ⇒  "␊"
␊%⋅paramet               ✓ "\u0000".." " ⇒  "␊"
%⋅paramete             ✗ space
%⋅paramete               ✗ "\u0000".." "
%⋅paramete       ✓ applySyntactic<StackDef> ⇒  "%⋅parameter⋅sC␊␊"
%⋅paramete         ✓ $0 ⇒  "%⋅parameter⋅sC"
%⋅paramete           ✓ StackDef ⇒  "%⋅parameter⋅sC"
%⋅paramete             ✓ "% parameter" name ⇒  "%⋅parameter⋅sC"
%⋅paramete               ✓ spaces ⇒  ""
%⋅paramete                 ✓ space* ⇒  ""
%⋅paramete                   ✗ space
%⋅paramete                     ✗ "\u0000".." "
%⋅paramete               ✓ "% parameter" ⇒  "%⋅parameter"
⋅sC␊␊%⋅rew               ✓ spaces ⇒  "⋅"
⋅sC␊␊%⋅rew                 ✓ space* ⇒  "⋅"
⋅sC␊␊%⋅rew                   ✓ space ⇒  "⋅"
⋅sC␊␊%⋅rew                     ✓ "\u0000".." " ⇒  "⋅"
sC␊␊%⋅rewr                   ✗ space
sC␊␊%⋅rewr                     ✗ "\u0000".." "
sC␊␊%⋅rewr               ✓ name ⇒  "sC"
sC␊␊%⋅rewr                 ✓ nameFirst nameRest* ⇒  "sC"
sC␊␊%⋅rewr                   ✓ nameFirst ⇒  "s"
sC␊␊%⋅rewr                       ✗ "_"
sC␊␊%⋅rewr                       ✓ letter ⇒  "s"
sC␊␊%⋅rewr                           ✓ lower ⇒  "s"
sC␊␊%⋅rewr                             ✓ Unicode [Ll] character ⇒  "s"
C␊␊%⋅rewri                   ✓ nameRest* ⇒  "C"
C␊␊%⋅rewri                     ✓ nameRest ⇒  "C"
C␊␊%⋅rewri                         ✗ "_"
C␊␊%⋅rewri                         ✓ alnum ⇒  "C"
C␊␊%⋅rewri                             ✓ letter ⇒  "C"
C␊␊%⋅rewri                                 ✗ lower
C␊␊%⋅rewri                                   ✗ Unicode [Ll] character
C␊␊%⋅rewri                                 ✓ upper ⇒  "C"
C␊␊%⋅rewri                                   ✓ Unicode [Lu] character ⇒  "C"
␊␊%⋅rewrit                     ✗ nameRest
␊␊%⋅rewrit                         ✗ "_"
␊␊%⋅rewrit                         ✗ alnum
␊␊%⋅rewrit                             ✗ letter
␊␊%⋅rewrit                                 ✗ lower
␊␊%⋅rewrit                                   ✗ Unicode [Ll] character
␊␊%⋅rewrit                                 ✗ upper
␊␊%⋅rewrit                                   ✗ Unicode [Lu] character
␊␊%⋅rewrit                                 ✗ unicodeLtmo
␊␊%⋅rewrit                                   ✗ Unicode [Ltmo] character
␊␊%⋅rewrit                             ✗ digit
␊␊%⋅rewrit                               ✗ "0".."9"
␊␊%⋅rewrit         ✓ spaces ⇒  "␊␊"
␊␊%⋅rewrit           ✓ space* ⇒  "␊␊"
␊␊%⋅rewrit             ✓ space ⇒  "␊"
␊␊%⋅rewrit               ✓ "\u0000".." " ⇒  "␊"
␊%⋅rewrite             ✓ space ⇒  "␊"
␊%⋅rewrite               ✓ "\u0000".." " ⇒  "␊"
%⋅rewrite␊             ✗ space
%⋅rewrite␊               ✗ "\u0000".." "
%⋅rewrite␊       ✗ applySyntactic<StackDef>
%⋅rewrite␊         ✗ $0
%⋅rewrite␊           ✗ StackDef
%⋅rewrite␊             ✗ "% parameter" name
%⋅rewrite␊               ✓ spaces ⇒  ""
%⋅rewrite␊                 ✓ space* ⇒  ""
%⋅rewrite␊                   ✗ space
%⋅rewrite␊                     ✗ "\u0000".." "
%⋅rewrite␊               ✗ "% parameter"
%⋅rewrite␊         ✓ spaces ⇒  ""
%⋅rewrite␊           ✓ space* ⇒  ""
%⋅rewrite␊             ✗ space
%⋅rewrite␊               ✗ "\u0000".." "
%⋅rewrite␊     ✗ rewriteDef
%⋅rewrite␊       ✗ "% rewrite" spaces rewriteRule+
%⋅rewrite␊         ✓ "% rewrite" ⇒  "%⋅rewrite"
␊Main⋅[_pA         ✓ spaces ⇒  "␊"
␊Main⋅[_pA           ✓ space* ⇒  "␊"
␊Main⋅[_pA             ✓ space ⇒  "␊"
␊Main⋅[_pA               ✓ "\u0000".." " ⇒  "␊"
Main⋅[_pA⋅             ✗ space
Main⋅[_pA⋅               ✗ "\u0000".." "
Main⋅[_pA⋅         ✗ rewriteRule+
Main⋅[_pA⋅           ✗ rewriteRule
Main⋅[_pA⋅             ✗ rwRuleName spaces "[" spaces (rwArgDef spaces)+ "]" spaces pre? spaces "=" spaces rewriteScope spaces
Main⋅[_pA⋅               ✓ rwRuleName ⇒  "Main"
Main⋅[_pA⋅                 ✓ name ⇒  "Main"
Main⋅[_pA⋅                   ✓ nameFirst nameRest* ⇒  "Main"
Main⋅[_pA⋅                     ✓ nameFirst ⇒  "M"
Main⋅[_pA⋅                         ✗ "_"
Main⋅[_pA⋅                         ✓ letter ⇒  "M"
Main⋅[_pA⋅                             ✗ lower
Main⋅[_pA⋅                               ✗ Unicode [Ll] character
Main⋅[_pA⋅                             ✓ upper ⇒  "M"
Main⋅[_pA⋅                               ✓ Unicode [Lu] character ⇒  "M"
ain⋅[_pA⋅(                     ✓ nameRest* ⇒  "ain"
ain⋅[_pA⋅(                       ✓ nameRest ⇒  "a"
ain⋅[_pA⋅(                           ✗ "_"
ain⋅[_pA⋅(                           ✓ alnum ⇒  "a"
ain⋅[_pA⋅(                               ✓ letter ⇒  "a"
ain⋅[_pA⋅(                                   ✓ lower ⇒  "a"
ain⋅[_pA⋅(                                     ✓ Unicode [Ll] character ⇒  "a"
in⋅[_pA⋅(_                       ✓ nameRest ⇒  "i"
in⋅[_pA⋅(_                           ✗ "_"
in⋅[_pA⋅(_                           ✓ alnum ⇒  "i"
in⋅[_pA⋅(_                               ✓ letter ⇒  "i"
in⋅[_pA⋅(_                                   ✓ lower ⇒  "i"
in⋅[_pA⋅(_                                     ✓ Unicode [Ll] character ⇒  "i"
n⋅[_pA⋅(_p                       ✓ nameRest ⇒  "n"
n⋅[_pA⋅(_p                           ✗ "_"
n⋅[_pA⋅(_p                           ✓ alnum ⇒  "n"
n⋅[_pA⋅(_p                               ✓ letter ⇒  "n"
n⋅[_pA⋅(_p                                   ✓ lower ⇒  "n"
n⋅[_pA⋅(_p                                     ✓ Unicode [Ll] character ⇒  "n"
⋅[_pA⋅(_pB                       ✗ nameRest
⋅[_pA⋅(_pB                           ✗ "_"
⋅[_pA⋅(_pB                           ✗ alnum
⋅[_pA⋅(_pB                               ✗ letter
⋅[_pA⋅(_pB                                   ✗ lower
⋅[_pA⋅(_pB                                     ✗ Unicode [Ll] character
⋅[_pA⋅(_pB                                   ✗ upper
⋅[_pA⋅(_pB                                     ✗ Unicode [Lu] character
⋅[_pA⋅(_pB                                   ✗ unicodeLtmo
⋅[_pA⋅(_pB                                     ✗ Unicode [Ltmo] character
⋅[_pA⋅(_pB                               ✗ digit
⋅[_pA⋅(_pB                                 ✗ "0".."9"
⋅[_pA⋅(_pB               ✓ spaces ⇒  "⋅"
⋅[_pA⋅(_pB                 ✓ space* ⇒  "⋅"
⋅[_pA⋅(_pB                   ✓ space ⇒  "⋅"
⋅[_pA⋅(_pB                     ✓ "\u0000".." " ⇒  "⋅"
[_pA⋅(_pBs                   ✗ space
[_pA⋅(_pBs                     ✗ "\u0000".." "
[_pA⋅(_pBs               ✓ "[" ⇒  "["
_pA⋅(_pBse               ✓ spaces ⇒  ""
_pA⋅(_pBse                 ✓ space* ⇒  ""
_pA⋅(_pBse                   ✗ space
_pA⋅(_pBse                     ✗ "\u0000".." "
_pA⋅(_pBse               ✓ (rwArgDef spaces)+ ⇒  "_pA⋅(_pBsemis⋅_pBs)+⋅_pC"
_pA⋅(_pBse                 ✓ rwArgDef spaces ⇒  "_pA⋅"
_pA⋅(_pBse                   ✓ rwArgDef ⇒  "_pA"
_pA⋅(_pBse                       ✗ rwParenthesizedIterArgDef
_pA⋅(_pBse                         ✗ "(" rwInsideParenArgDef+ ")" ("+" | "*" | "?")
_pA⋅(_pBse                           ✗ "("
_pA⋅(_pBse                       ✗ rwIterArgDef
_pA⋅(_pBse                         ✗ name ("+" | "*" | "?")
_pA⋅(_pBse                           ✓ name ⇒  "_pA"
_pA⋅(_pBse                             ✓ nameFirst nameRest* ⇒  "_pA"
_pA⋅(_pBse                               ✓ nameFirst ⇒  "_"
_pA⋅(_pBse                                   ✓ "_" ⇒  "_"
pA⋅(_pBsem                               ✓ nameRest* ⇒  "pA"
pA⋅(_pBsem                                 ✓ nameRest ⇒  "p"
pA⋅(_pBsem                                     ✗ "_"
pA⋅(_pBsem                                     ✓ alnum ⇒  "p"
pA⋅(_pBsem                                         ✓ letter ⇒  "p"
pA⋅(_pBsem                                             ✓ lower ⇒  "p"
pA⋅(_pBsem                                               ✓ Unicode [Ll] character ⇒  "p"
A⋅(_pBsemi                                 ✓ nameRest ⇒  "A"
A⋅(_pBsemi                                     ✗ "_"
A⋅(_pBsemi                                     ✓ alnum ⇒  "A"
A⋅(_pBsemi                                         ✓ letter ⇒  "A"
A⋅(_pBsemi                                             ✗ lower
A⋅(_pBsemi                                               ✗ Unicode [Ll] character
A⋅(_pBsemi                                             ✓ upper ⇒  "A"
A⋅(_pBsemi                                               ✓ Unicode [Lu] character ⇒  "A"
⋅(_pBsemis                                 ✗ nameRest
⋅(_pBsemis                                     ✗ "_"
⋅(_pBsemis                                     ✗ alnum
⋅(_pBsemis                                         ✗ letter
⋅(_pBsemis                                             ✗ lower
⋅(_pBsemis                                               ✗ Unicode [Ll] character
⋅(_pBsemis                                             ✗ upper
⋅(_pBsemis                                               ✗ Unicode [Lu] character
⋅(_pBsemis                                             ✗ unicodeLtmo
⋅(_pBsemis                                               ✗ Unicode [Ltmo] character
⋅(_pBsemis                                         ✗ digit
⋅(_pBsemis                                           ✗ "0".."9"
⋅(_pBsemis                             ✗ "+"
⋅(_pBsemis                             ✗ "*"
⋅(_pBsemis                             ✗ "?"
_pA⋅(_pBse                       ✓ rwSimpleArgDef ⇒  "_pA"
_pA⋅(_pBse                         ✓ name ⇒  "_pA"
_pA⋅(_pBse                           ✓ nameFirst nameRest* ⇒  "_pA"
_pA⋅(_pBse                             ✓ nameFirst ⇒  "_"
_pA⋅(_pBse                                 ✓ "_" ⇒  "_"
pA⋅(_pBsem                             ✓ nameRest* ⇒  "pA"
pA⋅(_pBsem                               ✓ nameRest ⇒  "p"
pA⋅(_pBsem                                   ✗ "_"
pA⋅(_pBsem                                   ✓ alnum ⇒  "p"
pA⋅(_pBsem                                       ✓ letter ⇒  "p"
pA⋅(_pBsem                                           ✓ lower ⇒  "p"
pA⋅(_pBsem                                             ✓ Unicode [Ll] character ⇒  "p"
A⋅(_pBsemi                               ✓ nameRest ⇒  "A"
A⋅(_pBsemi                                   ✗ "_"
A⋅(_pBsemi                                   ✓ alnum ⇒  "A"
A⋅(_pBsemi                                       ✓ letter ⇒  "A"
A⋅(_pBsemi                                           ✗ lower
A⋅(_pBsemi                                             ✗ Unicode [Ll] character
A⋅(_pBsemi                                           ✓ upper ⇒  "A"
A⋅(_pBsemi                                             ✓ Unicode [Lu] character ⇒  "A"
⋅(_pBsemis                               ✗ nameRest
⋅(_pBsemis                                   ✗ "_"
⋅(_pBsemis                                   ✗ alnum
⋅(_pBsemis                                       ✗ letter
⋅(_pBsemis                                           ✗ lower
⋅(_pBsemis                                             ✗ Unicode [Ll] character
⋅(_pBsemis                                           ✗ upper
⋅(_pBsemis                                             ✗ Unicode [Lu] character
⋅(_pBsemis                                           ✗ unicodeLtmo
⋅(_pBsemis                                             ✗ Unicode [Ltmo] character
⋅(_pBsemis                                       ✗ digit
⋅(_pBsemis                                         ✗ "0".."9"
⋅(_pBsemis                   ✓ spaces ⇒  "⋅"
⋅(_pBsemis                     ✓ space* ⇒  "⋅"
⋅(_pBsemis                       ✓ space ⇒  "⋅"
⋅(_pBsemis                         ✓ "\u0000".." " ⇒  "⋅"
(_pBsemis⋅                       ✗ space
(_pBsemis⋅                         ✗ "\u0000".." "
(_pBsemis⋅                 ✓ rwArgDef spaces ⇒  "(_pBsemis⋅_pBs)+⋅"
(_pBsemis⋅                   ✓ rwArgDef ⇒  "(_pBsemis⋅_pBs)+"
(_pBsemis⋅                       ✓ rwParenthesizedIterArgDef ⇒  "(_pBsemis⋅_pBs)+"
(_pBsemis⋅                         ✓ "(" rwInsideParenArgDef+ ")" ("+" | "*" | "?") ⇒  "(_pBsemis⋅_pBs)+"
(_pBsemis⋅                           ✓ "(" ⇒  "("
_pBsemis⋅_                           ✓ rwInsideParenArgDef+ ⇒  "_pBsemis⋅_pBs"
_pBsemis⋅_                             ✓ rwInsideParenArgDef ⇒  "_pBsemis⋅"
_pBsemis⋅_                               ✓ name spaces ⇒  "_pBsemis⋅"
_pBsemis⋅_                                 ✓ name ⇒  "_pBsemis"
_pBsemis⋅_                                   ✓ nameFirst nameRest* ⇒  "_pBsemis"
_pBsemis⋅_                                     ✓ nameFirst ⇒  "_"
_pBsemis⋅_                                         ✓ "_" ⇒  "_"
pBsemis⋅_p                                     ✓ nameRest* ⇒  "pBsemis"
pBsemis⋅_p                                       ✓ nameRest ⇒  "p"
pBsemis⋅_p                                           ✗ "_"
pBsemis⋅_p                                           ✓ alnum ⇒  "p"
pBsemis⋅_p                                               ✓ letter ⇒  "p"
pBsemis⋅_p                                                   ✓ lower ⇒  "p"
pBsemis⋅_p                                                     ✓ Unicode [Ll] character ⇒  "p"
Bsemis⋅_pB                                       ✓ nameRest ⇒  "B"
Bsemis⋅_pB                                           ✗ "_"
Bsemis⋅_pB                                           ✓ alnum ⇒  "B"
Bsemis⋅_pB                                               ✓ letter ⇒  "B"
Bsemis⋅_pB                                                   ✗ lower
Bsemis⋅_pB                                                     ✗ Unicode [Ll] character
Bsemis⋅_pB                                                   ✓ upper ⇒  "B"
Bsemis⋅_pB                                                     ✓ Unicode [Lu] character ⇒  "B"
semis⋅_pBs                                       ✓ nameRest ⇒  "s"
semis⋅_pBs                                           ✗ "_"
semis⋅_pBs                                           ✓ alnum ⇒  "s"
semis⋅_pBs                                               ✓ letter ⇒  "s"
semis⋅_pBs                                                   ✓ lower ⇒  "s"
semis⋅_pBs                                                     ✓ Unicode [Ll] character ⇒  "s"
emis⋅_pBs)                                       ✓ nameRest ⇒  "e"
emis⋅_pBs)                                           ✗ "_"
emis⋅_pBs)                                           ✓ alnum ⇒  "e"
emis⋅_pBs)                                               ✓ letter ⇒  "e"
emis⋅_pBs)                                                   ✓ lower ⇒  "e"
emis⋅_pBs)                                                     ✓ Unicode [Ll] character ⇒  "e"
mis⋅_pBs)+                                       ✓ nameRest ⇒  "m"
mis⋅_pBs)+                                           ✗ "_"
mis⋅_pBs)+                                           ✓ alnum ⇒  "m"
mis⋅_pBs)+                                               ✓ letter ⇒  "m"
mis⋅_pBs)+                                                   ✓ lower ⇒  "m"
mis⋅_pBs)+                                                     ✓ Unicode [Ll] character ⇒  "m"
is⋅_pBs)+⋅                                       ✓ nameRest ⇒  "i"
is⋅_pBs)+⋅                                           ✗ "_"
is⋅_pBs)+⋅                                           ✓ alnum ⇒  "i"
is⋅_pBs)+⋅                                               ✓ letter ⇒  "i"
is⋅_pBs)+⋅                                                   ✓ lower ⇒  "i"
is⋅_pBs)+⋅                                                     ✓ Unicode [Ll] character ⇒  "i"
s⋅_pBs)+⋅_                                       ✓ nameRest ⇒  "s"
s⋅_pBs)+⋅_                                           ✗ "_"
s⋅_pBs)+⋅_                                           ✓ alnum ⇒  "s"
s⋅_pBs)+⋅_                                               ✓ letter ⇒  "s"
s⋅_pBs)+⋅_                                                   ✓ lower ⇒  "s"
s⋅_pBs)+⋅_                                                     ✓ Unicode [Ll] character ⇒  "s"
⋅_pBs)+⋅_p                                       ✗ nameRest
⋅_pBs)+⋅_p                                           ✗ "_"
⋅_pBs)+⋅_p                                           ✗ alnum
⋅_pBs)+⋅_p                                               ✗ letter
⋅_pBs)+⋅_p                                                   ✗ lower
⋅_pBs)+⋅_p                                                     ✗ Unicode [Ll] character
⋅_pBs)+⋅_p                                                   ✗ upper
⋅_pBs)+⋅_p                                                     ✗ Unicode [Lu] character
⋅_pBs)+⋅_p                                                   ✗ unicodeLtmo
⋅_pBs)+⋅_p                                                     ✗ Unicode [Ltmo] character
⋅_pBs)+⋅_p                                               ✗ digit
⋅_pBs)+⋅_p                                                 ✗ "0".."9"
⋅_pBs)+⋅_p                                 ✓ spaces ⇒  "⋅"
⋅_pBs)+⋅_p                                   ✓ space* ⇒  "⋅"
⋅_pBs)+⋅_p                                     ✓ space ⇒  "⋅"
⋅_pBs)+⋅_p                                       ✓ "\u0000".." " ⇒  "⋅"
_pBs)+⋅_pC                                     ✗ space
_pBs)+⋅_pC                                       ✗ "\u0000".." "
_pBs)+⋅_pC                             ✓ rwInsideParenArgDef ⇒  "_pBs"
_pBs)+⋅_pC                               ✓ name spaces ⇒  "_pBs"
_pBs)+⋅_pC                                 ✓ name ⇒  "_pBs"
_pBs)+⋅_pC                                   ✓ nameFirst nameRest* ⇒  "_pBs"
_pBs)+⋅_pC                                     ✓ nameFirst ⇒  "_"
_pBs)+⋅_pC                                         ✓ "_" ⇒  "_"
pBs)+⋅_pC]                                     ✓ nameRest* ⇒  "pBs"
pBs)+⋅_pC]                                       ✓ nameRest ⇒  "p"
pBs)+⋅_pC]                                           ✗ "_"
pBs)+⋅_pC]                                           ✓ alnum ⇒  "p"
pBs)+⋅_pC]                                               ✓ letter ⇒  "p"
pBs)+⋅_pC]                                                   ✓ lower ⇒  "p"
pBs)+⋅_pC]                                                     ✓ Unicode [Ll] character ⇒  "p"
Bs)+⋅_pC]⋅                                       ✓ nameRest ⇒  "B"
Bs)+⋅_pC]⋅                                           ✗ "_"
Bs)+⋅_pC]⋅                                           ✓ alnum ⇒  "B"
Bs)+⋅_pC]⋅                                               ✓ letter ⇒  "B"
Bs)+⋅_pC]⋅                                                   ✗ lower
Bs)+⋅_pC]⋅                                                     ✗ Unicode [Ll] character
Bs)+⋅_pC]⋅                                                   ✓ upper ⇒  "B"
Bs)+⋅_pC]⋅                                                     ✓ Unicode [Lu] character ⇒  "B"
s)+⋅_pC]⋅⎨                                       ✓ nameRest ⇒  "s"
s)+⋅_pC]⋅⎨                                           ✗ "_"
s)+⋅_pC]⋅⎨                                           ✓ alnum ⇒  "s"
s)+⋅_pC]⋅⎨                                               ✓ letter ⇒  "s"
s)+⋅_pC]⋅⎨                                                   ✓ lower ⇒  "s"
s)+⋅_pC]⋅⎨                                                     ✓ Unicode [Ll] character ⇒  "s"
)+⋅_pC]⋅⎨p                                       ✗ nameRest
)+⋅_pC]⋅⎨p                                           ✗ "_"
)+⋅_pC]⋅⎨p                                           ✗ alnum
)+⋅_pC]⋅⎨p                                               ✗ letter
)+⋅_pC]⋅⎨p                                                   ✗ lower
)+⋅_pC]⋅⎨p                                                     ✗ Unicode [Ll] character
)+⋅_pC]⋅⎨p                                                   ✗ upper
)+⋅_pC]⋅⎨p                                                     ✗ Unicode [Lu] character
)+⋅_pC]⋅⎨p                                                   ✗ unicodeLtmo
)+⋅_pC]⋅⎨p                                                     ✗ Unicode [Ltmo] character
)+⋅_pC]⋅⎨p                                               ✗ digit
)+⋅_pC]⋅⎨p                                                 ✗ "0".."9"
)+⋅_pC]⋅⎨p                                 ✓ spaces ⇒  ""
)+⋅_pC]⋅⎨p                                   ✓ space* ⇒  ""
)+⋅_pC]⋅⎨p                                     ✗ space
)+⋅_pC]⋅⎨p                                       ✗ "\u0000".." "
)+⋅_pC]⋅⎨p                             ✗ rwInsideParenArgDef
)+⋅_pC]⋅⎨p                               ✗ name spaces
)+⋅_pC]⋅⎨p                                 ✗ name
)+⋅_pC]⋅⎨p                                   ✗ nameFirst nameRest*
)+⋅_pC]⋅⎨p                                     ✗ nameFirst
)+⋅_pC]⋅⎨p                                         ✗ "_"
)+⋅_pC]⋅⎨p                                         ✗ letter
)+⋅_pC]⋅⎨p                                             ✗ lower
)+⋅_pC]⋅⎨p                                               ✗ Unicode [Ll] character
)+⋅_pC]⋅⎨p                                             ✗ upper
)+⋅_pC]⋅⎨p                                               ✗ Unicode [Lu] character
)+⋅_pC]⋅⎨p                                             ✗ unicodeLtmo
)+⋅_pC]⋅⎨p                                               ✗ Unicode [Ltmo] character
)+⋅_pC]⋅⎨p                           ✓ ")" ⇒  ")"
+⋅_pC]⋅⎨pr                             ✓ "+" ⇒  "+"
⋅_pC]⋅⎨pri                   ✓ spaces ⇒  "⋅"
⋅_pC]⋅⎨pri                     ✓ space* ⇒  "⋅"
⋅_pC]⋅⎨pri                       ✓ space ⇒  "⋅"
⋅_pC]⋅⎨pri                         ✓ "\u0000".." " ⇒  "⋅"
_pC]⋅⎨prin                       ✗ space
_pC]⋅⎨prin                         ✗ "\u0000".." "
_pC]⋅⎨prin                 ✓ rwArgDef spaces ⇒  "_pC"
_pC]⋅⎨prin                   ✓ rwArgDef ⇒  "_pC"
_pC]⋅⎨prin                       ✗ rwParenthesizedIterArgDef
_pC]⋅⎨prin                         ✗ "(" rwInsideParenArgDef+ ")" ("+" | "*" | "?")
_pC]⋅⎨prin                           ✗ "("
_pC]⋅⎨prin                       ✗ rwIterArgDef
_pC]⋅⎨prin                         ✗ name ("+" | "*" | "?")
_pC]⋅⎨prin                           ✓ name ⇒  "_pC"
_pC]⋅⎨prin                             ✓ nameFirst nameRest* ⇒  "_pC"
_pC]⋅⎨prin                               ✓ nameFirst ⇒  "_"
_pC]⋅⎨prin                                   ✓ "_" ⇒  "_"
pC]⋅⎨print                               ✓ nameRest* ⇒  "pC"
pC]⋅⎨print                                 ✓ nameRest ⇒  "p"
pC]⋅⎨print                                     ✗ "_"
pC]⋅⎨print                                     ✓ alnum ⇒  "p"
pC]⋅⎨print                                         ✓ letter ⇒  "p"
pC]⋅⎨print                                             ✓ lower ⇒  "p"
pC]⋅⎨print                                               ✓ Unicode [Ll] character ⇒  "p"
C]⋅⎨print⋅                                 ✓ nameRest ⇒  "C"
C]⋅⎨print⋅                                     ✗ "_"
C]⋅⎨print⋅                                     ✓ alnum ⇒  "C"
C]⋅⎨print⋅                                         ✓ letter ⇒  "C"
C]⋅⎨print⋅                                             ✗ lower
C]⋅⎨print⋅                                               ✗ Unicode [Ll] character
C]⋅⎨print⋅                                             ✓ upper ⇒  "C"
C]⋅⎨print⋅                                               ✓ Unicode [Lu] character ⇒  "C"
]⋅⎨print⋅‛                                 ✗ nameRest
]⋅⎨print⋅‛                                     ✗ "_"
]⋅⎨print⋅‛                                     ✗ alnum
]⋅⎨print⋅‛                                         ✗ letter
]⋅⎨print⋅‛                                             ✗ lower
]⋅⎨print⋅‛                                               ✗ Unicode [Ll] character
]⋅⎨print⋅‛                                             ✗ upper
]⋅⎨print⋅‛                                               ✗ Unicode [Lu] character
]⋅⎨print⋅‛                                             ✗ unicodeLtmo
]⋅⎨print⋅‛                                               ✗ Unicode [Ltmo] character
]⋅⎨print⋅‛                                         ✗ digit
]⋅⎨print⋅‛                                           ✗ "0".."9"
]⋅⎨print⋅‛                             ✗ "+"
]⋅⎨print⋅‛                             ✗ "*"
]⋅⎨print⋅‛                             ✗ "?"
_pC]⋅⎨prin                       ✓ rwSimpleArgDef ⇒  "_pC"
_pC]⋅⎨prin                         ✓ name ⇒  "_pC"
_pC]⋅⎨prin                           ✓ nameFirst nameRest* ⇒  "_pC"
_pC]⋅⎨prin                             ✓ nameFirst ⇒  "_"
_pC]⋅⎨prin                                 ✓ "_" ⇒  "_"
pC]⋅⎨print                             ✓ nameRest* ⇒  "pC"
pC]⋅⎨print                               ✓ nameRest ⇒  "p"
pC]⋅⎨print                                   ✗ "_"
pC]⋅⎨print                                   ✓ alnum ⇒  "p"
pC]⋅⎨print                                       ✓ letter ⇒  "p"
pC]⋅⎨print                                           ✓ lower ⇒  "p"
pC]⋅⎨print                                             ✓ Unicode [Ll] character ⇒  "p"
C]⋅⎨print⋅                               ✓ nameRest ⇒  "C"
C]⋅⎨print⋅                                   ✗ "_"
C]⋅⎨print⋅                                   ✓ alnum ⇒  "C"
C]⋅⎨print⋅                                       ✓ letter ⇒  "C"
C]⋅⎨print⋅                                           ✗ lower
C]⋅⎨print⋅                                             ✗ Unicode [Ll] character
C]⋅⎨print⋅                                           ✓ upper ⇒  "C"
C]⋅⎨print⋅                                             ✓ Unicode [Lu] character ⇒  "C"
]⋅⎨print⋅‛                               ✗ nameRest
]⋅⎨print⋅‛                                   ✗ "_"
]⋅⎨print⋅‛                                   ✗ alnum
]⋅⎨print⋅‛                                       ✗ letter
]⋅⎨print⋅‛                                           ✗ lower
]⋅⎨print⋅‛                                             ✗ Unicode [Ll] character
]⋅⎨print⋅‛                                           ✗ upper
]⋅⎨print⋅‛                                             ✗ Unicode [Lu] character
]⋅⎨print⋅‛                                           ✗ unicodeLtmo
]⋅⎨print⋅‛                                             ✗ Unicode [Ltmo] character
]⋅⎨print⋅‛                                       ✗ digit
]⋅⎨print⋅‛                                         ✗ "0".."9"
]⋅⎨print⋅‛                   ✓ spaces ⇒  ""
]⋅⎨print⋅‛                     ✓ space* ⇒  ""
]⋅⎨print⋅‛                       ✗ space
]⋅⎨print⋅‛                         ✗ "\u0000".." "
]⋅⎨print⋅‛                 ✗ rwArgDef spaces
]⋅⎨print⋅‛                   ✗ rwArgDef
]⋅⎨print⋅‛                       ✗ rwParenthesizedIterArgDef
]⋅⎨print⋅‛                         ✗ "(" rwInsideParenArgDef+ ")" ("+" | "*" | "?")
]⋅⎨print⋅‛                           ✗ "("
]⋅⎨print⋅‛                       ✗ rwIterArgDef
]⋅⎨print⋅‛                         ✗ name ("+" | "*" | "?")
]⋅⎨print⋅‛                           ✗ name
]⋅⎨print⋅‛                             ✗ nameFirst nameRest*
]⋅⎨print⋅‛                               ✗ nameFirst
]⋅⎨print⋅‛                                   ✗ "_"
]⋅⎨print⋅‛                                   ✗ letter
]⋅⎨print⋅‛                                       ✗ lower
]⋅⎨print⋅‛                                         ✗ Unicode [Ll] character
]⋅⎨print⋅‛                                       ✗ upper
]⋅⎨print⋅‛                                         ✗ Unicode [Lu] character
]⋅⎨print⋅‛                                       ✗ unicodeLtmo
]⋅⎨print⋅‛                                         ✗ Unicode [Ltmo] character
]⋅⎨print⋅‛                       ✗ rwSimpleArgDef
]⋅⎨print⋅‛                         ✗ name
]⋅⎨print⋅‛                           ✗ nameFirst nameRest*
]⋅⎨print⋅‛                             ✗ nameFirst
]⋅⎨print⋅‛                                 ✗ "_"
]⋅⎨print⋅‛                                 ✗ letter
]⋅⎨print⋅‛                                     ✗ lower
]⋅⎨print⋅‛                                       ✗ Unicode [Ll] character
]⋅⎨print⋅‛                                     ✗ upper
]⋅⎨print⋅‛                                       ✗ Unicode [Lu] character
]⋅⎨print⋅‛                                     ✗ unicodeLtmo
]⋅⎨print⋅‛                                       ✗ Unicode [Ltmo] character
]⋅⎨print⋅‛               ✓ "]" ⇒  "]"
⋅⎨print⋅‛p               ✓ spaces ⇒  "⋅"
⋅⎨print⋅‛p                 ✓ space* ⇒  "⋅"
⋅⎨print⋅‛p                   ✓ space ⇒  "⋅"
⋅⎨print⋅‛p                     ✓ "\u0000".." " ⇒  "⋅"
⎨print⋅‛pr                   ✗ space
⎨print⋅‛pr                     ✗ "\u0000".." "
⎨print⋅‛pr               ✓ pre? ⇒  ""
⎨print⋅‛pr                 ✗ pre
⎨print⋅‛pr                   ✗ rewriteFormatString
⎨print⋅‛pr                     ✗ "‛" formatChar* "’"
⎨print⋅‛pr                       ✗ "‛"
⎨print⋅‛pr               ✓ spaces ⇒  ""
⎨print⋅‛pr                 ✓ space* ⇒  ""
⎨print⋅‛pr                   ✗ space
⎨print⋅‛pr                     ✗ "\u0000".." "
⎨print⋅‛pr               ✗ "="

