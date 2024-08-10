#	'ensure that formatted text option in draw.io is disabled everywhere'

#SRC=simple0.t2t
#SRC=simple1.t2t
SRC=simple2.t2t
#SRC=t2t.t2t
D2J=./das2json/mac/das2json

#TEST=test0.txt
#TEST=test1.txt
TEST=test2.txt

dev: auto

all:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python ${SRC} main t2t.drawio.json transpile.drawio.json

manual:
	node example.js

auto:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python ${SRC} main t2t.drawio.json transpile.drawio.json >simple.mjs
	node simple.mjs <${TEST}


## regression test - can this stuff self-compile itself and compile simple.t2t???

# manually edited t2t.mjs
t2t:
	node t2t.mjs <simple.t2t >simple_regression.mjs
	node simple_regression.mjs <test.txt

t2t_bootstrap:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python t2t.t2t main t2t.drawio.json transpile.drawio.json >t2t.mjs
	node t2t.mjs <simple.t2t >simple_regression.mjs
	node simple_regression.mjs <test.txt


## house-keeping

clean:
	rm -rf *.json
	rm -rf *~

install-js-requires:
	npm install yargs prompt-sync

