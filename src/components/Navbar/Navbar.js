import React, { Component } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      menu: false
    };
  }

  handleClick = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  render() {
    return (
      <div>
        <div className={styles.navCont}>
          <div className={styles.icon} onClick={this.handleClick}>
            &#9776;
          </div>
          <div className={styles.admin}>
            <h2>Username</h2>
            <img src="" alt="" />
          </div>
        </div>
        {this.state.menu ? (
          <div className={styles.menu}>
            <Link to="/admin" className={styles.link}>
              Manage Employees
            </Link>
            <Link to="/admin" className={styles.link}>
              Reports
            </Link>
            <Link to="/admin" className={styles.link}>
              Past Reports
            </Link>
          </div>
        ) : (
          <div className={styles.hidden} />
        )}
      </div>
    );
  }
}
