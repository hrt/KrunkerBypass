# KrunkerBypass
Anti-cheat bypasses for krunker

Featuring only the bare minimum esps (this is not a cheat flex repo but an anti cheat bypass repo)

| Method | 1.7.7 |
| --- | --- |
| ArrayPrototypeHook |  ✅  |
| DecoderHook |  ✅  |
| FunctionHook |  ✅  |


## ArrayPrototypeHook
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