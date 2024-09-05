# usage: node t2t.mjs <grammar> <rewrite> <src>
#  this simply runs the program in <src> using the new syntax defined by <grammar> and <rewrite>
#  basically, this lets you define a new DSL ("SCN" - Solution Centric Notation), and write and run a program written in the new DSL

# for power-users (not recommended): node t2t.mjs <grammar> <rewrite>
#  this creates Javascript source code that can be used to parse and run the new syntax given by <grammar> and <rewrite>
#  instead of actually running the new DSL, as above, this just creates .mjs source code that can inhale code written in the new DSL and
#  produces a .mjs program that can run programs written in the new DSL


all: self

testt2t:
	node t2t.mjs test.grammar test.rewrite test.txt

self:
	node t2t.mjs t2t.grammar t2t.rewrite >junk-tempmjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite >junk-cut.mjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite junk-temp >new-t2t.mjs
	mv t2t.mjs old-t2t.mjs
	mv new-t2t.mjs t2t.mjs

regression:
	node t2t.mjs t2t.grammar t2t.rewrite >junk-tempmjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite >junk-cut.mjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite junk-temp >regression-t2t.mjs
	diff -w -B regression-t2t.mjs t2t.mjs
	node regression-t2t.mjs test.grammar test.rewrite test.txt


##

readme: doc/README.docx
#	pandoc -s doc/README.docx -t markdown -o README.md
# broken - don't use this yet

doc/README.docx:
	echo 'create a .docx file in doc/README.docx using whatever tools you wish to use'
	echo '(if using Apple Pages, export the file in .docx format)'
	echo '(of course, you can skip all this and just write README.md directly in markdown)'

## house-keeping

clean:
	rm -rf *~ junk.*
	rm -rf __pycache__

install-js-requires:
	npm install yargs prompt-sync

