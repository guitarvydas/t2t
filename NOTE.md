Suggestion: make Unicode characters, like "₋", be lower case letters.

Then, 

```
rewriteDef = "%" spaces "rewrite" spaces name spaces "{" spaces rewriteRule+ spaces "}" spaces
```

could be rewritten as:

```
rewriteDef = "%" ₋ "rewrite" ₋ name ₋ "{" ₋ rewriteRule+ ₋ "}" ₋
₋ = spaces
```


