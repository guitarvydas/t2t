all:
	@echo '*** 1 ***'
	@../run ../lib test1.grammar test1.rewrite null.js test1.txt
	@echo
	@echo '*** 2 ***'
	@../run ../lib test2.grammar test2.rewrite support.js test2.txt
	@echo
	@echo '*** 3 ***'
	@../run ../lib test3.grammar test3.rewrite support.js test3.txt
	@echo
	@echo '*** 4 ***'
	@../run ../lib test4.grammar test4.rewrite support.js test4.txt

clean:
	rm -rf temp.* *~
