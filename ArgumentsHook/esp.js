// ==UserScript==
// @name         Krunker.io Name ESP
// @namespace    https://github.com/hrt
// @version      1.9.9
// @description  Krunker anti cheat bypass
// @author       hrt and ttap for mega goat
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*
	Hook canvas clearRect, a function that doesn't take any arguments lmao
	Works because with a little magic we can access the callers callers arguments
	Same idea can be used on a large pool of native functions the game relies on
*/

(function(){
	var original_clearRect = CanvasRenderingContext2D.prototype.clearRect;

	var hideHook = function(fn, oFn) { fn.toString = oFn.toString.bind(oFn); }

	var find_player_list = function(root) {
		var current = root;
		while (current) {
			var args = current.arguments;
			for (var i = 0; i < args.length; i++) {
				if (args[i].players && args[i].players.list) {
					return args[i].players.list;
				}				
			}
			current = current.caller;
		}
		return null;
	}

	var bypass_use_strict = function() {
		// now we can use arguments, callee, caller
		var players = find_player_list(arguments.callee);
		for (var i = 0; players && i < players.length; i++) {
			for (var key in players[i]) {
				if (key.includes("Seen")) {
					players[i][key] = true;
				}
			}
		}
	}

	var rigged_clearRect = function(...args) {
		original_clearRect.apply(this, args);
		// we cannot access arguments, callee, caller here due to 'use strict'
		// so instead call a function which isn't bounded by 'use strict'
		bypass_use_strict();
	}

	hideHook(rigged_clearRect, original_clearRect)
	CanvasRenderingContext2D.prototype.clearRect = rigged_clearRect;
})()
