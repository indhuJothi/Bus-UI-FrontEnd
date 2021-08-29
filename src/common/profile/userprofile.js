import React from "react";
import { userContext } from "../../context/context";
import data from "../../resources/user.json";
import logo from "../../resources/signlogo.jpg";
import "./userprofile.css";
import Menu from "../menu";
import Header from "../header/header";
import { withRouter } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";

let datsJson = data;
let contextValue;
let userName, userMobile, userPass, userEmail;
let userDetails;
let changedData;



class Profile extends React.Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    {
      this.state = {
        updatename: "",
        isupdate: true,
        name: "",
        email: "",
        pass: "",
        mobile: "",
        changePassword: false,
        isupdatedata: true,
        isinputshow: false,
        dataChanged: true,
        alert: null,
      };
    }
    this.getForm = this.getForm.bind(this);
    this.getName = this.getName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.close = this.close.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  getName(e) {
    const name = e.target.name;
    const email = e.target.email;
    const mobile = e.target.mobile;
    const pass = e.target.pass;
    this.setState({
      [name]: e.target.value,
      [email]: e.target.value,
      [mobile]: e.target.value,
      [pass]: e.target.pass,
    });
  }
  updateUser(e) {
    this.setState({
      isupdatedata: false,
      isinputshow: false,
      changePassword: false,
    });
     
  }

  changePassword() {
    this.setState({
      changePassword: true,
      isupdatedata: false,
      isinputshow: false,
    });
   
  }
  getForm() {
    this.setState({
      isupdate: false,
      isinputshow: true,
    });
  }
  close() {
    const getAlert = () => (
      <SweetAlert success title="!" onConfirm={() => this.hideAlert()}>
        As you changed your password, you are redirected to login page for
        security purpose
        <p>You have to login again</p>
      </SweetAlert>
    );

    if (this.state.pass !== "") {
      this.setState({
        dataChanged: false,
        alert: getAlert(),
      });
        
    }
     else {
     
    //  window.location.reload(true)
      
      this.props.history.goBack()
    
    }
  }

  hideAlert() {
      localStorage.removeItem("name")
      this.props.history.push('/')
    
    this.setState({
      alert: null,
    });
  }
  render() {
    contextValue = this.context;
    userName = localStorage.getItem("name");
    userEmail = localStorage.getItem("email");
    userMobile = localStorage.getItem("mobile");
    userPass = contextValue.password;
    let isinputShow = this.state.isinputshow;
    let isupdateData = this.state.isupdatedata;
    let isUpdate = this.state.isupdate;
    let changePassword = this.state.changePassword;
    userDetails = {
      username: contextValue.username,
      password: contextValue.password,
      email: contextValue.email,
      mobile: contextValue.mobile,
    };
   
    return (
      <div>
        <div>
          <Menu />
          <Header />
          <div class="profile">
            <>
              <div class="profilepic">
                <img class="profilelogo" src={logo}></img>
              </div>
              <button onClick={this.getForm}>Edit</button>
              <button onClick={this.close}>Close</button>
              <button onClick={this.changePassword}>ChangePassword</button>
              <div class="profiledetails">
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Name: <span class="info1">{userName}</span>
                    </span>
                  </div>
                ) : this.state.name === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Name:<span class="info1">{userName}</span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Name:<span class="info1">{this.state.name}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Email:<span class="info1">{userEmail}</span>
                    </span>
                  </div>
                ) : this.state.email === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Email:<span class="info1">{userEmail}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Email:<span class="info1">{this.state.email}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Mobile:<span class="info1">{userMobile}</span>
                    </span>
                  </div>
                ) : this.state.mobile === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Mobile:<span class="info1">{userMobile}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Mobile:<span class="info1">{this.state.mobile}</span>
                    </span>
                  </div>
                )}
                {changePassword ? (
                  this.state.pass === "" ? (
                    <div class="profileinfo">
                      <span class="info">
                        password:
                        <span class="info1">{userPass}</span>
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span class="info">
                        Password: <span class="info1">{this.state.pass}</span>
                      </span>
                    </div>
                  )
                ) : null}
              </div>
              {isupdateData
                ? null
                : datsJson.user.filter((element) => {
                    if (element.name === userName) {
                      if (
                        this.state.name !== "" &&
                        this.state.name !== userName
                      ) {
                        element.name = this.state.name;
                        localStorage.name = this.state.name;
                        contextValue.username = this.state.name;
                      }
                      if (
                        this.state.email !== "" &&
                        this.state.email !== userEmail
                      ) {
                        element.email = this.state.email;
                        localStorage.email = this.state.email;
                        contextValue.email = this.state.email;
                      }
                      if (
                        this.state.mobile !== userMobile &&
                        this.state.mobile !== ""
                      ) {
                        element.mobile = this.state.mobile;
                        localStorage.mobile = this.state.mobile;
                        contextValue.mobile = this.state.mobile;
                      }
                      if (
                        this.state.pass !== userPass &&
                        this.state.pass !== ""
                      ) {
                        element.password = this.state.pass;
                        contextValue.password=this.state.pass;
                      }
                      changedData = element;
                    }
                    console.log(changedData);
                  })}

              <div class="updatedetails">
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={userName}
                    type="text"
                    placeholder="Name to Upadte"
                    name="name"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={userEmail}
                    type="text"
                    name="email"
                    placeholder="Email to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={userMobile}
                    type="text"
                    name="mobile"
                    placeholder="Mobile No to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {changePassword ? (
                  <input
                    class="inputdetail"
                    value={this.state.password}
                    type="password"
                    name="pass"
                    placeholder="Password to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <button class="inputbutton" onClick={this.updateUser}>
                    Save
                  </button>
                ) : null}
                {changePassword ? (
                  <button class="inputbutton" onClick={this.updateUser}>
                    Save
                  </button>
                ) : null}
              </div>
            </>
          </div>
        </div>

        {this.state.alert}
      </div>
    );
  }
}

export default withRouter(Profile);
