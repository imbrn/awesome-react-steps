import React from "react";
import classnames from "classnames";
import withSteps from "../withSteps";
import Step from "./Step";

const Steps = ({ model, setModel, className, ...rest }) => {
  return (
    <div className={classnames("FlowSteps", className)}>
      {model.steps.map((step, index) => (
        <Step
          key={index}
          model={model}
          step={step}
          index={index}
          className="FlowSteps--Step"
        />
      ))}
    </div>
  );
};

export default withSteps(Steps);
