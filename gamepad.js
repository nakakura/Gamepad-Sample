/// <reference path="./gamepad.d.ts" />
var GamepadSample;
(function (GamepadSample) {
    var Gamepad = (function () {
        function Gamepad() {
            var _this = this;
            this._onGamepadConnect = function () {
                console.log("onconnect");
            };
            this._onGamepadDisconnect = function () {
                console.log("disconnect");
            };
            this._tick = function () {
                _this._pollStatus();
                _this._scheduleNextTick();
            };
            this.onButtonStateChanged = function (number, boolean) {
            };
            this._ticking = false;
            this._gamepads = [];
            this._prevRawGamepadTypes = [];
            this._TYPICAL_BUTTON_COUNT = 16;
            this._TYPICAL_AXIS_COUNT = 4;
            this._lastButtons = [];
            var gamepadSupportAvailable = navigator.getGamepads || !!navigator.webkitGetGamepads;
            if (!gamepadSupportAvailable) {
            }
            else {
                if ('ongamepadconnected' in window) {
                    window.addEventListener('gamepadconnected', this._onGamepadConnect, false);
                    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnect, false);
                }
                else {
                    // If connection events are not supported just start polling
                    this._startPolling();
                }
            }
        }
        Gamepad.prototype._startPolling = function () {
            console.log("startpolling");
            if (!this._ticking) {
                this._ticking = true;
                this._tick();
            }
        };
        Gamepad.prototype._pollStatus = function () {
            this._pollGamepads();
            if (this._gamepads.length > 0) {
                for (var i in this._gamepads[0].buttons) {
                    var button = this._gamepads[0].buttons[i];
                    if (button.pressed) {
                        console.log(button.value);
                    }
                    if (i >= this._lastButtons.length) {
                        this._lastButtons.push(JSON.parse(JSON.stringify(button)));
                    }
                    if (this._lastButtons[i].pressed != button.pressed) {
                        console.log("pressed " + this._lastButtons[i].value);
                        this.onButtonStateChanged(parseInt(i), button.pressed);
                    }
                    this._lastButtons[i] = JSON.parse(JSON.stringify(button));
                }
            }
        };
        Gamepad.prototype._pollGamepads = function () {
            var rawGamepads = (navigator.getGamepads && navigator.getGamepads()) || (navigator.webkitGetGamepads && navigator.webkitGetGamepads());
            if (rawGamepads) {
                this._gamepads = [];
                var gamepadsChanged = false;
                for (var i = 0; i < rawGamepads.length; i++) {
                    if (typeof rawGamepads[i] != this._prevRawGamepadTypes[i]) {
                        gamepadsChanged = true;
                        this._prevRawGamepadTypes[i] = typeof rawGamepads[i];
                    }
                    if (rawGamepads[i]) {
                        this._gamepads.push(rawGamepads[i]);
                    }
                }
                // Ask the tester to refresh the visual representations of gamepads
                // on the screen.
                if (gamepadsChanged) {
                }
            }
            else {
                this._gamepads = [];
                this._prevRawGamepadTypes = [];
                this._lastButtons = [];
            }
        };
        Gamepad.prototype._scheduleNextTick = function () {
            if (this._ticking) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this._tick);
                }
            }
        };
        return Gamepad;
    })();
    GamepadSample.Gamepad = Gamepad;
})(GamepadSample || (GamepadSample = {}));
//# sourceMappingURL=gamepad.js.map