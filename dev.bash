# # node ./previous/20241004-t2t.mjs t2t.grammar t2t.rewrite >previous.t2t.mjs
# # hand edit previous.t2t.mjs to use previous/20241005-support.mjs

# # # EXPERIMENT to isolate * bug in previous-t2t
# # # use previous t2t to transpile test file dev.rewrite
# # # parameterDefs.rwr ().join ('') should appear
# # # find a previous.t2t.mjs that does this correctly
# # # (previous.t2t.mjs has a subtle bug related to evaluation of scope info)
# node previous/20241004-t2t.mjs dev-simple.grammar dev-simple.rewrite >dev-simple.mjs
# grep 'parameterDefs.rwr' dev-simple.mjs
# node previous/20241004-t2t.mjs dev-simple2.grammar dev-simple2.rewrite >dev-simple2.mjs
# grep 'Expected' dev-simple2.mjs

# # # produce t2t.mjs with * bug due to previous-t2t
# node previous/20241004-t2t.mjs t2t.grammar t2t.rewrite >t2t.mjs
# # # now, fix up and hand-edit all _.pre_fnxyz (`〔a〕〔b〕`); -->    _.pre_fnxyz (`a`,`b`);
# # # and import {_} from './bootstrap_support.mjs';



echo
echo '*** 1 ***'
node t2t.mjs test.rewrite >test.rwr.mjs
node test.rwr.mjs
cat front.part test.grammar middle.part test.rwr.mjs tail.part >new.dev.test.mjs
node new.dev.test.mjs test.txt

echo
echo '*** 2 ***'
node t2t.mjs test2.rewrite >test2.rwr.mjs
cat front.part test2.grammar middle.part test2.rwr.mjs tail.part >new.dev.test2.mjs
node new.dev.test2.mjs test2.txt

echo
echo '*** 3 ***'
node t2t.mjs test3.rewrite >test3.rwr.mjs
cat front.part test3.grammar middle.part test3.rwr.mjs tail.part >new.dev.test3.mjs
node new.dev.test3.mjs test3.txt

echo
echo '*** self ***'
node t2t.mjs t2t.rewrite >t2t.rwr.mjs
cat front.part t2t.grammar middle.part t2t.rwr.mjs tail.part >new.dev.t2t.mjs
# echo '*** self 1 ***'
# node new.dev.t2t.mjs test.rewrite >test.rwr.mjs
# node test.rwr.mjs
# cat front.part test.grammar middle.part test.rwr.mjs tail.part >new.dev.test.mjs
# node new.dev.test.mjs test.txt
# echo
# echo '*** self 2 ***'
# node  new.dev.t2t.mjs test2.rewrite >test2.rwr.mjs
# cat front.part test2.grammar middle.part test2.rwr.mjs tail.part >new.dev.test2.mjs
# node new.dev.test2.mjs test2.txt
echo '*** self 3 ***'
node  new.dev.t2t.mjs test3.rewrite >test3.rwr.mjs
cat front.part test3.grammar middle.part test3.rwr.mjs tail.part >new.dev.test3.mjs
node new.dev.test3.mjs test3.txt

