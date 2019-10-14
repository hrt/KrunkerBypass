
# Explain
Krunker must dynamically execute code since they first decrypt/decode the logic. They can do this using one of the following [methods](https://www.everythingfrontend.com/posts/studying-javascript-eval.html) (or more..):
* `eval`
* `setTimeout`
* `new Function()`
* `document.write()`
* `document.createElement('script'); // ..`

Specifically, they are using `new Function()`. So we can hook this to modify the script directly.

However, they have also placed [some checks](https://github.com/hrt/AnticheatJS#function-modification-detection) to see if `Function` has been modified in anyway: This can easily be bypassed by fixing the `.toString` member of the overwritten class/function.

# How to install / use
## Developer Console F12
1. Open a new tab
2. Open the console by pressing F12 and going to the console tab
3. Copy paste the code from `esp.js` into the console. Do not execute yet
4. Navigate to krunker
5. Execute the pasted code before the you enter your first game

## Tampermonkey script
Copy paste the code from `esp.js` into a new tamper monkey script

## Chromium unpacked extension
0. Enable developer mode
1. Download and extract the project from https://github.com/hrt/KrunkerNameEsp/archive/master.zip
2. Navigate to about://extensions on your chromium browser
3. Drag the relevant folder (e.g. `1.7.6`) into about://extensions
