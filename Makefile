#	'ensure that formatted text option in draw.io is disabled everywhere'

#SRC=simple0.t2t
#SRC=simple1.t2t
#SRC=simple2.t2t
SRC=t2t.t2t
D2J=./das2json/mac/das2json

#TEST=test0.txt
#TEST=test1.txt
#TEST=test2.txt
TEST=t2t.t2t

t2t:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python t2t.t2t main t2t.drawio.json transpile.drawio.json >t2t.mjs
	node t2t.mjs <${SRC} >rewriter.mjs
	node rewriter.mjs <${TEST}


## house-keeping

clean:
	rm -rf *.json
	rm -rf *~

install-js-requires:
	npm install yargs prompt-sync

