t2t.mjs: t2t.grammar t2t.rewrite
	@echo '*** regenerating t2t.mjs ***'
	./self-compile.bash

tests: t2t.mjs
	@echo '*** 1 ***'
	./run-self ../lib ../tests/test1.grammar ../tests/test1.rewrite ../tests/null.js ../tests/test1.txt
	@echo
	@echo '*** 2 ***'
	./run-self ../lib ../tests/test2.grammar ../tests/test2.rewrite ../tests/support.js ../tests/test2.txt
	@echo
	@echo '*** 3 ***'
	./run-self ../lib ../tests/test3.grammar ../tests/test3.rewrite ../tests/support.js ../tests/test3.txt
	@echo
	@echo '*** 4 ***'
	./run-self ../lib ../tests/test4.grammar ../tests/test4.rewrite ../tests/support.js ../tests/test4.txt

clean:
	rm -f ./t2t.mjs temp.* *~

