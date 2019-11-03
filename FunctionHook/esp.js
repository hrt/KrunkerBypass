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
      construct(target, args) {
        if (args.length == 2 && args[1].includes('Seen')) {
            args[1] = replace.apply(args[1], [/if\(!\w+\['\w+Seen'\]\)continue;/, '']);
        }
        return new target(...args);
      }
    };

    var original_Function = Function;
    Function = new Proxy(Function, handler);
    var hideHook = function(fn, oFn) { fn.toString = oFn.toString.bind(oFn); } (Function, original_Function);
})()
