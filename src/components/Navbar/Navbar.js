import React, { Component } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
import nav from "../../images/nav.png";
import report from "../../images/report.png";
import axios from "axios";

export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      menu: false,
      showMenuText: false,
      username: "",
      newReports: []
    };
  }

  componentDidMount() {
    this.getAllReports();
    this.getInitialUserInfo();
  }

  getInitialUserInfo = () => {
    axios.get("/api/user").then(response => {
      this.setState({
        username: response.data.username
      });
    });
  };

  getAllReports = () => {
    axios.get("/api/newreports").then(response => {
      this.setState({
        newReports: response.data
      });
    });
  };

  handleClick = () => {
    this.setState({
      menu: !this.state.menu
    });

    setTimeout(() => {
      this.setState({
        showMenuText: !this.state.showMenuText
      });
    }, 300);
  };

  logout = () => {
    axios.get("/auth/logout");
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div className={styles.navCont}>
          <div className={styles.icon} onClick={this.handleClick}>
            &#9776;
            <div className={styles.reportIconCont}>
              <p className={styles.newReportsNum}>
                {this.state.newReports.length}
              </p>
              <img src={report} alt="" className={styles.reportIcon} />
            </div>
          </div>
          <div className={styles.admin}>
            <h2>{this.state.username}</h2>
            <img src={nav} alt="" className={styles.profileIcon} />
          </div>
        </div>
        {this.state.menu ? (
          <div className={styles.menu}>
            <div
              className={
                this.state.showMenuText ? styles.menuText : styles.hideMenuText
              }
            >
              <Link to="/reports" className={styles.link}>
                Reports
              </Link>
              <Link to="/admin" className={styles.link}>
                Approved
              </Link>
              <button onClick={this.logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className={styles.hidden} />
        )}
      </div>
    );
  }
}
