export class BpmPresenter {
    constructor(element) {
        this.text = element.querySelector('.bpm-text')
    }

    displayBpm(bpm) {
        this.text.innerHTML = bpm.toFixed(1) + ' bpm'
    }
}

