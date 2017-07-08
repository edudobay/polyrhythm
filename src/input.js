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

export class BpmInputEvent extends InputEvent {
    constructor(inputType, timestamp) {
        super(InputEvent.Type.BPM_CHANGE, timestamp)
        this.amount = (inputType === BpmInputEvent.Type.DECREASE) ? -2 : 2;
    }

    transform(value) {
        return value + this.amount
    }
}

InputEvent.Type = new EnumType('InputEventType', [
    'KEY',
    'TAP',
    'BPM_CHANGE',
    'BPM_MANUAL_INPUT',
])

KeyInputEvent.Which = new EnumType('KeyInputEventType', ['LEFT', 'RIGHT'])
BpmInputEvent.Type = new EnumType('BpmInputEventType', ['DECREASE', 'INCREASE'])
