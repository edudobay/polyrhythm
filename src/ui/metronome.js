export class MetronomePresenter {
    constructor(element, bpmSource) {
        this.bpmSource = bpmSource
        this.needle = element.querySelector('.metronome-needle')
        this.maxAngle = 30 // degrees
        this.lastTimestamp = null
        this.animation = null
    }

    needleAt(pos) {
        /* pos [-1, 1] */
        const angle = (pos * this.maxAngle).toFixed(4) // degrees
        this.needle.style.transform = `translateY(50%) rotate(${angle}deg) translateY(-50%)`
    }

    bpm() {
        return this.bpmSource.value()
    }

    start() {
        this.animation = window.requestAnimationFrame(this.stepAnimation.bind(this))
    }

    stop() {
        if (this.animation !== null) {
            window.requestAnimationFrame(this.animation)
        }
    }

    stepAnimation(timestamp) {
        if (this.lastTimestamp !== null)
            this.lastTimestamp = timestamp

        const beat = (timestamp - this.lastTimestamp) / 60000 * this.bpm()
        const pos = Math.cos(beat * Math.PI)
        this.needleAt(pos)
        this.start()
    }

}


