import React, { Component } from "react";
import "./search.css";
const FromList = [" ", "Chennai", "Madurai", "Trichy"];
class Item extends Component {
  render() {
    return (
      <React.Fragment>
        {FromList.map((From) => (
          <option value={From.value}> {From === " " ? " " : From}</option>
        ))}
      </React.Fragment>
    );
  }
}

export default Item;
