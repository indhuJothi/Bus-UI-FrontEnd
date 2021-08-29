import React, { Component } from "react";
import App from "./UserLogin/loginSingup";
import Ticket from "./ticket";
import Menu from "./menu";
import { userContext } from "../context/context";
import Profile from "./profile/userprofile";
import Common from "./common";
import SeatList from "./seats/seatPage";
import TicketForm from "../bus/TicketForm/ticketForm";
// import PrivateRoute from "./private";
import HistoryTable from "../user/userHistory";
import Search from "../bus/Search/search";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Login from "./UserLogin/login";
import signup from "./UserLogin/signup";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('name')!=null? <Component {...props} /> : <Redirect to="/login"/>
      }
    />
  );
};

class RouteTable extends Component {
  constructor() {
    super();
    {
      this.state = {
        isUserLoggedin: false,
        password: "",
        username: "",
        email: "",
        mobile: "",
      };
      this.getPassword = this.getPassword.bind(this);
    }
  }
  
  getPassword(password, username, email, mobile) {
    this.setState({
      password: password,
      username: username,
      email: email,
      mobile: mobile,
    });

  }
render() {
  let allow 
  let password, username, email, mobile;
  let getPassword = this.getPassword;
  password = this.state.password;
  username = this.state.username;
  email = this.state.email;
  mobile = this.state.mobile;
  let userDetails = {
    username: username,
    email: email,
    mobile: mobile,
    password: password,
  };
  console.log(userDetails)

  if(localStorage.getItem("name"))
  {
    allow=true
  }
    return(
      <userContext.Provider value={userDetails}>
        <BrowserRouter>
        <Switch>
          <Route exact path="/">
            
            <Redirect to="/login"></Redirect>
          </Route>
          <Route
            path="/login">
           {/* {allow?<Redirect to="/search"></Redirect>:  */}
           <Login isuserpass={getPassword.bind(this)} />
          {/* } */}
          </Route>
          <Route exact path="/register" component={signup}/>
          <PrivateRoute path="/menu" component={Menu} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/book-seat" component={SeatList} />
          {/* <Route exact path="/search-box" component={Search} /> */}
          <PrivateRoute path="/ticket-form" component={TicketForm} />
          <PrivateRoute path="/ticket" component={Ticket} />
          <Route exact path="/user-history" component={HistoryTable}/>
          <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
        </userContext.Provider>
    );
  }
}

export default RouteTable;
