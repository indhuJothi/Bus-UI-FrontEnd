import React from "react";
import "./logreg.css";
import validateLogin from "../service/service";
import { getPassword } from "../service/service";
import { getMobile } from "../service/service";
import { getUsername } from "../service/service";
import { getUseremail } from "../service/service";
import { Redirect, withRouter } from "react-router-dom";
import { userContext } from "../../context/context";
import Header from "../header/header";


let userName, userEmail;
let result, password, mobile, name, email;
class Login extends React.Component {
  static contextType = userContext
  constructor(props) {
    super(props);
    this.state = {
      mobile: " ",
      password: " ",
      boolean: false,
      logform: true,
      search:false,
      res: false,
      mobileerr: "",
      passerr: "",
      username: " ",
      useremail: " "
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(e) {
    e.preventDefault()
    this.setState({
      res:true
    })
    
  }
  handleChange(event) {
    event.preventDefault()
    const mobile = event.target.name;
    const password = event.target.password;
    this.setState({
      [mobile]: event.target.value,
      [password]: event.target.value,
    });
  }

  submit(e) {
  
    e.preventDefault();

    result = validateLogin(this.state.mobile, this.state.password);
    name = getUsername(this.state.mobile);
    password = getPassword(this.state.mobile, this.state.password);
    email = getUseremail(this.state.mobile);

    if (result) {
      this.setState({
        search: true
      });
      console.log(result)
      
      localStorage.setItem("name", name);
    
    }
    localStorage.setItem("mobile", this.state.mobile);
    localStorage.setItem("email", email);
    sessionStorage.setItem("password",this.state.password)

    if (password != this.state.password) {
      this.setState({
        passerr: "Enter a valid password",
      });
    }
    mobile = getMobile(this.state.mobile, this.state.password);
    if (mobile != parseInt(this.state.mobile)) {
      this.setState({
        mobileerr: "Enter a valid mobile number",
      });
    }
  }
 


  render() {
    let res = this.state.res
    let search = this.state.search
    let getUser= this.props.getUser
    let user = this.props.isuserpass
    
    // userName = getUsername(this.state.mobile);
    // userEmail = getUseremail(this.state.mobile);
  
    //  console.log(userName)
     let userDetails ={
       name:this.state.username,
       email:this.state.email,
       mobile:this.state.mobile,
       password:this.state.password
     }


     
    return (
      <div>
        <Header/>
      {localStorage.getItem("name")?<Redirect to='/search'></Redirect> :<form 
        // onSubmit={this.submit}
        onSubmit={(e)=>{this.submit(e)}}
        >
          <div className="base-container">
          <div class="MainContainer center">
          <button onClick={(e)=>{this.handle(e)}} class="button">
            Login
          </button>
          <button 
          // onClick={this.handleSignup}
          onClick={(e)=>{this.handleSignup(e)}}
           class="button">
            Signup
          </button>
         
            <div className="formheader">Login</div>
            <div className="form">
              <div>
                <label htmlFor="Mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="MobileNo"
                  // onChange={this.handleChange}
                  onChange={(event)=>{this.handleChange(event)}}
                />
                <div class="error">{this.state.mobileerr}</div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  // onChange={this.handleChange}
                  onChange={(event)=>{this.handleChange(event)}}
                />
                <div class="error">{this.state.passerr}</div>
              </div>
            </div>
            <div>
              <input type="submit" class="submitbtn"></input>
            </div>
            </div>
          </div>
        </form>}
        {res ? <Redirect to="/register"></Redirect>: null}
        {search && <Redirect to="/search"/>}
        {search && user(this.state.password,name,email,this.state.mobile)}
      
      </div>
    );
  }
}

export default withRouter(Login)
