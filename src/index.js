import { BaseEventHandler } from './common/handler.js'
import { ObservableValue } from './common/observable.js'

import { KeyWatcher } from './keywatcher.js'
import { InputEvent, KeyInputEvent } from './input.js'
import { BpmMatcher, RhythmMatcher, RhythmMeasure, RhythmEvent } from './rhythm.js'

import { BpmPresenter } from './ui/bpm.js'
import { OffsetPresenter } from './ui/offset.js'
import { MetronomePresenter } from './ui/metronome.js'

const watcher = new KeyWatcher(document)
const measure = new RhythmMeasure(100, Date.now())
const matcherLeft = new RhythmMatcher(measure)
const matcherRight = new RhythmMatcher(measure)
const presenterLeft = new OffsetPresenter(document.querySelector('.left-hand'))
const presenterRight = new OffsetPresenter(document.querySelector('.right-hand'))

const bpm = new BpmMatcher()

class EventHandler extends BaseEventHandler {
    constructor() {
        super({
            [InputEvent.Type.KEY]: 'onKey',
            [InputEvent.Type.TAP]: 'onTap',
            [InputEvent.Type.BPM_CHANGE]: 'onBpmChange',
            [InputEvent.Type.BPM_MANUAL_INPUT]: 'onBpmManualInput',
        })
    }

    onKey(event) {
        const isLeft = event.which === KeyInputEvent.Which.LEFT

        const matcher = isLeft ? matcherLeft : matcherRight
        const presenter = isLeft ? presenterLeft : presenterRight
        const m = matcher.input(event)
        presenter.displayOffset(m.offset)
    }

    onTap(event) {
        bpm.input(event)
        const newBpm = bpm.bpm()
        if (!isNaN(newBpm)) {
            changeBpm(newBpm)
        }
    }

    onBpmChange(event) {
        const oldBpm = bpmValue.value()
        const newBpm = event.transform(oldBpm)
        changeBpm(newBpm)
    }

    onBpmManualInput(event) {
        const oldBpm = bpmValue.value()
        const newBpm = parseFloat(prompt('Type the new BPM value', oldBpm))
        if (!isNaN(newBpm)) {
            changeBpm(newBpm)
        }
    }

function changeBpm(newBpm) {
    bpmValue.change(newBpm)
    bpmPresenter.displayBpm(newBpm)
}

const handler = new EventHandler()
watcher.subscribe(handler.asCallable())

const bpmValue = new ObservableValue(60)
const bpmPresenter = new BpmPresenter(document.querySelector('.bpm-component'))
const metronome = new MetronomePresenter(document.querySelector('.metronome-component'), bpmValue)

metronome.start()
document.querySelector('.metronome-stop').addEventListener('click', event => metronome.stop())

