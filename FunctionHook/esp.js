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

(function(){

    const replace = String.prototype.replace;

    const handler = {
      construct: function(target, args) {
        if (args.length == 2 && args[1].length > 1337) {
            args[1] = replace.apply(args[1], [/if\(!\w+\['lhYWIWew'\]\)continue;/, '']);
        }
        return new target(...args);
      }
    };

    var original_Function = Function;
    var hook_Function = new Proxy(Function, handler);

    var anti_map = [];
    var original_toString = Function.prototype.toString;
    function hook_toString(...args) {
        for (var i = 0; i < anti_map.length; i++) {
            if (anti_map[i].from === this) {
                return anti_map[i].to;
            }
        }
        return original_toString.apply(this, args);
    }

    anti_map.push({from: hook_Function, to: original_Function.toString()});
    anti_map.push({from: hook_toString, to: original_toString.toString()});

    Function = hook_Function;
    Function.prototype.toString = hook_toString;
})()
