Generate and run a tiny DSL on a given source file.

Transpile any text file into another text file.

Transpilation is not restricted only to programs, this tool can transpile program or markdown or XML or data files.

# Usage
You need to supply 
- a grammar
- a rewrite file
- node.js
- a program written in the new nano-DSL syntax.

## Command Line
- nanodsl _libdir_ _grammar_ _rewrite_ _support_ _src_
- generate-mjs _libdir_ _grammar_ _rewrite_ _support_ > _nanodsl.mjs_

	- the first version runs the source code (recommended)
	- the second version generates a nano-dsl written in Javascript that can be run by using node.js (for power users)

# Notes
- this tool maps some new nano-DSL syntax into an existing programming language
- this tool is written in Javascript, but, it can map a nano-DSL to any other programming language, like Python, or Haskell, etc.
- the idea is that it is easier to solve a programming problem by using a solution-centric notation (a nano-DSL), instead of using a general purpose programming language
- it takes less code to write a program in a specific nano-DSL than to write the same program in a general purpose programming language
- this tool happens to be written in Javascript (mostly because it uses OhmJS), but, this fact does not restrict what language the tool works with - this tool is a text-to-text transpiler, and can work on any input text (including non-program text like XML or markdown files)

# tests/
- the basic function of t2t is tested using four useless tests
- to be documented later
- to run all tests, run 'make' in the tests/ directory
# self-compile/
- the core of this tool is a program called _t2t.mjs_
- t2t.mjs can self-compile and can be used to maintain itself
- the core of the tool is written in two files:
  - t2t.grammar
  - t2t.rewrite
- to re-generate a new version of the tool, run 'make' in the self-compile/ directory
  - 'make' creates a new version of _t2t.mjs_ in the self-compile/ directory, but, does not copy the new version into the ../lib directory
	- you need to copy the re-generated version of _t2t.mjs_ into the ../lib directory manually, after you are satisfied that it works properly
# doc/
- the doc/ directory contains README.pdf which is generated from README.pages (using the MacOS 'pages' app)
- the documentation was written for an earlier version of t2t, but, most of the documentation applies to the code contained herein
  - TBD: edit the README.pages document to bring it up to date with this version 
	- most of the edits apply to usage and re-generation details
	- the documentation regarding the format of the _rewrite_ specification remains relevant
	- the ultimate specification of .grammar files is documented in OhmJs.org, whereas the ultimate specifcation of .rewrite files is defined in the sourc files _t2t.grammar_ and _t2t.rewrite_
# lib/
contains the actual t2t.mjs program plus various files required for self-compilation
# nanodsl
- a script that runs the T2T transpiler
- clone this repo
- create a new project directory
- make a copy of the nanodsl script in the new project directory
- create a grammar and a rewrite file, create an empty support file 'support.js'
- invoke the script by supplying a path to the cloned repo lib subdirectory
- usage: ./nanodsl <libdir> <xxx.grammar> <xxx.rewrite> support.js <src>
# Further Reading
doc/T2T.pdf
https://programmingsimplicity.substack.com/p/experiments-with-text-to-text-transpilation
