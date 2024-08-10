SPEC=<your text-to-text specification>.t2t

TEST=<your DSL to be transpiled>

all: t2t.mjs


# to use t2t, write a spec, then generate your rewriter app
#	node t2t.mjs <${SPEC} >rewriter.mjs
# then, use your rewriter app to transpile your test DSL
#	node rewriter.mjs <${TEST}


##
t2t.mjs:
	echo "To build t2t.mjs, use repo 'build-t2t'"

## house-keeping

clean:
	rm -rf *~ junk.*
	rm -rf __pycache__

install-js-requires:
	npm install yargs prompt-sync

