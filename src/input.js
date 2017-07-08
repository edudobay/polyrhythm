import { EnumType } from './common/enum.js'

export class InputEvent {
    constructor(type, timestamp) {
        this.type = type
        this.timestamp = timestamp
    }
}

export class KeyInputEvent extends InputEvent {
    constructor(which, timestamp) {
        super(InputEvent.Type.KEY, timestamp)
        this.which = which
    }
}

InputEvent.Type = new EnumType('InputEventType', ['KEY', 'TAP'])

KeyInputEvent.Which = new EnumType('KeyInputEventType', ['LEFT', 'RIGHT'])
