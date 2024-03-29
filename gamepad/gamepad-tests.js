/// <reference path="gamepad.d.ts" />
(function () {
    function runAnimation() {
        window.requestAnimationFrame(runAnimation);
        var gamepads = navigator.getGamepads();
        for (var i = 0; i < gamepads.length; ++i) {
            var pad = gamepads[i];
        }
    }
    window.requestAnimationFrame(runAnimation);
});
(function () {
    window.addEventListener('GamepadConnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' connected!');
    }, false);
    window.addEventListener('GamepadDisconnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' disconnected!');
    }, false);
    window.addEventListener('webkitGamepadConnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' connected!');
    }, false);
    window.addEventListener('webkitGamepadDisconnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' disconnected!');
    }, false);
    window.addEventListener('mozGamepadConnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' connected!');
    }, false);
    window.addEventListener('mozGamepadDisconnected', function (e) {
        console.log('Gamepad ' + e.gamepad.index + ' disconnected!');
    }, false);
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame;
    var getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;
    if (getGamepads) {
        function runAnimation() {
            requestAnimationFrame.call(window, runAnimation);
            var gamepads = getGamepads.call(navigator);
            for (var i = 0; i < gamepads.length; i++) {
                var pad = gamepads[i];
                if (pad) {
                    for (var k = 0; k < pad.buttons.length; k++) {
                        var button = pad.buttons[k];
                        if (button !== 0) {
                            console.log('pad[' + pad.index + ']: ' + 'time=' + pad.timestamp + ' id="' + pad.id + '" button[' + k + '] = ' + button);
                        }
                    }
                    for (var k = 0; k < pad.axes.length; k++) {
                        var axis = pad.axes[k];
                        if (Math.abs(axis) > 0.1) {
                            console.log('pad[' + pad.index + ']: ' + 'time=' + pad.timestamp + ' id="' + pad.id + '" axis[' + k + '] = ' + axis);
                        }
                    }
                }
            }
        }
        runAnimation();
    }
})();
//# sourceMappingURL=gamepad-tests.js.map