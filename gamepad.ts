/// <reference path="./gamepad.d.ts" />

module GamepadSample{
    export class Gamepad{
        private _ticking: boolean;
        private _gamepads: Array<any>;
        private _prevRawGamepadTypes: Array<any>;
        private _TYPICAL_BUTTON_COUNT: number;
        private _TYPICAL_AXIS_COUNT: number;
        private _lastButtons: Array<any>;


        constructor(){
            this._ticking = false;
            this._gamepads = [];
            this._prevRawGamepadTypes = [];
            this._TYPICAL_BUTTON_COUNT = 16;
            this._TYPICAL_AXIS_COUNT = 4;
            this._lastButtons = [];

            var gamepadSupportAvailable = navigator.getGamepads ||
                !!navigator.webkitGetGamepads;

            if (!gamepadSupportAvailable) {
                //not supported browser
            } else {
                if ('ongamepadconnected' in window) {
                    window.addEventListener('gamepadconnected',
                        this._onGamepadConnect, false);
                    window.addEventListener('gamepaddisconnected',
                        this._onGamepadDisconnect, false);
                } else {
                    // If connection events are not supported just start polling
                    this._startPolling();
                }
            }
        }

        private _onGamepadConnect = ()=>{
            console.log("onconnect");
        };

        private _onGamepadDisconnect = ()=>{
            console.log("disconnect");
        };

        private _startPolling(){
            console.log("startpolling");
            if (!this._ticking) {
                this._ticking = true;
                this._tick();
            }
        }

        private _tick = ()=>{
            this._pollStatus();
            this._scheduleNextTick();
        };

        private _pollStatus(){
            this._pollGamepads();

            if(this._gamepads.length > 0){
                for(var i in this._gamepads[0].buttons){
                    var button = this._gamepads[0].buttons[i];
                    if(button.pressed){
                        console.log(button.value);
                    }

                    if(i >= this._lastButtons.length) {
                        this._lastButtons.push(JSON.parse(JSON.stringify(button)));
                    }

                    if(this._lastButtons[i].pressed != button.pressed) {
                        console.log("pressed " + this._lastButtons[i].value);
                        this.onButtonStateChanged(parseInt(i), button.pressed);
                    }

                    this._lastButtons[i] = JSON.parse(JSON.stringify(button));
                }
            }
        }

        private _pollGamepads(){
            var rawGamepads =
                (navigator.getGamepads && navigator.getGamepads()) ||
                (navigator.webkitGetGamepads && navigator.webkitGetGamepads());


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
                    //  tester.updateGamepads(gamepadSupport.gamepads);
                }
            } else{
                this._gamepads = [];
                this._prevRawGamepadTypes = [];
                this._lastButtons = [];
            }
        }

        private _scheduleNextTick(){
            if (this._ticking) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this._tick);
                }
            }
        }

        public onButtonStateChanged = (number, boolean)=>{  };
    }
}
