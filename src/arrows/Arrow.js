import React, { Component } from "react";
import SvgLabel from "../common/SvgLabel";

class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      labelX: 0,
      numberX: 0
    };
    this.spacing = 1;
  }

  componentDidMount() {
    this.position();
  }

  position() {
    const numberWidth = this.number ? this.number.getBBox().width : 0;
    const fullWidth = this.arrow ? this.arrow.getBBox().width : 0;
    const contentWidth = fullWidth - this.spacing - 2 * this.props.edge;
    const labelWidth = contentWidth - numberWidth - this.spacing;
    const numberX = this.label ? this.label.largestWidth : 0;
    const labelX = numberX + numberWidth + this.spacing;

    this.setState({
      labelWidth,
      labelX,
      numberX
    });
  }

  render() {
    const { x = 0, y = 0, width = 20, height = 10, edge, fill } = this.props;

    const arrowPoints = [
      "M",
      x,
      y,
      "H",
      x + width - edge,
      "L",
      x + width,
      y + height / 2,
      "L",
      x + width - edge,
      y + height,
      "H",
      x,
      "L",
      x + edge,
      y + height / 2,
      "Z"
    ].join(" ");

    return (
      <g>
        <path
          d={arrowPoints}
          fill={fill}
          className="Arrow--arrow"
          ref={arrow => (this.arrow = arrow)}
        />
        <text
          x={x + this.state.numberX}
          y={5}
          className="Arrow--number"
          dominantBaseline="middle"
          ref={number => (this.number = number)}
        >
          {this.props.index}
        </text>
        <SvgLabel
          onPosition={this.position()}
          ref={label => (this.label = label)}
          className="Arrow--label"
          y={5}
          x={x + this.state.labelX}
          width={this.state.labelWidth}
          verticalAlign="middle"
        >
          {this.props.step.label}
        </SvgLabel>
      </g>
    );
  }
}

export default Arrow;
