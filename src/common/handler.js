export class BaseEventHandler {
    constructor(handlers) {
        this.handlers = handlers
    }

    handle(event) {
        const methodName = this.handlers[event.type]
        if (methodName === undefined) {
            throw new Error(`no handler for event: ${event.type}`)
        }
        const method = Object.getPrototypeOf(this)[methodName]
        if (typeof method !== 'function') {
            console.log(this)
            throw new Error(`no such method: ${methodName} as a handler for ${event.type}`)
        }
        method.call(this, event)
    }

    asCallable() {
        return this.handle.bind(this)
    }
}

