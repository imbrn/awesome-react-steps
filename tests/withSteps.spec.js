import React from "react";
import withSteps from "../src/withSteps";
import Model, { StepState } from "../src/Model";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("the withSteps high-order component", () => {
  let Steps;

  beforeEach(() => {
    Steps = withSteps(MockSteps);
  });

  test("accept props model to be an array", () => {
    const wrapper = mount(
      <Steps model={[{ label: "One" }, { label: "Two" }, { label: "Three" }]} />
    );
    expect(wrapper.find("#steps .size").text()).toBe("3");
  });

  test("accept props model to be an Model instance", () => {
    const wrapper = mount(
      <Steps
        model={
          new Model([{ label: "One" }, { label: "Two" }, { label: "Three" }])
        }
      />
    );
    expect(wrapper.find("#steps .size").text()).toBe("3");
  });

  test("undefined props model will initialize with an empty model", () => {
    const wrapper = mount(<Steps />);
    expect(wrapper.find("#steps .size").text()).toBe("0");
  });

  test("advance should work correctly", () => {
    const wrapper = mount(
      <Steps model={[{ label: "One" }, { label: "Two" }]} />
    );

    expect(wrapper.find("#steps .current").text()).toBe("0");
    wrapper.find("#steps .next-btn").simulate("click");
    expect(wrapper.find("#steps .current").text()).toBe("1");
  });

  test("back should work correctly", () => {
    const wrapper = mount(
      <Steps
        model={
          new Model({
            steps: [{ label: "One" }, { label: "Two" }],
            current: 1
          })
        }
      />
    );

    expect(wrapper.find("#steps .current").text()).toBe("1");
    wrapper.find("#steps .previous-btn").simulate("click");
    expect(wrapper.find("#steps .current").text()).toBe("0");
  });

  test("done should work", () => {
    const wrapper = mount(
      <Steps
        model={
          new Model({
            steps: [{ label: "One" }, { label: "Two" }]
          })
        }
      />
    );

    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.UNTOUCHED.toString()
    );
    wrapper.find("#steps .done-btn").simulate("click");
    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.DONE.toString()
    );
  });

  test("skip should work", () => {
    const wrapper = mount(
      <Steps
        model={
          new Model({
            steps: [{ label: "One" }, { label: "Two" }]
          })
        }
      />
    );

    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.UNTOUCHED.toString()
    );
    wrapper.find("#steps .skip-btn").simulate("click");
    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.SKIPPED.toString()
    );
  });

  test("invalidate should work", () => {
    const wrapper = mount(
      <Steps
        model={
          new Model({
            steps: [{ label: "One" }, { label: "Two" }]
          })
        }
      />
    );

    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.UNTOUCHED.toString()
    );
    wrapper.find("#steps .invalidate-btn").simulate("click");
    expect(wrapper.find("#steps .steps .step-0 .state").text()).toBe(
      StepState.INVALID.toString()
    );
  });
});

const MockSteps = ({ model, next, previous, done, skip, invalidate }) => {
  return (
    <div id="steps">
      <div className="size">{model.size}</div>
      <div className="current">{model.current}</div>
      <div className="steps">
        {model.steps.map((step, index) => (
          <div key={index} className={`step-${index}`}>
            <span className="label">{step.label}</span>
            <span className="state">{step.state}</span>
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={() => next()} />
      <button className="previous-btn" onClick={() => previous()} />
      <button className="done-btn" onClick={() => done()} />
      <button className="skip-btn" onClick={() => skip()} />
      <button className="invalidate-btn" onClick={() => invalidate()} />
    </div>
  );
};
