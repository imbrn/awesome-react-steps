import React from "react";
import { storiesOf } from "@storybook/react";
import Arrows from "../src/arrows";
import "../src/arrows/Arrows.css";
import "./arrows.css";
import Model from "../src/Model";

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

storiesOf("Arrows", module).add("custom style", () => (
  <Arrows
    className="CustomArrows"
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
