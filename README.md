# KrunkerBypass
Anti-cheat bypasses for krunker

Featuring only the bare minimum esps (this is not a cheat flex repo but an anti cheat bypass repo). Use Tamper monkey to load any

I do not check if any of the methods ban! Only make sure they work.

| Method | 3.2.0 |
| --- | --- |
| [JoinHook](https://github.com/hrt/KrunkerBypass/tree/master/ArgumentsHook) |  ✅  |

## JoinHook
The html page now uses inline js to load iframes and avoid rigged prototypes. So just rig the creation of iframes and rig the prototypes in the iframes. The game still uses xor encoding eventhough you can figure out the xor key by just observing the encoded message.
```(function anonymous(url) {
return new Promise(function(resolve) { fetch(url).then(res => res.arrayBuffer()).then(function(buffer) { resolve(Array.from(new Uint8Array(buffer)).map(x=>String.fromCharCode(x^85)).join('')) }); });
})('https://krunker.io/pkg/krunker.qaN49.vries')
```
As you can see, they end up using join which we hook. Methods to detect proxies may be relevant here: https://github.com/hrt/ProxyDetectJS

## ArrayHook
The game logic uses arrays to hold entities. We hook the prototype `Array.prototype.push` to access player list.

## DecoderHook
The game must decode the game logic at some point. We modify Krunkers decode function by using `MutationObservers` to access the resulting plain text code.

## FunctionHook
Krunker must dynamically execute code since they first decrypt/decode the logic. They can do this using one of the following [methods](https://www.everythingfrontend.com/posts/studying-javascript-eval.html) (or more..):
* `eval`
* `setTimeout`
* `new Function()`
* `document.write()`
* `document.createElement('script'); // ..`

Specifically, they are using `new Function()`. So we can hook this to modify the script directly.

Worth noting that they have also placed [some checks](https://github.com/hrt/AnticheatJS#function-modification-detection) to see if `Function` has been modified: This can easily be bypassed by fixing the `.toString` member of the overwritten class/function.

## ArgumentsHook
With [a bit of magic](https://github.com/hrt/KrunkerBypass/tree/master/ArgumentsHook/esp.js) we can hook any native function and access the chain of callers along with their respective arguments of said function.

tl;dr we can access almost all variables and functions in the game logic if we wanted to.
