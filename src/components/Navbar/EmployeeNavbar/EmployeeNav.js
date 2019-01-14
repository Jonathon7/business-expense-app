import React, { Component } from "react";
import styles from "./employeeNav.module.scss";

export default class EmployeeNav extends Component {
  constructor() {
    super();

    this.state = {
      showSideMenu: false
    };
  }

  toggleMenu = () => {
    this.setState({
      showSideMenu: !this.state.showSideMenu
    });
  };

  render() {
    return (
      <div>
        <div className={styles.navCont}>
          <div className={styles.menuIcon} onClick={this.toggleMenu}>
            &#9776;
          </div>
          <div className={styles.navUser}>
            <h2>Username</h2>
          </div>
        </div>
        {this.state.showSideMenu ? (
          <div className={styles.sideMenu} />
        ) : (
          <div className={styles.hiddenSideMenu} />
        )}
      </div>
    );
  }
}
