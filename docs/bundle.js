/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ObservableBase {
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
/* unused harmony export ObservableBase */


const observableMixin = Base => class extends Base {
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
/* harmony export (immutable) */ __webpack_exports__["b"] = observableMixin;


class ObservableValue extends ObservableBase {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ObservableValue;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_enum_js__ = __webpack_require__(5);


class InputEvent {
    constructor(type, timestamp) {
        this.type = type
        this.timestamp = timestamp
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = InputEvent;


class KeyInputEvent extends InputEvent {
    constructor(which, timestamp) {
        super(InputEvent.Type.KEY, timestamp)
        this.which = which
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = KeyInputEvent;


class BpmInputEvent extends InputEvent {
    constructor(inputType, timestamp) {
        super(InputEvent.Type.BPM_CHANGE, timestamp)
        this.amount = (inputType === BpmInputEvent.Type.DECREASE) ? -2 : 2;
    }

    transform(value) {
        return value + this.amount
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BpmInputEvent;


InputEvent.Type = new __WEBPACK_IMPORTED_MODULE_0__common_enum_js__["a" /* EnumType */]('InputEventType', [
    'KEY',
    'TAP',
    'BPM_CHANGE',
    'BPM_MANUAL_INPUT',
    'TOGGLE_START',
])

KeyInputEvent.Which = new __WEBPACK_IMPORTED_MODULE_0__common_enum_js__["a" /* EnumType */]('KeyInputEventType', ['LEFT', 'RIGHT'])
BpmInputEvent.Type = new __WEBPACK_IMPORTED_MODULE_0__common_enum_js__["a" /* EnumType */]('BpmInputEventType', ['DECREASE', 'INCREASE'])


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_handler_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_observable_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keywatcher_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rhythm_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_bpm_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_offset_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_metronome_js__ = __webpack_require__(9);











const bpmValue = new __WEBPACK_IMPORTED_MODULE_1__common_observable_js__["a" /* ObservableValue */](60)

const watcher = new __WEBPACK_IMPORTED_MODULE_2__keywatcher_js__["a" /* KeyWatcher */](document)
const measure = new __WEBPACK_IMPORTED_MODULE_4__rhythm_js__["c" /* RhythmMeasure */](bpmValue, Date.now())
const matcherLeft = new __WEBPACK_IMPORTED_MODULE_4__rhythm_js__["b" /* RhythmMatcher */](measure)
const matcherRight = new __WEBPACK_IMPORTED_MODULE_4__rhythm_js__["b" /* RhythmMatcher */](measure)
const presenterLeft = new __WEBPACK_IMPORTED_MODULE_6__ui_offset_js__["a" /* OffsetPresenter */](document.querySelector('.left-hand'))
const presenterRight = new __WEBPACK_IMPORTED_MODULE_6__ui_offset_js__["a" /* OffsetPresenter */](document.querySelector('.right-hand'))

const bpm = new __WEBPACK_IMPORTED_MODULE_4__rhythm_js__["a" /* BpmMatcher */]()

const bpmPresenter = new __WEBPACK_IMPORTED_MODULE_5__ui_bpm_js__["a" /* BpmPresenter */](document.querySelector('.bpm-component'))
const metronome = new __WEBPACK_IMPORTED_MODULE_7__ui_metronome_js__["a" /* MetronomePresenter */](document.querySelector('.metronome-component'), bpmValue)

class EventHandler extends __WEBPACK_IMPORTED_MODULE_0__common_handler_js__["a" /* BaseEventHandler */] {
    constructor() {
        super({
            [__WEBPACK_IMPORTED_MODULE_3__input_js__["b" /* InputEvent */].Type.KEY]: 'onKey',
            [__WEBPACK_IMPORTED_MODULE_3__input_js__["b" /* InputEvent */].Type.TAP]: 'onTap',
            [__WEBPACK_IMPORTED_MODULE_3__input_js__["b" /* InputEvent */].Type.BPM_CHANGE]: 'onBpmChange',
            [__WEBPACK_IMPORTED_MODULE_3__input_js__["b" /* InputEvent */].Type.BPM_MANUAL_INPUT]: 'onBpmManualInput',
            [__WEBPACK_IMPORTED_MODULE_3__input_js__["b" /* InputEvent */].Type.TOGGLE_START]: 'onToggleStart',
        })
    }

    onKey(event) {
        const isLeft = event.which === __WEBPACK_IMPORTED_MODULE_3__input_js__["c" /* KeyInputEvent */].Which.LEFT

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

    onToggleStart(event) {
        if (metronome.started()) {
            metronome.stop()
        } else {
            metronome.start()
        }
    }
}

function changeBpm(newBpm) {
    bpmValue.change(newBpm)
    bpmPresenter.displayBpm(newBpm)
}

const handler = new EventHandler()
watcher.subscribe(handler.asCallable())

metronome.start()



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseEventHandler {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseEventHandler;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_observable_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_js__ = __webpack_require__(1);



class KeyWatcher extends __WEBPACK_IMPORTED_MODULE_0__common_observable_js__["b" /* observableMixin */](Object) {

    constructor(document) {
        super()
        document.addEventListener('keydown', this.onKeyEvent.bind(this))
    }

    onKeyEvent(event) {
        const lowerKey = event.key.toLowerCase()

        if (lowerKey === 'f') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["c" /* KeyInputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["c" /* KeyInputEvent */].Which.LEFT, event.timeStamp))
        } else if (lowerKey === 'j') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["c" /* KeyInputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["c" /* KeyInputEvent */].Which.RIGHT, event.timeStamp))
        } else if (lowerKey === 'p') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */].Type.TAP, event.timeStamp))
        } else if (lowerKey === '-') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["a" /* BpmInputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["a" /* BpmInputEvent */].Type.DECREASE, event.timeStamp))
        } else if (lowerKey === '=' || lowerKey === '+') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["a" /* BpmInputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["a" /* BpmInputEvent */].Type.INCREASE, event.timeStamp))
        } else if (lowerKey === 'b') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */].Type.BPM_MANUAL_INPUT, event.timeStamp))
        } else if (lowerKey === ' ') {
            this.notify(new __WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */](__WEBPACK_IMPORTED_MODULE_1__input_js__["b" /* InputEvent */].Type.TOGGLE_START, event.timeStamp))
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyWatcher;




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EnumType;
class EnumConstant {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    toString() {
        return `${this.type.name}#${this.name}`
    }
}

