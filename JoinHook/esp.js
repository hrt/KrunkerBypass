// ==UserScript==
// @name         Kronk name esp
// @version      3.2.0
// @author       github.com/hrt
// @match        https://krunker.io/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function hook_join(wnd) {
		const array_join = wnd.Array.prototype.join;
		wnd.Array.prototype.join = new Proxy(array_join, {
			apply: function(target, _this, _arguments) {
				var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
				if (_arguments.length && _arguments[0] == '' && _this.length > 1000) {
					var game_js = ret;
					game_js = game_js.replace(/(if\(!\w+\['\w+'\]\)conti)nue;/, '/*$1*/'); // esp whilst keeping same script length
					return game_js;
				}
				return ret;
			}
		});
	}

	const append_child = HTMLBodyElement.prototype.appendChild;
	HTMLBodyElement.prototype.appendChild = new Proxy(append_child, {
		apply: function(target, _this, _arguments) {
			var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
			if (_arguments.length && _arguments[0].__proto__ == HTMLIFrameElement.prototype) {
				hook_join(_arguments[0].contentWindow);
			}
			return ret;
		}
	});
})();
