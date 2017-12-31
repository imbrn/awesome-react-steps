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
