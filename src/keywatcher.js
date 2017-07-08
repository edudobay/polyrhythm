import { observableMixin } from './common/observable.js'
import { InputEvent, KeyInputEvent, BpmInputEvent } from './input.js'

export class KeyWatcher extends observableMixin(Object) {

    constructor(document) {
        super()
        document.addEventListener('keydown', this.onKeyEvent.bind(this))
    }

    onKeyEvent(event) {
        switch (event.code) {
            case 'KeyA': case 'KeyS': case 'KeyD': case 'KeyF':
                this.notify(new KeyInputEvent(KeyInputEvent.Which.LEFT, event.timeStamp))
                break

            case 'KeyJ': case 'KeyK': case 'KeyL': case 'Semicolon':
                this.notify(new KeyInputEvent(KeyInputEvent.Which.RIGHT, event.timeStamp))
                break
            case 'KeyP':
                this.notify(new InputEvent(InputEvent.Type.TAP, event.timeStamp))
                break
            case 'Minus':
                this.notify(new BpmInputEvent(BpmInputEvent.Type.DECREASE, event.timeStamp))
                break
            case 'Equal':
                this.notify(new BpmInputEvent(BpmInputEvent.Type.INCREASE, event.timeStamp))
                break
            case 'KeyB':
                this.notify(new InputEvent(InputEvent.Type.BPM_MANUAL_INPUT, event.timeStamp))
                break
            case 'Space':
                this.notify(new InputEvent(InputEvent.Type.TOGGLE_START, event.timeStamp))
                break
        }
    }

}

