import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Admin.module.scss";
import { connect } from "react-redux";
import { getEmployees } from "../../ducks/reducer";
import Chart from "../../components/Charts/Chart";
import report from "../../images/report.png";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      dropdown: false,
      loggedIn: false,
      username: "",
      amount: 3,
      newReports: []
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
    this.getAllReports();
  }

  getAllReports = () => {
    axios.get("/api/newreports").then(response => {
      this.setState({
        newReports: response.data
      });
    });
  };

  addMore = () => {
    this.setState({
      amount: this.state.amount + 3
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className={styles.adminCont}>
          <div className={styles.chartCont}>
            <Chart />
          </div>
        </div>
        <div className={styles.footerCont}>
          <div className={styles.reportIconCont}>
            <p className={styles.newReportsNum}>
              {this.state.newReports.length}
            </p>
            <img src={report} alt="" className={styles.reportIcon} />
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
