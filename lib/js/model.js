"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = exports.StepState = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _freeze = require("./freeze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Steps = function () {
  function Steps(data) {
    _classCallCheck(this, Steps);

    var steps = null;
    var current = 0;

    if (data === undefined) {
      steps = [];
    } else if (Array.isArray(data)) {
      steps = data.slice();
    } else {
      steps = data.steps && Array.isArray(data.steps) ? data.steps.slice() : [];

      if (data.current && typeof data.current === "number") {
        if (data.current < 0) current = 0;else if (data.current >= steps.length) current = steps.length - 1;else current = data.current;
      }
    }

    this._steps = steps.map(function (item) {
      return item instanceof Step ? item : new Step(item);
    });
    this._current = current;

    (0, _freeze.deepFreeze)(this);
  }

  _createClass(Steps, [{
    key: "setSteps",
    value: function setSteps(steps) {
      if (steps === undefined || steps === this._steps) {
        return this;
      }

      return new Steps({
        steps: steps,
        current: this._current
      });
    }
  }, {
    key: "addStep",
    value: function addStep(step) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if ((typeof step === "undefined" ? "undefined" : _typeof(step)) !== "object" || step === null) return this;

      if (!(step instanceof Step)) step = new Step(step);

      var steps = this._steps.slice();

      if (index < 0 || index >= steps.length) {
        steps.push(step);
      } else if (steps[index] === step) {
        return this;
      } else {
        steps.splice(index, 0, step);
      }

      return this.setSteps(steps);
    }
  }, {
    key: "removeStep",
    value: function removeStep(index) {
      if (index === undefined || index === null || index < 0 || index >= this._steps.length) {
        return this;
      }

      var steps = this._steps.slice();
      steps.splice(index, 1);
      return this.setSteps(steps);
    }
  }, {
    key: "changeStep",
    value: function changeStep(index, newStep) {
      if (index < 0 || index >= this._steps.length || this._steps[index] === newStep) {
        return this;
      }

      var steps = this._steps.slice();
      steps.splice(index, 1, newStep);
      return this.setSteps(steps);
    }
  }, {
    key: "setStepState",
    value: function setStepState(stepIndex, state) {
      if (arguments.length === 0) {
        return this;
      } else if (arguments.length === 1) {
        if (!isStepState(arguments[0])) {
          return this;
        }
        return this.setStepState(this._current, arguments[0]);
      }

      if (stepIndex < 0 || stepIndex >= this._steps.length || this._steps[stepIndex].open) {
        return this;
      }

      var newStep = this._steps[stepIndex].setState(state);
      return this.changeStep(stepIndex, newStep);
    }
  }, {
    key: "done",
    value: function done(stepIndex) {
      return this._applyState(stepIndex, function () {
        return StepState.DONE;
      });
    }
  }, {
    key: "skip",
    value: function skip(stepIndex) {
      return this._applyState(stepIndex, function () {
        return StepState.SKIPPED;
      });
    }
  }, {
    key: "invalidate",
    value: function invalidate(stepIndex) {
      return this._applyState(stepIndex, function () {
        return StepState.INVALID;
      });
    }
  }, {
    key: "_applyState",
    value: function _applyState(stepIndex, fn) {
      if (arguments.length === 0) {
        return this;
      }

      if (arguments.length === 1) {
        if (typeof arguments[0] === "function") {
          return this._applyState(this._current, arguments[0]);
        } else {
          return this;
        }
      }

      if (arguments.length === 2 && (arguments[0] === undefined || arguments[0] === null)) {
        return this._applyState(this._current, arguments[1]);
      }

      if (typeof arguments[0] !== "number" || typeof arguments[1] !== "function") {
        return this;
      }

      return this.setStepState(stepIndex, fn(this));
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(current) {
      if (current < 0) current = 0;
      if (current >= this._steps.length) current = this._steps.length - 1;

      if (current === this._current) {
        return this;
      }

      return new Steps({
        steps: this._steps,
        current: current
      });
    }
  }, {
    key: "next",
    value: function next() {
      return this.setCurrent(this._current + 1);
    }
  }, {
    key: "previous",
    value: function previous() {
      return this.setCurrent(this._current - 1);
    }
  }, {
    key: "current",
    get: function get() {
      return this._current;
    }
  }, {
    key: "size",
    get: function get() {
      return this._steps.length;
    }
  }, {
    key: "length",
    get: function get() {
      return this.size();
    }
  }, {
    key: "steps",
    get: function get() {
      return this._steps;
    }
  }]);

  return Steps;
}();

var Step = function () {
  function Step(data) {
    _classCallCheck(this, Step);

    this._label = data && data.label && typeof data.label === "string" ? data.label : "";
    this._state = data && data.state && isStepState(data.state) ? data.state : StepState.UNTOUCHED;
    (0, _freeze.deepFreeze)(this);
  }

  _createClass(Step, [{
    key: "setState",
    value: function setState(newState) {
      if (newState === this._state) {
        return this;
      }
      return new Step({
        label: this._label,
        state: newState
      });
    }
  }, {
    key: "done",
    value: function done() {
      return this.setState(StepState.DONE);
    }
  }, {
    key: "skip",
    value: function skip() {
      return this.setState(StepState.SKIPPED);
    }
  }, {
    key: "invalidate",
    value: function invalidate() {
      return this.setState(StepState.INVALID);
    }
  }, {
    key: "setLabel",
    value: function setLabel(label) {
      if (label === this._label) {
        return this;
      }
      return new Step({
        label: label,
        state: this._state
      });
    }
  }, {
    key: "label",
    get: function get() {
      return this._label;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "isUntouched",
    get: function get() {
      return this._state === StepState.UNTOUCHED;
    }
  }, {
    key: "isTouched",
    get: function get() {
      return !this.isUntouched();
    }
  }, {
    key: "isDone",
    get: function get() {
      return this._state === StepState.DONE;
    }
  }, {
    key: "isSkipped",
    get: function get() {
      return this._state === StepState.SKIPPED;
    }
  }, {
    key: "isInvalid",
    get: function get() {
      return this._state === StepState.INVALID;
    }
  }]);

  return Step;
}();

var StepState = {
  UNTOUCHED: "untouched",
  DONE: "done",
  INVALID: "invalid",
  SKIPPED: "skipped"
};

function isStepState(value) {
  return Object.getOwnPropertyNames(StepState).some(function (name) {
    return StepState[name] === value;
  });
}

exports.StepState = StepState;
exports.Step = Step;
exports.default = Steps;