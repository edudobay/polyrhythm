export class MetronomePresenter {
    constructor(element, bpmSource) {
        this.rootElement = element
        this.bpmSource = bpmSource
        this.needle = element.querySelector('.metronome-needle')
        this.maxAngle = 30 // degrees
        this.lastTimestamp = null
        this.animation = null

        this.stopButton = element.querySelector('.metronome-stop')
        this.stopButton.addEventListener('click', event => this.stop())
        this.startButton = element.querySelector('.metronome-start')
        this.startButton.addEventListener('click', event => this.start())
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
        this.showAndHideControls()
    }

    stop() {
        if (this.animation !== null) {
            window.cancelAnimationFrame(this.animation)
        }
        this.animation = null
        this.showAndHideControls()
    }

    started() {
        return this.animation !== null
    }

    stepAnimation(timestamp) {
        if (this.lastTimestamp !== null)
            this.lastTimestamp = timestamp

        const beat = (timestamp - this.lastTimestamp) / 60000 * this.bpm()
        const pos = Math.cos(beat * Math.PI)
        this.needleAt(pos)
        this.start()
    }

    showAndHideControls() {
        const started = this.started()
        this.rootElement.classList.toggle('metronome--stopped', !started)
        this.rootElement.classList.toggle('metronome--started', started)
    }

}


