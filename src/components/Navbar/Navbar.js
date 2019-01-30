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
      dropdown: false,
      showEdit: false,
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
            <div className={styles.menuIcon}>&#9776;</div>
            <div className={styles.reportIconCont}>
              <p className={styles.newReportsNum}>
                {this.state.newReports.length}
              </p>
              <img src={report} alt="" className={styles.reportIcon} />
            </div>
          </div>
          <div className={styles.admin}>
            <h2>{this.state.username}</h2>
            <img
              src={nav}
              alt=""
              className={styles.profileIcon}
              onClick={e => this.setState({ dropdown: !this.state.dropdown })}
            />
          </div>
        </div>
        {this.state.dropdown ? (
          <div
            className={styles.profileDropdown}
            onMouseLeave={() => this.setState({ dropdown: false })}
          >
            <div className={styles.dropdownContent}>
              <p>{this.state.username}</p>
              <p
                className={styles.editProfileButton}
                onClick={() => this.setState({ showEdit: true })}
              >
                Edit Profile
              </p>
              <button onClick={this.logout}>Sign Out</button>
            </div>
          </div>
        ) : null}
        {this.state.showEdit ? (
          <div className={styles.profileEdit}>
            <div
              className={styles.closeEdit}
              onClick={() => this.setState({ showEdit: false })}
            >
              X
            </div>
            <h2>Profile</h2>
            <div>
              <h3>Photo</h3>
              <p>Add a photo</p>
            </div>
            <div>
              <h3>Name</h3>
              <input type="text" />
            </div>
            <div>
              <h3>Email</h3>
              <input type="text" />
            </div>
          </div>
        ) : null}
        {this.state.menu ? (
          <div className={styles.menu}>
            <div
              className={
                this.state.showMenuText ? styles.menuText : styles.hideMenuText
              }
            >
              <Link to="/admin" className={styles.link}>
                Home
              </Link>
              <Link to="/requests" className={styles.link}>
                Approval Requests
              </Link>
              <Link to="/reports" className={styles.link}>
                Reports
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.hidden} />
        )}
      </div>
    );
  }
}
