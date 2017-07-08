import { observableMixin } from './common/observable.js'
import { InputEvent, KeyInputEvent } from './input.js'

export class KeyWatcher extends observableMixin(Object) {

    constructor(document) {
        super()
        document.addEventListener('keydown', this.onKeyUp.bind(this))
    }

    onKeyUp(event) {
        const lowerKey = event.key.toLowerCase()

        if (lowerKey === 'f') {
            this.notify(new KeyInputEvent(KeyInputEvent.Which.LEFT, event.timeStamp))
        } else if (lowerKey === 'j') {
            this.notify(new KeyInputEvent(KeyInputEvent.Which.RIGHT, event.timeStamp))
        } else if (lowerKey === 'p') {
            this.notify(new InputEvent(InputEvent.Type.TAP, event.timeStamp))
        }
    }

}

