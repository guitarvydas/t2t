# usage: node t2t.mjs <grammar> <rewrite> <src>
#  this simply runs the program in <src> using the new syntax defined by <grammar> and <rewrite>
#  basically, this lets you define a new DSL ("SCN" - Solution Centric Notation), and write and run a program written in the new DSL

# for power-users : node t2t.mjs <grammar> <rewrite>
#  this creates Javascript source code that can be used to parse and run the new syntax given by <grammar> and <rewrite>
#  instead of actually running the new DSL, as above, this just creates .mjs source code that can inhale code written in the new DSL and
#  produces a .mjs program that can run programs written in the new DSL

# to maintain:
#`make self
# (followed by make regression - this should show no differences between t2t.mjs and regress-t2t.mjs)

## tests:
## make testt2
## make test2t2

dev:
	node t2t.mjs t2t.grammar t2t.rewrite >dev.t2t.mjs
	node dev.t2t.mjs test3.rewrite >test3.rwr.mjs
	cat front.part test3.grammar middle.part test3.rwr.mjs tail.part >dev.test3.mjs
	node dev.test3.mjs test3.txt


devbig:
	node t2t.mjs t2t.grammar t2t.rewrite >dev.t2t.mjs
	@echo '// *** 1 ***'
	@node dev.t2t.mjs test.rewrite
	@echo '// *** 2 ***'
	@node dev.t2t.mjs test2.rewrite
	@echo '// *** 3 ***'
	@node dev.t2t.mjs test3.rewrite

all: self

testt2t:
	# run a simple test DSL that inhales the single letter "a" and exhales a string "hello world " followed by the matched letter (a)
	node t2t.mjs test.grammar test.rewrite test.txt

test2t2t:
	# create a DSL javascript program test2.mjs and run it against a simple, but, useless test2.txt
	# demonstrating that parameters are being passed downwards during the tree walk
	node t2t.mjs test2.grammar test2.rewrite >test2.mjs
	node test2.mjs test2.txt

test3:
	# re-make self with fixes to t2t, re. evaluating parameter before pushing it onto parameter stack
	make self
	# make test3 to test for evaluated parameter (should print "waltzing...matilda" instead of "undefined...matilda"
	node t2t.mjs test3.grammar test3.rewrite >test3.mjs
	node test3.mjs test3.txt

self:
	node t2t.mjs t2t.grammar t2t.rewrite >stock.t2t.mjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite stock.t2t.mjs >new-t2t.mjs
	mv t2t.mjs old/
	mv new-t2t.mjs t2t.mjs

regression:
	node t2t.mjs t2t.grammar t2t.rewrite >r.stock.t2t.mjs
	node t2t.mjs self_boilerplate.grammar self_boilerplate.rewrite r.stock.t2t.mjs >r.new-t2t.mjs
	diff -w -B r.new-t2t.mjs t2t.mjs
	node r.new-t2t.mjs test.grammar test.rewrite test.txt


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
	rm -rf __pycache__ node_modules package*
	rm -rf r.*

install-js-requires:
	npm install yargs prompt-sync ohm-js

