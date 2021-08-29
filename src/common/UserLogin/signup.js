import React from "react";
import "./logreg.css";
import data from  "../../resources/user.json";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../header/header";

let pushData;
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: " ",
      email: "",
      mobile: "",
      password: " ",
      confirmpassword: " ",
      usernameErr: " ",
      emailerr: "",
      passerr: "",
      mobileerr: "",
      confirmpasserr: "",
      res: true,
      alert: null,
      redirectLogin:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin=this.handleLogin.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    const username = event.target.username;
    const mobile = event.target.name;
    const password = event.target.password;
    const email = event.target.email;
    const confirmpassword = event.target.confirmpassword;
    this.setState({
      [username]: event.target.value,
      [email]: event.target.value,
      [mobile]: event.target.value,
      [password]: event.target.value,
      [confirmpassword]: event.target.value,
    });
  }
  handleLogin(e)
  {
    e.preventDefault()
    this.setState({
      redirectLogin:true
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let emailres = true;
    let mobileres = true;
    let passwordres = true;
    let confirmpassres = true;
    let usernameres = true;
    let nameregex = /^[a-zA-Z\s]{3,15}$/;
    let emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z.]+$/;
    let mobileregex = /^[6-9]\d{9}$/;
    let passregex = /^[A-Za-z0-9@\s]{3,15}$/;
    if (this.state.username === " ") {
      usernameres = true;
      this.setState({
        usernameErr: "Please Enter Your User Name",
      });
    } else {
      if (nameregex.test(this.state.name)) {
        usernameres = false;
        this.setState({
          usernameErr: " ",
        });
      } else {
        usernameres = true;
        this.setState({
          usernameErr: "User Name Must Be between 3-15 Charachters",
        });
      }
    }

    if (emailregex.test(this.state.email)) {
      emailres = false;
      this.setState({
        emailerr: " ",
      });
    } else {
      emailres = true;
      this.setState({
        emailerr: "Enter a valid email",
      });
    }
    if (mobileregex.test(this.state.mobile)) {
      mobileres = false;
      this.setState({
        mobileerr: " ",
      });
    } else {
      mobileres = true;
      this.setState({
        mobileerr: "Enter a valid mobile",
      });
    }
    if (passregex.test(this.state.password)) {
      passwordres = false;
      this.setState({
        passerr: " ",
      });
    } else {
      passwordres = true;
      this.setState({
        passerr: "Enter a valid password",
      });
    }
    if (this.state.confirmpassword === " ") {
      confirmpassres = true;
      this.setState({
        confirmpasserr: "Please Enter Your Password",
      });
    } else if (this.state.password === this.state.confirmpassword) {
      confirmpassres = false;
      this.setState({
        confirmpasserr: " ",
      });
    } else {
      confirmpassres = true;
      this.setState({
        confirmpasserr: "password are not same",
      });
    }

    if (
      (usernameres ||
        emailres ||
        mobileres ||
        passwordres ||
        confirmpassres) === false
    ) {
      this.setState({
        res: false,
      });
    }
  }

  componentDidUpdate() {
    pushData = {
      email: this.state.email,
      mobile: parseInt(this.state.mobile),
      password: this.state.password,
      name: this.state.username,
    };
    data.user.push(pushData);
    
  }

  render() {
    let res = this.state.res;
    let redirectLogin = this.state.redirectLogin;
    
    return (
      <div>
        <Header/>
        <form onSubmit={this.handleSubmit}>
          <div className="base-container">
          <div class="MainContainer center">
          <button onClick={this.handleLogin} class="button">
            Login
          </button>
          <button onClick={this.handleSignup} class="button">
            Signup
          </button>
            <div className="formheader">Signup</div>
            <div className="form">
              <div>
                <label htmlFor="email">User Name</label>
                <input
                  type="text"
                  name="username"
                  placeholder="UserName"
                  onChange={this.handleChange}
                />
                <div class="error">{this.state.usernameErr}</div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="xyz@domain.com"
                  onChange={this.handleChange}
                />
                <div class="error">{this.state.emailerr}</div>
              </div>
              <div>
                <label htmlFor="Mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="MobileNo"
                  onChange={this.handleChange}
                />
                <div class="error">{this.state.mobileerr}</div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <div class="error">{this.state.passerr}</div>
              </div>
              <div>
                <label htmlFor="confirmpassword">Password</label>
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="confirm password"
                  onChange={this.handleChange}
                />
                <div class="error">{this.state.confirmpasserr}</div>
              </div>
            </div>
            <div>
              <input type="submit" class="submitbtn"></input>
            </div>
            </div>
          </div>
        </form>
        {this.state.alert}
        {redirectLogin ?  <Redirect to="/login"></Redirect>:null }
        {res?null:<Redirect to="/login"></Redirect>}
      </div>
    );
  }
}


export default withRouter(SignUp)