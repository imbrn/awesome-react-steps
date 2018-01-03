import Steps, { Step, StepState } from "../src/Model";

describe("the Steps class", function() {
  test("constructs with no parameters", () => {
    const steps = new Steps();
    expect(steps._steps.length).toBe(0);
  });

  test("constructs with steps as argument", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    expect(steps._steps.length).toBe(2);
    expect(steps._steps[0]).toEqual(new Step({ label: "One" }));
    expect(steps._steps[1]).toEqual(new Step({ label: "Two" }));
  });

  test("constructs with Step as steps instances", () => {
    const steps = new Steps({
      steps: [
        new Step({ label: "One" }),
        new Step({ label: "Two" }),
        new Step({ label: "Three" })
      ]
    });

    expect(steps._steps.length).toBe(3);
  });

  test("constructs with Objects as steps instances", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }]
    });

    expect(steps._steps.length).toBe(2);
    expect(steps._steps[0]).toBeInstanceOf(Step);
    expect(steps._steps[0]).toEqual(new Step({ label: "One" }));
    expect(steps._steps[1]).toBeInstanceOf(Step);
    expect(steps._steps[1]).toEqual(new Step({ label: "Two" }));
  });

  test("constructs with custom current", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }],
      current: 1
    });
    expect(steps._current).toBe(1);
  });

  test("is immutable", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    expect(() => steps._steps.push({ label: "Three" })).toThrow();
    expect(() => (steps._current = 1)).toThrow();
    expect(steps._steps.length).toBe(2);
    expect(steps._current).toBe(0);
  });

  test("setSteps should return the same object when there are no changes", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    const sameSteps = steps.setSteps(steps._steps);
    expect(steps).toBe(sameSteps);
  });

  test("setSteps should return a new object when there are changes", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    const otherSteps = steps.setSteps([
      { label: "One" },
      { label: "Two" },
      { label: "Three" }
    ]);

    expect(steps).not.toBe(otherSteps);
    expect(steps._steps.length).toBe(2);
    expect(otherSteps._steps.length).toBe(3);
    expect(otherSteps._steps).toEqual([
      new Step({ label: "One" }),
      new Step({ label: "Two" }),
      new Step({ label: "Three" })
    ]);
  });

  test("addStep should return the same object when no valid step is specified", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    expect(steps.addStep()).toBe(steps);
    expect(steps.addStep(null)).toBe(steps);
    expect(steps.addStep(1)).toBe(steps);
    expect(steps.addStep("One")).toBe(steps);
  });

  test("addStep should return a new object when valid step is specified", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    let newSteps = steps.addStep({ label: "Three" });
    expect(newSteps).not.toBe(steps);
  });

  test("addStep should insert step at last when there are no index", () => {
    const steps = new Steps([{ label: "One" }, { label: "Two" }]);

    const newSteps = steps.addStep({ label: "Three" });
    expect(newSteps._steps[2]).toEqual(new Step({ label: "Three" }));
  });

  test("addStep should insert step at the specified index", () => {
    let steps = new Steps([{ label: "Three" }]);

    steps = steps.addStep({ label: "One" }, 0).addStep({ label: "Two" }, 1);

    expect(steps._steps).toEqual([
      new Step({ label: "One" }),
      new Step({ label: "Two" }),
      new Step({ label: "Three" })
    ]);
  });

  test("removeStep should return the same object if the specified index is not valid", () => {
    const steps = new Steps([{ label: "One" }]);

    expect(steps.removeStep(-1)).toBe(steps);
    expect(steps.removeStep(2)).toBe(steps);
    expect(steps._steps.length).toBe(1);
  });

  test("removeStep should return a new object is the specified index is valid", () => {
    const steps = new Steps([{ label: "One" }]);

    const newSteps = steps.removeStep(0);
    expect(steps._steps.length).toBe(1);
    expect(newSteps).not.toBe(steps);
    expect(newSteps._steps.length).toBe(0);
  });

  test("removeStep should remove step at the specified index", () => {
    let steps = new Steps([
      { label: "One" },
      { label: "Two" },
      { label: "Three" }
    ]);

    steps = steps.removeStep(0).removeStep(1);

    expect(steps._steps.length).toBe(1);
    expect(steps._steps).toEqual([new Step({ label: "Two" })]);
  });

  test("changeStep should return the same object if there are no changes", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }]
    });

    const sameSteps = steps.changeStep(0, steps._steps[0]);
    expect(steps).toBe(sameSteps);
  });

  test("changeStep should return a new object when there are changes", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }]
    });

    const newSteps = steps.changeStep(0, { label: "New one" });
    expect(newSteps).not.toBe(steps);
  });

  test("changeStep should change the step at the specified index", () => {
    let steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }]
    });

    steps = steps
      .changeStep(0, { label: "New one" })
      .changeStep(2, { label: "New three" });

    expect(steps._steps).toEqual([
      new Step({ label: "New one" }),
      new Step({ label: "Two" }),
      new Step({ label: "New three" })
    ]);
  });

  test("setCurrent should return the same object if there are no changes", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 0
    });

    expect(steps.setCurrent(0)).toBe(steps);
  });

  test("setCurrent should always bound lower and upper index", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }]
    });

    expect(steps.setCurrent(-1)._current).toBe(0);
    expect(steps.setCurrent(5)._current).toBe(2);
  });

  test("next should return the same object if current is the last index", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 2
    });

    const sameSteps = steps.next();
    expect(steps).toBe(sameSteps);
  });

  test("next should return a new object if current is not the last index", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 1
    });

    const newSteps = steps.next();
    expect(steps).not.toBe(newSteps);
  });

  test("next should change current to it plus one", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 1
    });

    const newSteps = steps.next();
    expect(newSteps._current).toBe(steps._current + 1);
  });

  test("previous should return the same object if current is the first index", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 0
    });

    const sameSteps = steps.previous();
    expect(steps).toBe(sameSteps);
  });

  test("previous should return a new object is current is not the first index", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 1
    });

    const newSteps = steps.previous();
    expect(newSteps).not.toBe(steps);
  });

  test("previous should change current to it minus one", () => {
    const steps = new Steps({
      steps: [{ label: "One" }, { label: "Two" }, { label: "Three" }],
      current: 1
    });

    const newSteps = steps.previous();
    expect(newSteps._current).toBe(steps._current - 1);
  });

  test("setStepState should return the same object if there are no changes", () => {
    const steps = new Steps({
      steps: [{ label: "One", state: StepState.DONE }, { label: "Two" }]
    });

    const newSteps = steps.setStepState(0, StepState.DONE);
    expect(newSteps).toBe(steps);
  });

  test("setStepState should return a new object if there are changes", () => {
    const steps = new Steps({
      steps: [{ label: "One", state: StepState.UNTOUCHED }, { label: "Two" }]
    });

    const newSteps = steps.setStepState(0, StepState.DONE);
    expect(newSteps).not.toBe(steps);
  });

  test("setStepState should change the state of the specified step", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    steps = steps
      .setStepState(0, StepState.DONE)
      .setStepState(1, StepState.SKIPPED);

    expect(steps._steps[0].state).toBe(StepState.DONE);
    expect(steps._steps[1].state).toBe(StepState.SKIPPED);
  });

  test("setStepState should use current as index when it is not specified", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ],
      current: 1
    });

    steps = steps.setStepState(StepState.DONE);
    expect(steps._steps[1]._state).toBe(StepState.DONE);
  });

  test("done should use current as index when it is not specified", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ],
      current: 1
    });

    steps = steps.done();
    expect(steps._steps[1]._state).toBe(StepState.DONE);
  });

  test("done should return the same object when step is already done", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.DONE },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const sameSteps = steps.done(0);
    expect(steps).toBe(sameSteps);
  });

  test("done should return a new object when step is not done", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const newSteps = steps.done(0);
    expect(steps).not.toBe(newSteps);
  });

  test("done should change step state to DONE", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    steps = steps.done(0);
    expect(steps._steps[0].state).toBe(StepState.DONE);
  });

  test("skip should use current as index when it is not specified", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ],
      current: 1
    });

    steps = steps.skip();
    expect(steps._steps[1]._state).toBe(StepState.SKIPPED);
  });

  test("skip should return the same object when step is already skipped", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const sameSteps = steps.skip(0);
    expect(steps).toBe(sameSteps);
  });

  test("skip should return a new object when step is not skipped", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const newSteps = steps.skip(0);
    expect(steps).not.toBe(newSteps);
  });

  test("skip should change step state to skipped", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    steps = steps.skip(0);
    expect(steps._steps[0].state).toBe(StepState.SKIPPED);
  });

  test("invalid should use current as index when it is not specified", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.SKIPPED },
        { label: "Two", state: StepState.UNTOUCHED }
      ],
      current: 1
    });

    steps = steps.invalidate();
    expect(steps._steps[1]._state).toBe(StepState.INVALID);
  });

  test("invalid should return the same object when step is already invalid", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.INVALID },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const sameSteps = steps.invalidate(0);
    expect(steps).toBe(sameSteps);
  });

  test("invalid should return a new object when step is not invalid", () => {
    const steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    const newSteps = steps.invalidate(0);
    expect(steps).not.toBe(newSteps);
  });

  test("invalid should change step state to INVALID", () => {
    let steps = new Steps({
      steps: [
        { label: "One", state: StepState.UNTOUCHED },
        { label: "Two", state: StepState.UNTOUCHED }
      ]
    });

    steps = steps.invalidate(0);
    expect(steps._steps[0].state).toBe(StepState.INVALID);
  });
});

