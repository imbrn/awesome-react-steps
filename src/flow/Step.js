import React from "react";
import classnames from "classnames";

const Step = ({ model, step, index, className, ...rest }) => {
  const drawBackground = () => {
    if (index === 0) {
      return <polygon points="0,0 90,0 100,50 90,100 0,100" />;
    } else {
      if (index === model.size - 1) {
        return <polygon points="0,0 100,0 100,100 0,100 10,50" />;
      } else {
        return <polygon points="0,0 90,0 100,50 90,100 0,100 10,50" />;
      }
    }
  };

  return (
    <div
      className={classnames("FlowStep", className)}
      style={{ marginLeft: -10 }}
      {...rest}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="FlowStep--background"
      >
        {drawBackground()}
      </svg>

      <div className="FlowStep--content">
        <span className="FlowStep--number">{index + 1}</span>
        <span className="FlowStep--label">{step.label}</span>
      </div>
    </div>
  );
};

export default Step;
