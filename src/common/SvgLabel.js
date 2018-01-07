import React, { Component } from "react";
import PropTypes from "prop-types";
import { wrapText } from "../text";

class SvgLabel extends Component {
  constructor(props) {
    super(props);

    const { x, y, width, verticalAlign, ...rest } = props;
    this.verticalAlign = verticalAlign;
    this.restProps = rest;
    this.lineHeight = 0;

    this.state = {
      lines: [props.children],
      x,
      y,
      width,
      height: 0
    };
  }

  componentDidMount() {
    this.lineHeight = parseInt(this.labelRef.style.fontSize.replace("px", ""));

    const lines = this.breakLines();
    const height = lines.length * this.labelRef.getBBox().height;

    this.setState({
      lines,
      height
    });
  }

  breakLines() {
    const parent = this.labelRef.parentNode;
    return wrapText(this.props.children, this.props.width, word => {
      const tmpLabel = this.cloneLabel(word);
      parent.appendChild(tmpLabel);
      const width = tmpLabel.getBBox().width;
      parent.removeChild(tmpLabel);
      return width;
    });
  }

  cloneLabel(text) {
    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.style.cssText = this.labelRef.style.cssText;
    if (this.labelRef.classList.length > 0) {
      label.classList.add(this.labelRef.classList.toString());
    }
    label.textContent = text;
    return label;
  }

  render() {
    let y = this.state.y;
    if (this.verticalAlign === "middle") {
      y -= this.state.height / 2;
    } else if (this.verticalAlign === "baseline") {
      y -= this.state.height;
    }

    return (
      <text
        {...this.restProps}
        ref={ref => (this.labelRef = ref)}
        x={this.state.x}
        y={y}
        alignmentBaseline="hanging"
      >
        {this.state.lines.map((line, index) => {
          return (
            <tspan key={index} x={this.state.x} dy={this.lineHeight}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }
}

SvgLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  verticalAlign: PropTypes.oneOf(["hanging", "middle", "baseline"]),
  children: PropTypes.string
};

export default SvgLabel;
