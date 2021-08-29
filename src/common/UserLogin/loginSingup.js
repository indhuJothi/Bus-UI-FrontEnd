import React from "react";
import "./logreg.css";
import { SignUp } from "./index";
import Login  from "./login";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import "../../common/header/header.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { userContext } from "../../context/context";
import { withRouter } from "react-router";
import Header from "../header/header";

class App extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        isLogin: true,
        hideapp: true,
        mobileNo: " ",
        pass: " ",
        userName: " ",
        useremail: " ",
        alert: null,
      };
      this.handle = this.handle.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
      this.showApp = this.showApp.bind(this);
      this.getUserpass = this.getUserpass.bind(this);
      this.redirectLogin = this.redirectLogin.bind(this);
    }
  }

  showApp(value) {
    this.setState({
      hideapp: value,
    });
  }

  getUserpass(pass,name,useremail,mobile) {
    this.setState({
      pass: pass,
      userName:name,
      useremail:useremail,
      mobileNo: mobile,
    });
    
  }

  handle() {
    this.setState({
      isLogin: true,
    });
  }
  handleSignup(e) {
    e.preventDefault();
    this.setState({
      isLogin: false,
    });
  }
  redirectLogin(val) {
    const getAlert = () => (
      <SweetAlert success title="!" onConfirm={() => this.hideAlert()}>
        You are signed in successfully
        <p>You can now Login</p>
      </SweetAlert>
    );

    if (val) {
      this.setState({
        isLogin: true,
        alert: getAlert(),
      });
    }
  }
  hideAlert() {
    this.setState({
      alert: null,
    });
  }

// componentDidMount()
// {
//   if(this.props.history.action ==="POP" && localStorage.getItem("name"))
//   {
//     this.props.history.push('/search')
//   }
//   sessionStorage.setItem("password",this.state.pass)
// }


  render() {
    const isLogin = this.state.isLogin;
    const showApp = this.showApp;
    const hideapp = this.state.hideapp;
    const isuserpass = this.props.isuserpass;
    const useremail = this.state.useremail;
    const getUserpass = this.getUserpass;
    const redirectLogin = this.redirectLogin;
    let userName = this.state.userName;
    let mobileNo = this.state.mobileNo;
    let pass = this.state.pass;
    return (
      <div>
        
      <div class="body">
        <div class="header">
          <span class="apptitle">Bus Booking App</span>
        </div>
        </div>
        <div class="MainContainer center">
          <button onClick={this.handle} class="button">
            Login
          </button>
          <button onClick={this.handleSignup} class="button">
            Signup
          </button>
          <div>
            {isLogin ? (
              <Login
                prop={showApp.bind(this)}
                getuserpass={getUserpass.bind(this)}
              />
            ) : (
              <SignUp redirectLogin={redirectLogin.bind(this)} />
            )}
          </div>
        </div>

        {hideapp ? null : isuserpass(pass, userName, useremail, mobileNo)}
        {this.state.alert}
        {hideapp ? null : <Redirect to="/search"></Redirect>}
      </div>
    );
  }
}

export default withRouter(App);
