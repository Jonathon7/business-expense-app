import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Admin.module.scss";
import nav from "../../images/nav.png";
import { connect } from "react-redux";
import { getEmployees } from "../../ducks/reducer";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      dropdown: false,
      loggedIn: false,
      username: "",
      amount: 3,
      newReports: [],
      num: ""
    };
  }

  componentDidMount() {
    axios
      .get("/auth/user")
      .then(response => {
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
    this.join();
  }

  join = () => {
    axios
      .get("/api/join")
      .then(response => {
        this.setState({
          num: response.data[0].count
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let dispEmployees;
    if (this.props.employees) {
      dispEmployees = this.props.employees.map(employee => {
        return (
          <div className={styles.employeeList} key={employee.employee_id}>
            <div className={styles.iconUsername}>
              <div className={styles.navUser}>
                <img src={nav} alt="" className={styles.profileIcon} />
              </div>
              <h2>{employee.username}</h2>
            </div>
            <div className={styles.numSubmitted}>
              <h3>Reports Submitted: {employee.reports}</h3>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <Navbar />
        <div className={styles.adminCont}>
          <div className={styles.adminHeader}>
            <div className={styles.adminInner}>
              <p className={styles.joinNum}>{this.state.num}</p>
              <h1>Employee List</h1>
              <div>{dispEmployees}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEmployees }
)(Admin);
