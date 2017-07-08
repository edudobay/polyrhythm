export class OffsetPresenter {
    constructor(element) {
        this.needle = element.querySelector('.offset-needle')
        this.text = element.querySelector('.offset-text')
    }

    displayOffset(offset) {
        this.text.innerHTML = offset.toFixed(3)

        const offsetPixels = 100.0 * offset
        this.needle.style.transform = 'translateX(' + offsetPixels + 'px)'

    }
}

