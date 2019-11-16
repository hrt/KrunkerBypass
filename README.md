Can't be bothered to maintain several repos. Just check [wheelchair](https://github.com/hrt/wheelchair) for a bypass.
# KrunkerBypass
Anti-cheat bypasses for krunker

Featuring only the bare minimum esps (this is not a cheat flex repo but an anti cheat bypass repo). Use Tamper monkey to load any

| Method | 1.8.8 |
| --- | --- |
| [ArgumentsHook](https://github.com/hrt/KrunkerBypass/tree/master/ArgumentsHook) |  ✅  |
| [ArrayHook](https://github.com/hrt/KrunkerBypass/tree/master/ArrayHook) |  ✅  |
| [DecoderHook](https://github.com/hrt/KrunkerBypass/tree/master/DecoderHook) |  havent tried  |
| [FunctionHook](https://github.com/hrt/KrunkerBypass/tree/master/FunctionHook) |  ✅  |


1.8.3 - they begun hooking `String.prototype.replace` to detect modifications

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
