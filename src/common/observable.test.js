import { ObservableBase, ObservableValue } from './observable.js'
import assert from 'assert'

describe('ObservableBase', function () {
    it('should notify subscribers', function () {
        const obs = new ObservableBase()
        var called = false
        obs.subscribe(v => {
            called = true
            assert.equal(v, 'foo')
        })

        obs.notify('foo')

        assert(called, 'callback should have been called')
    })
})

describe('ObservableValue', function () {
    it('should notify subscribers when value changes', function () {
        const obs = new ObservableValue(42)
        obs.subscribe(v => assert.equal(v, 59))
        obs.change(59)
    })

    it('should return initial value', function () {
        const obs = new ObservableValue(42)
        assert.equal(obs.value(), 42)
    })

    it('should return changed value', function () {
        const obs = new ObservableValue(42)
        obs.change(59)
        assert.equal(obs.value(), 59)
    })
})

