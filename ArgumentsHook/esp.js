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
			players[i]['lhYWIWew'] = true;
		}
	}

	var original_clearRect = CanvasRenderingContext2D.prototype.clearRect;
	function hook_clearRect(...args) {
		original_clearRect.apply(this, args);
		// we cannot access arguments, callee, caller here due to 'use strict'
		// so instead call a function which isn't bounded by 'use strict'
		bypass_use_strict();
	}

    var string_map = {};
	var original_toString = Function.prototype.toString;
	function hook_toString(...args) {
		var return_string = original_toString.apply(this, args);
		if (string_map[return_string]) {
			return_string = string_map[return_string];
		}
		return return_string;
	}

	string_map[hook_clearRect.toString()] = original_clearRect.toString();
	string_map[hook_toString.toString()] = original_toString.toString();

	CanvasRenderingContext2D.prototype.clearRect = hook_clearRect;
	Function.prototype.toString = hook_toString;
})()
