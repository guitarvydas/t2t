# usage: node t2t.mjs <grammar> <rewrite> <src>
#  this simply runs the program in <src> using the new syntax defined by <grammar> and <rewrite>
#  basically, this lets you define a new DSL ("SCN" - Solution Centric Notation), and write and run a program written in the new DSL

# for power-users (not recommended): node t2t-gen.mjs <grammar> <rewrite>
#  this creates a Javascript program that can be used to parse and run the new syntax given by <grammar> and <rewrite>
#  instead of actually running the new DSL, as above, this just creates a .js program that can inhale code written in the new DSL and
#  produces a .js program that can run programs written in the new DSL

# wish-list: t2t.mjs and t2t-gen.mjs are incredibly similar give or take a few lines of code
#  I guess that they should both be combined into a single program, but, I don't have the energy to do this right now, help would be appreciated

all: testt2t

testt2t:
	node t2t.mjs test.grammar test.rewrite test.txt

testt2t-gen:
	node t2t.mjs test.grammar test.rewrite


## obsolete - used during bootstrapping...

t2t-gen.mjs: t2t-gen.t2t support.mjs
	node phase1-t2t.mjs <t2t-gen.t2t >t2t-gen.mjs

regression:
	node phase1-t2t.mjs <t2t-gen.t2t >regression.mjs
	node phase1-t2t.mjs <t2t-gen.t2t >a.mjs
	node regression.mjs <t2t-gen.t2t >b.mjs
	diff -b a.mjs b.mjs

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

