
export class RhythmEvent {
    constructor() {
        this.timestamp = Date.now()
    }
}

class RhythmTimeEvent {
    constructor(beat, offset, offsetMs) {
        this.beat = beat
        this.offset = offset
        this.offsetMs = offsetMs
    }
}

export class RhythmMeasure {
    constructor(bpm, startAt) {
        this.startAt = startAt
        this.bpm = bpm
        this.period = 60000 / bpm
    }

    locate(eventTimestamp) {
        const eventTime = eventTimestamp - this.startAt

        const beat = eventTime / this.period
        const closestBeat = Math.round(beat)
        const offset = beat - closestBeat
        return new RhythmTimeEvent(beat, offset, offset * this.period)
    }
}

export class RhythmMatch {
    constructor(expected, actual) {
        this.expected = expected
        this.actual = actual
    }

    get delay() {
        return this.actual - this.expected
    }
}

export class RhythmMatcher {

    constructor(rhythmMeasure) {
        this.rhythmMeasure = rhythmMeasure
    }

    input(e) {
        const expected = this.rhythmMeasure.locate(e.timestamp)
        return expected
    }
}

export class BpmMatcher {
    constructor() {
        this.events = []
        this.deltas = []
    }

    lastTimestamp() {
        const length = this.events.length
        if (!length) {
            return null
        }
        return this.events[length - 1].timestamp
    }

    input(event) {
        const lastTimestamp = this.lastTimestamp()
        this.events.push(event)

        if (lastTimestamp !== null) {
            this.deltas.push(event.timestamp - lastTimestamp)
        }
    }

    bpm() {
        const delta = this.deltas[this.deltas.length - 1]
        return 60000 / delta
    }

}

