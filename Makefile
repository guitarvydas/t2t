SPEC=<your text-to-text specification>.t2t

TEST=<your DSL to be transpiled>

all: regression


# to use t2t, write a spec, then generate your rewriter app
#	node t2t.mjs <${SPEC} >rewriter.mjs
# then, use your rewriter app to transpile your test DSL
#	node rewriter.mjs <${TEST}


##
t2t.mjs: t2t.t2t support.mjs
	node bootstrap-t2t.mjs <t2t.t2t >t2t.mjs

test:
	# working on rwArgDef return value in test-regression.mjs and looking at multiple args with same name in b.mjs
	node test-regression.mjs <test.t2t >b.mjs

regression:
	node modified-t2t.mjs <t2t.t2t >regression.mjs
	node modified-t2t.mjs <test.t2t >a.mjs
	node regression.mjs <test.t2t >b.mjs
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

