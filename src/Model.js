import { deepFreeze } from "./utils/freeze";

class Steps {
  constructor(data) {
    let steps = null;
    let current = 0;

    if (data === undefined) {
      steps = [];
    } else if (Array.isArray(data)) {
      steps = data.slice();
    } else {
      steps = data.steps && Array.isArray(data.steps) ? data.steps.slice() : [];

      if (data.current && typeof data.current === "number") {
        if (data.current < 0) current = 0;
        else if (data.current >= steps.length) current = steps.length - 1;
        else current = data.current;
      }
    }

    this._steps = steps.map(
      item => (item instanceof Step ? item : new Step(item))
    );
    this._current = current;

    deepFreeze(this);
  }

  setSteps(steps) {
    if (steps === undefined || steps === this._steps) {
      return this;
    }

    return new Steps({
      steps,
      current: this._current
    });
  }

  addStep(step, index = -1) {
    if (typeof step !== "object" || step === null) return this;

    if (typeof step === "object" && !(step instanceof Step))
      step = new Step(step);

    const steps = this._steps.slice();

    if (index < 0 || index >= steps.length) {
      steps.push(step);
    } else if (steps[index] === step) {
      return this;
    } else {
      steps.splice(index, 0, step);
    }

    return this.setSteps(steps);
  }

  removeStep(index) {
    if (
      index === undefined ||
      index === null ||
      index < 0 ||
      index >= this._steps.length
    ) {
      return this;
    }

    const steps = this._steps.slice();
    steps.splice(index, 1);
    return this.setSteps(steps);
  }

  changeStep(index, newStep) {
    if (
      index < 0 ||
      index >= this._steps.length ||
      this._steps[index] === newStep
    ) {
      return this;
    }

    const steps = this._steps.slice();
    steps.splice(index, 1, newStep);
    return this.setSteps(steps);
  }

  setStepState(stepIndex, state) {
    if (arguments.length === 0) {
      return this;
    } else if (arguments.length === 1) {
      if (!isStepState(arguments[0])) {
        return this;
      }
      return this.setStepState(this._current, arguments[0]);
    }

    if (
      stepIndex < 0 ||
      stepIndex >= this._steps.length ||
      this._steps[stepIndex].open
    ) {
      return this;
    }

    const newStep = this._steps[stepIndex].setState(state);
    return this.changeStep(stepIndex, newStep);
  }

  done(stepIndex) {
    return this._applyState(stepIndex, () => StepState.DONE);
  }

  skip(stepIndex) {
    return this._applyState(stepIndex, () => StepState.SKIPPED);
  }

  invalidate(stepIndex) {
    return this._applyState(stepIndex, () => StepState.INVALID);
  }

  _applyState(stepIndex, fn) {
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

    if (
      arguments.length === 2 &&
      (arguments[0] === undefined || arguments[0] === null)
    ) {
      return this._applyState(this._current, arguments[1]);
    }

    if (
      typeof arguments[0] !== "number" ||
      typeof arguments[1] !== "function"
    ) {
      return this;
    }

    return this.setStepState(stepIndex, fn(this));
  }

  setCurrent(current) {
    if (current < 0) current = 0;
    if (current >= this._steps.length) current = this._steps.length - 1;

    if (current === this._current) {
      return this;
    }

    return new Steps({
      steps: this._steps,
      current
    });
  }

  advance() {
    return this.setCurrent(this._current + 1);
  }

  next() {
    return this.advance();
  }

  back() {
    return this.setCurrent(this._current - 1);
  }

  previous() {
    return this.back();
  }

  get size() {
    return this._steps.length;
  }

  get length() {
    return this.size();
  }
}

class Step {
  constructor(data) {
    this._label =
      data && data.label && typeof data.label === "string" ? data.label : "";
    this._state =
      data && data.state && isStepState(data.state)
        ? data.state
        : StepState.UNTOUCHED;
    deepFreeze(this);
  }

  setState(newState) {
    if (newState === this._state) {
      return this;
    }
    return new Step({
      label: this._label,
      state: newState
    });
  }

  done() {
    return this.setState(StepState.DONE);
  }

  skip() {
    return this.setState(StepState.SKIPPED);
  }

  invalidate() {
    return this.setState(StepState.INVALID);
  }

  setLabel(label) {
    if (label === this._label) {
      return this;
    }
    return new Step({
      label,
      state: this._state
    });
  }

  get label() {
    return this._label;
  }

  get state() {
    return this._state;
  }

  get isUntouched() {
    return this._state === StepState.UNTOUCHED;
  }

  get isTouched() {
    return !this.isUntouched();
  }

  get isDone() {
    return this._state === StepState.DONE;
  }

  get isSkipped() {
    return this._state === StepState.SKIPPED;
  }

  get isInvalid() {
    return this._state === StepState.INVALID;
  }
}

const StepState = {
  UNTOUCHED: 0,
  DONE: 1,
  INVALID: 2,
  SKIPPED: 3
};

function isStepState(value) {
  return Object.getOwnPropertyNames(StepState).some(name => {
    return StepState[name] === value;
  });
}

export { StepState, Step };
export default Steps;
