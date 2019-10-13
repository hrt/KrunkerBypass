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
	var observer = new MutationObserver(function(mutations, observer) {
	    for (var i = 0; i < mutations.length; i++) {
	    	var nodes = mutations[i].addedNodes;
	    	for (var j = 0; j < nodes.length; j++) {
	    		var node = nodes[j];
	    		if (node.tagName == 'SCRIPT' && node.nodeName == 'SCRIPT' && node.src == '' && node.innerHTML.includes('Sidney')) {
					var decoderRegex = /return (\w+\.decode\(\w+\(\)\.subarray\(\w+,\w+\+\w+\)\))/;
					var decoder = node.innerHTML.match(decoderRegex)[1];
	    			node.innerHTML = node.innerHTML.replace(decoderRegex, 'var script=' + decoder + `;script=script.replace(/if\\(!tmpObj\\['inView'\\]\\)continue;/, '');return script`);
	    		}
	    	}
	    }
	});

	observer.observe(document, {
	  subtree: true,
	  childList: true
	});
})()