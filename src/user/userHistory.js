import React from "react";
import Table from "../common/Table/newtable";
import "../common/Table/newtable.css";
import "./userHistory.css";
import { getBushistory } from "../common/service/service";
import Header from "../common/header/header";
import { withRouter } from "react-router";
import Menu from "../common/menu";

let columns = [
  {
    heading: "UserId",
    property: "id",
  },
  {
    heading: "Mobile",
    property: "mobile",
  },
  {
    heading: "BusNo",
    property: "busno",
  },
  {
    heading: "Bus Name",
    property: "busname",
  },
  {
    heading: "TotalFare",
    property: "totalfare",
  },
  {
    heading: "Numberofseats",
    property: "numberofseats",
  },
  {
    heading: "Date",
    property: "date",
  },
  {
    heading: "Source",
    property: "from",
  },
  {
    heading: "Destination",
    property: "to",
  },
];

let data = getBushistory();
console.log(data);

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        go: false,
      };
    }
    this.gooBack = this.gooBack.bind(this);
  }
  gotoSearch() {
    this.setState({
      go: true,
    });
  }
  gooBack() {
    this.props.history.goBack();
  }

  render() {
    let go = this.state.go;
    let datalist = [...data].reverse();
    let gooback = this.gooBack;
    return (
      <>
        <Header />
        <Table columns={columns} data={datalist} />
        <button class="historyback" onClick={gooback}>
          Back
        </button>
        <button class="searchbtn" onClick={() => this.gotoSearch()}>
          Search
        </button>
        <Menu />

        {go ? this.props.history.push("/search") : null}
        {go ? localStorage.removeItem("busdetails") : null}
        {go ? localStorage.removeItem("searchdetails") : null}
        {go ? localStorage.removeItem("passengerDetails") : null}
        {go ? localStorage.removeItem("seats") : null}
        {go ? localStorage.removeItem("seatcount") : null}
      </>
    );
  }
}

export default HistoryTable;
