import React, { Component } from "react";
import styles from "./employeeNav.module.scss";
import profile from "../../../images/profile.png";
import ReportList from "./ReportList";
import { connect } from "react-redux";
import axios from "axios";

class EmployeeNav extends Component {
  constructor() {
    super();

    this.state = {
      showSideMenu: false,
      showMenuText: false,
      userInfo: [],
      username: "",
      name: "",
      picture: ""
    };
  }

  componentDidMount() {
    axios.get("/api/user").then(response => {
      this.setState({
        username: response.data.username,
        name: response.data.name,
        picture: response.data.picture
      });
    });
  }

  toggleMenu = () => {
    this.setState({
      showSideMenu: !this.state.showSideMenu
    });

    setTimeout(() => {
      this.setState({
        showMenuText: !this.state.showMenuText
      });
    }, 500);
  };

  logout = () => {
    axios.get("/auth/logout");

    window.location.reload();
  };

  render() {
    return (
      <div>
        <div className={styles.navCont}>
          <div className={styles.menuIcon} onClick={this.toggleMenu}>
            &#9776;
          </div>
          <div className={styles.navUser}>
            <h2>{this.state.username}</h2>
          </div>
        </div>
        {this.state.showSideMenu ? (
          <div className={styles.sideMenu}>
            {this.state.showMenuText ? (
              <div className={styles.showMenuTextCont}>
                <div className={styles.profileCont}>
                  <h1>{this.state.name}</h1>
                  {this.state.picture ? (
                    <img src={this.state.picture} alt="" />
                  ) : (
                    <img src={profile} alt="" />
                  )}
                </div>
                <div className={styles.newReports}>
                  {" "}
                  <h3>New Reports</h3>
                </div>
                <ReportList />
                <div className={styles.approvedReports}>
                  <h3>Approved Reports</h3>
                </div>
                <button onClick={this.logout}>Logout</button>
              </div>
            ) : (
              <div className={styles.hideMenuText} />
            )}
          </div>
        ) : (
          <div className={styles.hiddenSideMenu} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(EmployeeNav);
