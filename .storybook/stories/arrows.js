import React from "react";
import { storiesOf } from "@storybook/react";
import Arrows from "../../src/arrows";
import "../../styles/arrows.css";
import "./arrows.css";
import Model, { StepState } from "../../src/model";

storiesOf("Arrows", module).add("default", () => (
  <Arrows
    model={
      new Model({
        steps: [
          { label: "First step" },
          { label: "Step two" },
          { label: "Step three" },
          { label: "Final step" }
        ],
        current: 1
      })
    }
  />
));

storiesOf("Arrows", module).add("blue style", () => (
  <Arrows
    className="BlueArrows"
    model={{
      steps: [
        { label: "First step" },
        { label: "Step two" },
        { label: "Step three" },
        { label: "Final step" }
      ],
      current: 1
    }}
  />
));

storiesOf("Arrows", module).add("red style", () => (
  <Arrows
    style={{ background: "darkred" }}
    model={{
      steps: [
        { label: "First step" },
        { label: "Step two" },
        { label: "Step three" },
        { label: "Final step" }
      ],
      current: 1
    }}
  />
));

storiesOf("Arrows", module).add("yellow/pink style", () => (
  <Arrows
    className="PinkArrows"
    model={{
      steps: [
        { label: "First step" },
        { label: "Step two" },
        { label: "Step three" },
        { label: "Final step" }
      ],
      current: 1
    }}
  />
));

storiesOf("Arrows", module).add("dark style", () => (
  <Arrows
    className="DarkArrows"
    model={{
      steps: [
        { label: "First step" },
        { label: "Step two" },
        { label: "Step three" },
        { label: "Final step" }
      ],
      current: 1
    }}
  />
));

storiesOf("Arrows", module).add("with custom states", () => (
  <Arrows
    className="CustomStates"
    model={{
      steps: [
        { label: "First step", state: StepState.SKIPPED },
        { label: "Step two", state: StepState.INVALID },
        { label: "Step three", state: StepState.DONE },
        { label: "Step four" },
        { label: "Final step" }
      ],
      current: 3
    }}
  />
));