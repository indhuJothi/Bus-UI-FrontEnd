import React from "react";
import Menu from "./menu";
import Search from "../bus/Search/search";
import Header from "./header/header";
import { userContext } from "../context/context";
import { withRouter } from "react-router-dom";

class Common extends React.Component {

  render() {

    return (
      <>
        <Header />
        <Menu />
        <Search />
      </>
    );
  }
}

export default withRouter(Common);
