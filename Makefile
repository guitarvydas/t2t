#	'ensure that formatted text option in draw.io is disabled everywhere'

SRC=test.t2t
D2J=./das2json/mac/das2json

all:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python ${SRC} main t2t.drawio.json transpile.drawio.json

manual:
	node example.js

auto:
	${D2J} t2t.drawio
	${D2J} 0D/python/std/transpile.drawio
	python3 main.py . 0D/python ${SRC} main t2t.drawio.json transpile.drawio.json >t2t.js
	node t2t.js <test.txt

clean:
	rm -rf *.json
	rm -rf *~

install-js-requires:
	npm install yargs prompt-sync

