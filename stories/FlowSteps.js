import React from "react";
import FlowSteps from "../src/flow";
import Model from "../src/Model";
import "../src/flow/Steps.css";

class FlowStepsStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new Model([
        { label: "First step" },
        { label: "Second step" },
        { label: "Step three" },
        { label: "Final step" }
      ])
    };
  }

  render() {
    return (
      <div>
        <FlowSteps model={this.state.model} />
        <button onClick={this.next.bind(this)}>next</button>
        <button onClick={this.previous.bind(this)}>previous</button>
      </div>
    );
  }

  next() {
    this.setState(prevState => {
      return {
        model: prevState.model.next()
      };
    });
  }

  previous() {
    this.setState(prevState => {
      return {
        model: prevState.model.previous()
      };
    });
  }
}

export default FlowStepsStory;
