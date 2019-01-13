import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import { connect } from "react-redux";
// import { getEmployees } from "../../ducks/reducer";
import Chart from "../../components/Charts/Chart";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      employees: []
    };
  }
  componentDidMount() {
    // this.props.getEmployees();
    axios
      .get("/api/employees")
      .then(response => {
        this.setState({
          employees: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Chart />
      </div>
    );
  }
}

export default Admin;

// const mapStateToProps = state => state;

// export default connect(
//   mapStateToProps,
//   { getEmployees }
// )(Admin);
