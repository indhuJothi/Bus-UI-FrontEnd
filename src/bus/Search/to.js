import React, { Component } from "react";
import "./search.css";

const Tolist = ["", "Chennai", "Madurai", "Trichy"];
class To extends Component {
  state = {
    listitems: ["Chennai", "Bangalore", "Trichy"],
  };

  render() {
    return (
      <React.Fragment>
        {Tolist.map((to) => (
          <option value={to.value}> {to === "" ? "" : to}</option>
        ))}
      </React.Fragment>
    );
  }
}

export default To;
