export class ObservableBase {
    constructor() {
        this.subscribers = []
    }

    subscribe(f) {
        this.subscribers.push(f)
    }

    notify(...args) {
        for (let subscriber of this.subscribers) {
            subscriber(...args)
        }
    }
}

export const observableMixin = Base => class extends Base {
    constructor() {
        super()
        this.subscribers = []
    }

    subscribe(f) {
        this.subscribers.push(f)
    }

    notify(...args) {
        for (let subscriber of this.subscribers) {
            subscriber(...args)
        }
    }
}

export class ObservableValue extends ObservableBase {
    constructor(initialValue) {
        super()
        this._value = initialValue
    }

    change(newValue) {
        this._value = newValue
        this.notify(newValue)
    }

    value() {
        return this._value
    }
}
