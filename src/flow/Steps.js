import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import withSteps from "../withSteps";
import Model from "../Model";
import Step from "./Step";

const Steps = ({ model, className }) => {
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

Steps.propTypes = {
  model: PropTypes.instanceOf(Model).isRequired,
  className: PropTypes.string
};

export default withSteps(Steps);
