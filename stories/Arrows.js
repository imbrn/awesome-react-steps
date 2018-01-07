import React from "react";
import Arrows from "../src/arrows";
import Model from "../src/Model";
import "../src/arrows/Arrows.css";

class ArrowsStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new Model([
        { label: "First step" },
        { label: "Second step" },
        { label: "Step which needs to be line breaked" },
        { label: "Final step" }
      ])
    };
  }

  render() {
    return (
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Arrows model={this.state.model} style={{ flexGrow: 0 }} />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <button onClick={this.next.bind(this)}>next</button>
          <button onClick={this.previous.bind(this)}>previous</button>
        </div>
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

export default ArrowsStory;
