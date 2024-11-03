all:
	@echo '*** 1 ***'
	@../nanodsl ../lib test1.grammar test1.rewrite null.js test1.txt
	@echo
	@echo '*** 2 ***'
	@../nanodsl ../lib test2.grammar test2.rewrite support.js test2.txt
	@echo
	@echo '*** 3 ***'
	@../nanodsl ../lib test3.grammar test3.rewrite support.js test3.txt
	@echo
	@echo '*** 4 ***'
	@../nanodsl ../lib test4.grammar test4.rewrite support.js test4.txt

dsls:
	@echo '*** 1 ***'
	@../generate-mjs ../lib test1.grammar test1.rewrite null.js >dsl1.mjs
	@node dsl1.mjs test1.txt
	@echo
	@echo '*** 2 ***'
	@../generate-mjs ../lib test2.grammar test2.rewrite support.js >dsl2.mjs
	@node dsl2.mjs test2.txt
	@echo
	@echo '*** 3 ***'
	@../generate-mjs ../lib test3.grammar test3.rewrite support.js >dsl3.mjs
	@node dsl3.mjs test3.txt
	@echo
	@echo '*** 4 ***'
	@../generate-mjs ../lib test4.grammar test4.rewrite support.js >dsl4.mjs
	@node dsl4.mjs test4.txt

install-js-requires:
	npm install yargs prompt-sync ohm-js

clean:
	rm -rf temp.* *~ dsl*.mjs


