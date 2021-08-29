import React from "react";
import { Route, Redirect } from "react-router-dom";

function isLogin() {
  if (localStorage.getItem("name")) {
    return true;
  }
  else 
  {
    return false
  }
}

// console.log(isLogin);
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("name")? <Component {...props} /> : console.log("notredirected")
      }
    />
  );
};

// export default PrivateRoute;
