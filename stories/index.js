import React from "react";
import { storiesOf } from "@storybook/react";
import FlowSteps from "../src/flow";
import "../src/flow/Steps.css";

storiesOf("FlowSteps", module).add("default", () => (
  <FlowSteps
    model={[
      { label: "First second" },
      { label: "Step two" },
      { label: "Step three" },
      { label: "Final step" }
    ]}
  />
));
