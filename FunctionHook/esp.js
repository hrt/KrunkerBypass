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
    var hideHook = function(fn, oFn) { fn.toString = oFn.toString.bind(oFn); }

    const handler = {
      construct(target, args) {
        if (args.length == 2 && args[1].includes('isSeen')) {
            args[1] = args[1].replace(/if\(!\w+\['isSeen'\]\)continue;/, '');
        }
        return new target(...args);
      }
    };

    var original_Function = Function;
    Function = new Proxy(Function, handler);
    hideHook(Function, original_Function);
})()
