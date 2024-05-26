#	'ensure that formatted text option in draw.io is disabled everywhere'

all:
	./0D/das2json/das2json t2t.drawio
	./0D/das2json/das2json transpile.drawio
	python3 main.py . 0D/python swibasm swibasm.ohm swibasm.rwr null.js cleanup cleanup.ohm cleanup.rwr null.js in.txt main t2t.drawio.json transpile.drawio.json

#########

# to install required libs, do this once
install-js-requires:
	npm install yargs prompt-sync