describe("the Step class", function() {
  test("is immutable", () => {
    const step = new Step({
      label: "One",
      state: StepState.DONE
    });

    expect(step.label).toBe("One");
    expect(step.state).toBe(StepState.DONE);

    step.setLabel("Two");
    step.setState(StepState.SKIPPED);

    expect(step.label).toBe("One");
    expect(step.state).toBe(StepState.DONE);
  });

  test("setState should return a new object when change state", () => {
    const done = new Step({ state: StepState.DONE });
    const skipped = done.setState(StepState.SKIPPED);
    expect(done).not.toBe(skipped);
    expect(done.state).not.toEqual(skipped.state);
    expect(skipped.state).toBe(StepState.SKIPPED);
  });

  test("setState should return the same object when no change state", () => {
    const done = new Step({ state: StepState.DONE });
    const stillDone = done.setState(StepState.DONE);
    expect(done).toBe(stillDone);
  });

  test("done should return the same object if it is already done", () => {
    const alreadyDone = new Step({ state: StepState.DONE });
    const done = alreadyDone.done();
    expect(done).toBe(alreadyDone);
  });

  test("done should return a new object if it is not done yet", () => {
    const otherState = new Step({ state: StepState.UNTOUCHED });
    const done = otherState.done();
    expect(done).not.toBe(otherState);
  });

  test("done should change step state to done", () => {
    const step = new Step({ state: StepState.UNTOUCHED });
    expect(step.done()._state).toBe(StepState.DONE);
  });

  test("skipped should return the same object if it is already skipped", () => {
    const alreadySkipped = new Step({ state: StepState.SKIPPED });
    const skipped = alreadySkipped.skip();
    expect(skipped).toBe(alreadySkipped);
  });

  test("skipped should return a new object if it is not skipped yet", () => {
    const otherState = new Step({ state: StepState.UNTOUCHED });
    const skipped = otherState.skip();
    expect(skipped).not.toBe(otherState);
  });

  test("skipped should change step state to skipped", () => {
    const step = new Step({ state: StepState.UNTOUCHED });
    expect(step.skip()._state).toBe(StepState.SKIPPED);
  });

  test("invalid should return the same object if it is already invalid", () => {
    const alreadyInvalid = new Step({ state: StepState.INVALID });
    const invalid = alreadyInvalid.invalidate();
    expect(invalid).toBe(alreadyInvalid);
  });

  test("invalid should return a new object if it is not invalid yet", () => {
    const otherState = new Step({ state: StepState.UNTOUCHED });
    const invalid = otherState.invalidate();
    expect(invalid).not.toBe(otherState);
  });

  test("invalid should change step state to invalid", () => {
    const step = new Step({ state: StepState.UNTOUCHED });
    expect(step.invalidate()._state).toBe(StepState.INVALID);
  });

  test("setLabel should return a new object when change label", () => {
    const one = new Step({ label: "One" });
    const two = one.setLabel("Two");
    expect(one).not.toBe(two);
    expect(one.label).not.toEqual(two.label);
    expect(two.label).toBe("Two");
  });

  test("setLabel should return the same object when not change label", () => {
    const one = new Step({ label: "One" });
    const stillOne = one.setLabel("One");
    expect(one).toBe(stillOne);
  });
});
