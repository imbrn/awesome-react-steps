import React from "react";
import SvgLabel from "../common/SvgLabel";

const Arrows = () => {
  return (
    <div style={{ height: "80px" }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 10"
      >
        <g>
          <rect x="0" y="0" width="10" height="10" fill="grey" />
          <SvgLabel
            x={0}
            y={5}
            width={10}
            style={{ fontSize: 2 }}
            verticalAlign="middle"
          >
            This is the text
          </SvgLabel>
        </g>
      </svg>
    </div>
  );
};

export default Arrows;
