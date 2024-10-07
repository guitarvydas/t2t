let _ = {

    print : function (when, s) {
	if (when == "pre") {
	    console.log (`pre: ${s}`);
	} else if (when == "post") {
	    console.log (`post: ${s}`);
	} else {
	    console.log (`middle (${when}): ${s}`);
	}
    },
    print2 : function (when, s1, s2) {
	if (when == "pre") {
	    console.log (`pre: ${s1} ${s2}`);
	} else if (when == "post") {
	    console.log (`post: ${s1} ${s2}`);
	} else {
	    console.log (`middle (${when}): ${s1} ${s2}`);
	}
	console.log (`print2: ${s1} ${s2}`); return "";},
};

export {_};
