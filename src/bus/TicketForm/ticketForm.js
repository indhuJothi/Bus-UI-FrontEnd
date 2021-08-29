import React from "react";
import "./ticketForm.css";
import "../busPage/buslistTable.css";
import userhistory from "../../resources/userHistory.json";
import bushistory from "../../resources/busHistory.json";
import { userContext } from "../../context/context";
import Header from "../../common/header/header";
import Menu from "../../common/menu";
import { withRouter } from "react-router";
import Swal from "sweetalert2";

let userhistoryjson = userhistory;
let bushistoryjson = bushistory;
let userpushdetails, bushistorypushdetails;

let passenger = false,
  named,
  age,
  gender;
if (localStorage.getItem("passengerDetails")) {
  passenger = true;
  let values = JSON.parse(localStorage.getItem("passengerDetails"));
  named = values.name;
  age = values.age;
  gender = values.gender;
  console.log(named);
}
class TicketForm extends React.Component {
  static contextType = userContext;

  constructor(props) {
    super(props);
    {
      this.state = {
        name: passenger ? named : [],
        selectedOption: passenger ? gender : [],
        age: passenger ? age : [],
        isbool: false,
        value: [],
        error: "",
      };
    }
    this.booked = this.booked.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  handleChange(index, event) {
    let names = this.state.name.slice();
    names[index] = event.target.value;
    this.setState({ name: names });
    localStorage.setItem("passengerName", this.state.name);
    console.log(localStorage.getItem("passengerName"));
  }

  handleAge(index, event) {
    let ages = this.state.age.slice();
    ages[index] = event.target.value;
    this.setState({ age: ages });
  }
  onValueChange(index, event) {
    let genders = this.state.selectedOption.slice();
    genders[index] = event.target.value;
    this.setState({
      selectedOption: genders,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  booked(event, index) {
    event.preventDefault();
    if (this.state.name == "") {
      Swal.fire({
        icon: "error",
        title: "!",
        text: "please enter your name",
      });
    } else {
      let passengerDetails = {
        name: this.state.name,
        age: this.state.age,
        gender: this.state.selectedOption,
      };

      localStorage.setItem(
        "passengerDetails",
        JSON.stringify(passengerDetails)
      );

      this.setState({
        isbool: true,
      });
      const PassengerName = this.state.name;
      localStorage.setItem("PassengerName", JSON.stringify(PassengerName));
      userhistoryjson.buspassanger.push(userpushdetails);
      // bushistoryjson.userbusbooking.push(bushistorypushdetails);
      // this.props.history.push("/ticket");
     
 
    }
  }
  render() {
    let busdetails = JSON.parse(localStorage.getItem("busdetails"));
    let searchdetails = JSON.parse(localStorage.getItem("searchdetails"));
    let userMobile = localStorage.getItem("mobile");
    let seatcount = localStorage.getItem("seatcount");
    let context = this.context
    console.log(context)
    let fare = busdetails.fare;
    let amnt = seatcount * fare;
    let date = searchdetails.date;
    let value = this.state.value;
    let userId = searchdetails.userid;
    let id = searchdetails.id;
    let busno = busdetails.busno;
    let seatss = JSON.parse(localStorage.getItem("seats"));

    userpushdetails = {
      userbusbookingid: id,
      name: this.state.name,
      mobile: userMobile,
    };
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

    return (
      <div>
        <Header />
        <Menu />
        <div class="finalticket">
          <button class="goback" onClick={this.goBack}>
            GO BACK
          </button>
          <form class="passengerform" onSubmit={this.booked}>
            {seatss.map((element, index) => {
              return (
                <span>
                  <div class="form-input" key={index}>
                    <div>
                      <span class="passengerNo">Passenger:{index + 1}</span>
                      <span class="seatno">SeatNo:{element}</span>
                    </div>
                    <br />
                    <label for="name" class="pInfo">
                      {" "}
                      Passenger Name:{" "}
                    </label>

                    <input
                      class="inputname"
                      type="text"
                      name="name"
                      value={this.state.name[index]}
                      onChange={this.handleChange.bind(this, index)}
                    />
                    <span>{this.state.error}</span>

                    <div className="radio">
                      <label class="pInfo">
                        {" "}
                        Gender:
                        <br></br>
                        <label class="pInfo">
                          <input
                            class="radio"
                            type="radio"
                            value="Male"
                            onChange={this.onValueChange.bind(this, index)}
                          />
                          Male
                        </label>
                        <label class="pInfo">
                          <input
                            class="radio"
                            type="radio"
                            value="Female"
                            onChange={this.onValueChange.bind(this, index)}
                          />
                          Female
                        </label>
                      </label>
                    </div>

                    <label for="age" class="pInfo">
                      Age
                      <input
                        type="text"
                        name="age"
                        value={this.state.age[index]}
                        onChange={this.handleAge.bind(this, index)}
                        class="inputname"
                      />
                    </label>
                  </div>
                </span>
              );
            })}
            <span class="amount">TotalFare:{amnt}</span>
            <input type="submit" class="submit" />
          </form>
        </div>
        {this.state.isbool ?this.props.history.push('/ticket') : null}
        {/* {this.state.isbool?window.location.reload(false):null} */}
      </div>
    );
  }
}
export default withRouter(TicketForm);
