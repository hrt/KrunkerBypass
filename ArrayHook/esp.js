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
    var original_push = Array.prototype.push;
    Array.prototype.push = function(...args) {
        original_push.apply(this, args);
        if (args.length == 1 && args[0] && args[0].armMeshes) {
            Object.defineProperty(args[0], 'isSeen', { get: function() { return true } });
        }
    }
    hideHook(Array.prototype.push, original_push);
})()
