import React, { Component } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
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
    axios.get("/api/user").then(response => {
      this.setState({
        username: response.data.username
      });
    });
  }

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

  render() {
    return (
      <div>
        <div className={styles.navCont}>
          <div className={styles.icon} onClick={this.handleClick}>
            &#9776;
          </div>

          <div className={styles.admin}>
            <h2>{this.state.username}</h2>
          </div>
        </div>
        {this.state.menu ? (
          <div className={styles.menu}>
            <div
              className={
                this.state.showMenuText ? styles.menuText : styles.hideMenuText
              }
            >
              <Link to="/admin" className={styles.link}>
                Manage Employees
              </Link>
              <Link to="/admin" className={styles.link}>
                Reports
              </Link>
              <Link to="/admin" className={styles.link}>
                Approved
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
