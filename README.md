# t2t transpiler tool
- you need to supply 2 grammars and 2 corresponding rewrite scripts
- input is the source text to be converted, output is the converted source
- this tool parses the input text using the 1st grammar then rewrites it per the 1st rwr (rewrite) script
- then the rewritten text is passed through one more grammar+rwr to do simple rewrites - like using sed and REGEXs to 
  clean up the output, but the grammar+rwr combination is more powerful and can pattern match "structured" text
- and you need to specify support (JS) files, if needed (in most cases 'null.js' is sufficient) [details elsewhere]

## concept
- the tool inhales source text, parses it according to the main grammar, then rewrites the text according to the RWR (ReWRite script), then passes the transpiled text to a cleanup pass
- the cleanup pass parses the transformed text and tweaks it according to the cleanup RWR script

# diagram of the tool
![t2t](./t2t.png)

# example
- in the Makefile rule 'all', we see the line:

		python3 main.py . 0D/python swibasm null.js cleanup null.js in.txt main t2t.drawio.json transpile.drawio.json

	- which takes input source from in.txt and outputs the twice rewritten text to stdout
	- the example source file is "in.txt", it contains code the is lisp-flavoured (actually RT - Recursive Text), and that code is converted to .json format
		- 'in.txt' is supposed to be a simple "assembler" for parsing, the .json output is "assembler" written in JSON format
	- the cleanup pass removes superfluous commas at the end of Python lists, i.e ,...] => ...] (where "..." is whitespace)
	- in this example, the main grammar is "swibasm" which is sent to the tool as 1 string "swibasm" and is converted into 2 filenames "swibasm.ohm", and, "swibasm.rwr"
		- the support file for the main grammar is 'null.js'
		- and, the cleanup grammar is "cleanup", which produces 1 string and "cleanup" and is converted into 2 filenames "cleanup.ohm", and, "cleanup.rwr"
	- the grammars are written in OhmJS format (see ohmjs.org)
	- the rewrite scripts are written in RWR format (TBD - should be fairly obvious, though)
	- 'null.js' is an "empty" JS namespace (Just copy it for now. Later, look at examples of support files written in JS - ask me for info).
	- you don't need to know the following to use this tool, but for the record:
		- 'main.py' is the main driver code for this tool, written in Python (other languages available - ask me)
		- '.' is the path of the current working directory
		- '0D/python' is a path to some library code used by this tool
		- 'main' is the tab-name of the main diagram (see the diagram above, see t2t.drawio (use the draw.io editor https://app.diagrams.net))
		- 't2t.drawio.json' is a json-ified version of the semantically interesting parts of the t2t diagram, created by the das2json tool
		- 'transpile.drawio.json' is a json-ified version of the semantically interesting parts of some library code used by this tool, created by the das2json tool

I am happy to answer questoins:
find me on Discord https://discord.gg/UJWjhFJN
email me at: ptcomputingsimplicity@gmail.com
