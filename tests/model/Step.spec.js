import Step from "../../src/model/Step";

describe("the Step class", function() {
  it("constructs correctly", () => {
    const step = new Step({
      label: "Step",
      open: true,
      ready: false,
      success: false
    });

    expect(step.label).toBe("Step");
    expect(step.open).toBeTruthy();
    expect(step.ready).toBeFalsy();
    expect(step.success).toBeFalsy();
  });

  it("converts to object", () => {
    const obj = {
      label: "Step",
      open: true,
      ready: false,
      success: false
    };

    const step = new Step(obj);
    expect(step.asObject()).toEqual(obj);
  });

  it("is immutable", () => {
    const data = {
      label: "Step",
      open: true,
      ready: false,
      success: false
    };

    const step = new Step(data);
    expect(step.toObject()).toEqual(data);
    expect(() => (step._label = "Hello")).toThrow();
    expect(() => (step._open = false)).toThrow();
    expect(() => (step._ready = true)).toThrow();
    expect(() => (step._success = true)).toThrow();
    expect(step.toObject()).toEqual(data);
  });

  it("set returns a new object with the modified data", () => {
    const data = {
      label: "Step",
      open: true,
      ready: false,
      success: false
    };

    const newData = {
      label: "Other step",
      open: false,
      ready: true,
      success: true
    };

    const step = new Step(data);
    expect(step.toObject()).toEqual(data);
    const newStep = step.set(newData);
    expect(newStep).not.toBe(step);
    expect(newStep.toObject()).toEqual(newData);
  });

  it("setOpen returns a new object with the modified open value", () => {
    const step = new Step({
      open: false
    });

    let newStep = step.setOpen();
    expect(newStep).not.toBe(step);
    expect(newStep.open).toBeTruthy();
    expect(newStep.closed).toBeFalsy();

    newStep = step.setOpen(false);
    expect(newStep.open).toBeFalsy();
    expect(newStep.closed).toBeTruthy();
  });

  it("setClosed returns a new object with the modified open value", () => {
    const step = new Step({
      open: true
    });

    let newStep = step.setClosed();
    expect(newStep).not.toBe(step);
    expect(newStep.closed).toBeTruthy();
    expect(newStep.open).toBeFalsy();

    newStep = step.setClosed(false);
    expect(newStep.closed).toBeFalsy();
    expect(newStep.open).toBeTruthy();
  });

  it("setReady returns a new object with the modified ready value", () => {
    const step = new Step({
      ready: false
    });

    let newStep = step.setReady();
    expect(newStep).not.toBe(step);
    expect(newStep.ready).toBeTruthy();
    expect(newStep.unready).toBeFalsy();

    newStep = step.setReady(false);
    expect(newStep.ready).toBeFalsy();
    expect(newStep.unready).toBeTruthy();
  });

  it("setUnready returns a new object with the modified ready value", () => {
    const step = new Step({
      ready: true
    });

    let newStep = step.setUnready();
    expect(newStep).not.toBe(step);
    expect(newStep.ready).toBeFalsy();
    expect(newStep.unready).toBeTruthy();

    newStep = step.setUnready(false);
    expect(newStep.ready).toBeTruthy();
    expect(newStep.unready).toBeFalsy();
  });

  it("setSuccess returns a new object with the modified success value", () => {
    const step = new Step({
      success: false
    });

    let newStep = step.setSuccess();
    expect(newStep).not.toBe(step);
    expect(newStep.success).toBeTruthy();
    expect(newStep.failed).toBeFalsy();

    newStep = step.setSuccess(false);
    expect(newStep.success).toBeFalsy();
    expect(newStep.failed).toBeTruthy();
  });

  it("setFailed returns a new object with the modified success value", () => {
    const step = new Step({
      success: true
    });

    let newStep = step.setFailed();
    expect(newStep).not.toBe(step);
    expect(newStep.success).toBeFalsy();
    expect(newStep.failed).toBeTruthy();

    newStep = step.setFailed(false);
    expect(newStep.success).toBeTruthy();
    expect(newStep.failed).toBeFalsy();
  });
});
