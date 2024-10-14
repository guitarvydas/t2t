#!/bin/bash
# usage: make
# (make changes to t2t.grammar and t2t.rewrite, then run 'make' to rebuild t2t.mjs)
LIB=../lib
GRAMMAR=t2t.grammar
REWRITE=t2t.rewrite
node ${LIB}/t2t.mjs ${REWRITE} >temp.rewrite.mjs
cat ${LIB}/front.part.js ${GRAMMAR} ${LIB}/middle.part.js ${LIB}/args.part.js temp.rewrite.mjs ${LIB}/tail.part.js >t2t.mjs