function EnumType(name, constants) {
    const values = {}
    for (const name of constants) {
        values[name] = new EnumConstant(name, this)
        this[name] = values[name]
    }
    
    this.constants = values
    this.name = name
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class RhythmEvent {
    constructor() {
        this.timestamp = Date.now()
    }
}
/* unused harmony export RhythmEvent */


class RhythmTimeEvent {
    constructor(beat, offset, offsetMs) {
        this.beat = beat
        this.offset = offset
        this.offsetMs = offsetMs
    }
}

class RhythmMeasure {
    constructor(bpmSource, startAt) {
        this.startAt = startAt
        this.bpmSource = bpmSource
    }

    locate(eventTimestamp) {
        const eventTime = eventTimestamp - this.startAt
        const bpm = this.bpmSource.value()
        const period = 60000 / bpm
        const beat = eventTime / period
        const closestBeat = Math.round(beat)
        const offset = beat - closestBeat
        return new RhythmTimeEvent(beat, offset, offset * period)
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = RhythmMeasure;


class RhythmMatch {
    constructor(expected, actual) {
        this.expected = expected
        this.actual = actual
    }

    get delay() {
        return this.actual - this.expected
    }
}
/* unused harmony export RhythmMatch */


class RhythmMatcher {

    constructor(rhythmMeasure) {
        this.rhythmMeasure = rhythmMeasure
    }

    input(e) {
        const expected = this.rhythmMeasure.locate(e.timestamp)
        return expected
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = RhythmMatcher;


class BpmMatcher {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BpmMatcher;




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BpmPresenter {
    constructor(element) {
        this.text = element.querySelector('.bpm-text')
    }

    displayBpm(bpm) {
        this.text.innerHTML = bpm.toFixed(1) + ' bpm'
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BpmPresenter;




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class OffsetPresenter {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = OffsetPresenter;




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MetronomePresenter {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MetronomePresenter;





/***/ })
/******/ ]);