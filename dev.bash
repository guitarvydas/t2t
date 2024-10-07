# node ./previous/20241004-t2t.mjs t2t.grammar t2t.rewrite >dev.t2t.mjs
# hand edit dev.t2t.mjs to use previous/20241007-support.mjs
node dev.t2t.mjs test.rewrite >test.rwr.mjs
cat front.part test2.grammar middle.part test2.rwr.mjs tail.part >dev.test2.mjs
node dev.test2.mjs test2.txt
