all:
	@echo 'ensure that formatted text option in draw.io is disabled everywhere'
	./0D/das2json/das2json t2t.drawio
	./0D/das2json/das2json transpile.drawio
	python3 main.py . 0D/python in.txt main t2t.drawio.json transpile.drawio.json

#########

# to install required libs, do this once
install-js-requires:
	npm install yargs prompt-sync

