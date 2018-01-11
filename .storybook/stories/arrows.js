import React from "react";
import { storiesOf } from "@storybook/react";
import Arrows from "../../src/arrows";
import "../../styles/arrows.css";
import "./arrows.css";
import Model from "../../src/model";

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