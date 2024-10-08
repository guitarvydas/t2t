# # node ./previous/20241004-t2t.mjs t2t.grammar t2t.rewrite >previous.t2t.mjs
# # hand edit previous.t2t.mjs to use previous/20241007-support.mjs

# use previous t2t to transpile test file dev.rewrite
# parameterDefs.rwr ().join ('') should appear
# find a previous.t2t.mjs that does this correctly
# (previous.t2t.mjs has a subtle bug related to evaluation of scope info)
node previous/20241004-t2t.mjs dev.grammar dev.rewrite >dev.rwr.mjs
grep parameterDefs dev.rwr.mjs

# node previous.t2t.mjs t2t.rewrite >t2t.rwr.mjs
# cat front.part t2t.grammar middle.part t2t.rwr.mjs tail.part >t2t.mjs
# echo
# echo '*** 1 ***'
# node t2t.mjs test.rewrite >test.rwr.mjs
# node test.rwr.mjs
# # cat front.part test.grammar middle.part test.rwr.mjs tail.part >new.dev.test.mjs
# # node new.dev.test.mjs test.txt

# # echo
# # echo '*** 2 ***'
# # node self.dev.t2t.mjs test2.rewrite >test2.rwr.mjs
# # cat front.part test2.grammar middle.part test2.rwr.mjs tail.part >new.dev.test2.mjs
# # node new.dev.test2.mjs test2.txt

# # echo
# # echo '*** 3 ***'
# # node self.dev.t2t.mjs test3.rewrite >test3.rwr.mjs
# # cat front.part test3.grammar middle.part test3.rwr.mjs tail.part >new.dev.test3.mjs
# # node new.dev.test3.mjs test3.txt
