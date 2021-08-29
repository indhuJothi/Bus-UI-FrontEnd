import React from "react";
import bushistory from "../resources/busHistory.json";
import Menu from "./menu";
import "./ticket.css";
import { seatCount } from "./service/service";
import { withRouter } from "react-router-dom";
import Header from "./header/header";
import { userContext } from "../context/context";


let userpushdetails, bushistorypushdetails;
let bushistoryjson = bushistory;


class Ticket extends React.Component {
  static contextType = userContext
  constructor() {
    super();
    {
      this.state = { isbool: true };
    }
    this.submit = this.submit.bind(this);
    this.goBack=this.goBack.bind(this)
  }
  submit() {
    let busdetails = JSON.parse(localStorage.getItem("busdetails"));
    let seatcount = localStorage.getItem("seatcount");
    let busno = busdetails.busno;
    let res = seatCount(busno, seatcount);
    busdetails.NoOfSeats = busdetails.NoOfSeats - seatcount;
    bushistoryjson.userbusbooking.push(bushistorypushdetails);
    this.setState({
      isbool: false,
    });
  }
  goBack() {
    this.props.history.goBack();
  }

  render() {
    let context = this.context
    let busdetails = JSON.parse(localStorage.getItem("busdetails"));
    let searchdetails = JSON.parse(localStorage.getItem("searchdetails"));
    let userMobile = localStorage.getItem("mobile");
    let seatcount = localStorage.getItem("seatcount");
    let from = busdetails.from;
    let to = busdetails.to;
    let busno = busdetails.busno;
    let busname = busdetails.busname;
    let passengerName = JSON.parse(localStorage.getItem("PassengerName"));
    let fare = busdetails.fare;
    let amnt = seatcount * fare;
    let date = searchdetails.date;
    let userId = searchdetails.userid;
    let id = searchdetails.id;
    let selectSeats = localStorage.getItem("seats");
    let goBack = this.goBack
    bushistorypushdetails = {
      id: id,
      mobile: localStorage.getItem("mobile"),
      userId: userId,
      busno: busno,
      busname: busdetails.busname,
      totalfare: amnt,
      numberofseats: seatcount,
      date: date,
      from: searchdetails.from,
      to: searchdetails.to,
    };
    console.log(context.mobile)
    let passenger
    return (
      <div>
        <Header />
        <Menu />

        <div class="ticket">
          <button class="goBack" onClick={this.goBack}>
            BACK
          </button>
          <h1>Booking Details</h1>
          <label class="info">
            Userbookingid:<span class="info1"> {userId}</span>
          </label>

          <br></br>
          <label class="info">
            Name:
            <span class="info1">
              {
                (passenger = passengerName.map((elem, i) => {
                  return i + 1 + "." + elem + " ";
                }))
              }
            </span>
          </label>
          <br></br>
          <label class="info">
            Mobile:<span class="info1">{userMobile}</span>
          </label>
          <br></br>
          <label class="info">
            Seatno:<span class="info1">{selectSeats}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Date:<span class="info1">{date}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Fare:<span class="info1">{amnt}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            From:<span class="info1">{from}</span>
          </label>
          <br></br>
          <label class="info">
            To:<span class="info1">{to}</span>
          </label>
          <br></br>
          <label class="info">
            Bus No:<span class="info1"> {busno}</span>
          </label>
          <br></br>
          <label class="info">
            Bus name:<span class="info1"> {busname}</span>
          </label>
          <br></br>
          <button onClick={this.submit}> proceed to pay</button>
        </div>
        {this.state.isbool ? null : this.props.history.push("/user-history")}
      </div>
    );
  }
}

export default withRouter(Ticket);
