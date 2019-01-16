import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Admin.module.scss";
import { connect } from "react-redux";
import { getEmployees } from "../../ducks/reducer";
import Chart from "../../components/Charts/Chart";
import Employees from "../../components/Employees/Employees";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      dropdown: 1,
      loggedIn: false
    };
  }
  componentDidMount() {
    axios
      .get("/auth/user")
      .then(response => {
        console.log(response.data);
        if (!response.data.user) {
          this.props.history.push("/");
        } else if (response.data.user) {
          this.props.history.push("/admin");
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.props.getEmployees();
  }

  toggleDropdown = () => {
    this.setState({
      dropdown: this.state.dropdown + 4
    });
  };

  render() {
    let dispEmployees = this.props.employees.map(employee => {
      return (
        <Employees
          key={employee.employee_id}
          name={employee.name}
          amountRequested={employee.amount_requested}
          amountRecieved={employee.amount_recieved}
        />
      );
    });

    let dropdown = dispEmployees.slice(0, this.state.dropdown);

    return (
      <div>
        <Navbar />
        <div className={styles.adminCont}>
          <div className={styles.chartCont}>
            <Chart />
          </div>
          {dropdown}
          <div className={styles.dropdown} onClick={this.toggleDropdown}>
            &#9660;
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  };
};

export default connect(
  mapStateToProps,
  { getEmployees }
)(Admin);
