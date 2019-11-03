// ==UserScript==
// @name         Krunker.io Name ESP
// @namespace    https://github.com/hrt
// @version      1.9.9
// @description  Why am I able to see names through walls
// @author       hrt
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
	window.replace = String.prototype.replace;
	var observer = new MutationObserver(function(mutations, observer) {
	    for (var i = 0; i < mutations.length; i++) {
	    	var nodes = mutations[i].addedNodes;
	    	for (var j = 0; j < nodes.length; j++) {
	    		var node = nodes[j];
	    		if (node.tagName == 'SCRIPT' && node.nodeName == 'SCRIPT' && node.src == '') {
					var decoderRegex = /return (\w+\.decode\(\w+\(\)\.subarray\(\w+,\w+\+\w+\)\))/g;
					node.innerHTML = replace.call(node.innerHTML, decoderRegex, `var script=$1;script=replace.call(script,/if\\(!\\w+\\['\\w+Seen'\\]\\)continue;/, '');return script`);
	    		}
	    	}
	    }
	});

	observer.observe(document, {
	  subtree: true,
	  childList: true
	});
})()
