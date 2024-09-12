#SPEC=simple0.t2t
#SPEC=simple1.t2t
SPEC=simple2.t2t

#TEST=test0.txt
#TEST=test1.txt
TEST=test2.txt

all: ./t2t.mjs ./support.mjs
	node ./t2t.mjs <${SPEC} >rewriter.mjs
	node rewriter.mjs <${TEST}


##
./t2t.mjs : ../t2t.mjs
	cp ../t2t.mjs .

./support.mjs : ../support.mjs
	cp ../support.mjs .

../t2t.mjs:
	echo "To build t2t.mjs, use repo 'build-t2t'"

## house-keeping

clean:
	rm -rf *~ junk.*
	rm -rf __pycache__

install-js-requires:
	npm install yargs prompt-sync ohm-js

