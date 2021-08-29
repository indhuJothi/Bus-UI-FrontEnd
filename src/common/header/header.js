import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import "./header.css";
import { userContext } from "../../context/context";

export default function Header(props) {
  const history = useHistory();
  function setshowProfile(boolean) {
    console.log(showProfile);
    if(boolean===false)
    {
      setprofile(false)
    }
    
  }

  const [login, setlogin] = useState('logout');
  const [profile, setprofile] = useState(false);

  let showProfile = false;

  return (
    <div>
      <div class="body">
        <div class="header">
          <span class="apptitle">Bus Booking App</span>
        </div>
        {localStorage.getItem("name") ? (
          <a class="logobut">
            <span class="username">{localStorage.name}</span>
            <span class="pro" onClick={(e) => setprofile(true)}>
              Profile
            </span>
            {profile ? history.push("/profile") : null}
            <button
              onClick={(e) => {
                localStorage.clear();
                history.push('/login')
              }}
              class="signuplogo"
            >
              <p>Logout</p>
            </button>
          </a>
        ) : null}
      </div>
    </div>
  );
}
