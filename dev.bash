# node ./previous/20241004-t2t.mjs t2t.grammar t2t.rewrite >dev.t2t.mjs
# hand edit dev.t2t.mjs to use previous/20241007-support.mjs
echo
echo '*** 1 ***'
node dev.t2t.mjs test.rewrite >test.rwr.mjs
cat front.part test.grammar middle.part test.rwr.mjs tail.part >dev.test.mjs
node dev.test.mjs test.txt
echo
echo '*** 2 ***'
node dev.t2t.mjs test.rewrite >test.rwr.mjs
cat front.part test2.grammar middle.part test2.rwr.mjs tail.part >dev.test2.mjs
node dev.test2.mjs test2.txt
echo
echo '*** 3 ***'
node dev.t2t.mjs test.rewrite >test.rwr.mjs
cat front.part test3.grammar middle.part test3.rwr.mjs tail.part >dev.test3.mjs
node dev.test3.mjs test3.txt
