import React, { Component } from "react";
import styles from "./employeeNav.module.scss";
import nav from "../../../images/nav.png";
import ReportList from "./ReportList";
import { connect } from "react-redux";
import axios from "axios";

class EmployeeNav extends Component {
  constructor() {
    super();

    this.state = {
      showSideMenu: false,
      showMenuText: false,
      dropdown: false,
      showEdit: false,
      userInfo: [],
      username: "",
      name: "",
      email: "",
      photo: "",
      requested: "",
      received: ""
    };
  }

  componentDidMount() {
    axios.get("/api/user").then(response => {
      this.setState({
        username: response.data.username,
        name: response.data.name,
        photo: response.data.picture,
        requested: response.data.requested,
        received: response.data.received
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

  saveChanges = () => {
    axios
      .post("/api/user/info", {
        name: this.state.name,
        email: this.state.email
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      name: "",
      email: "",
      showEdit: false
    });

    this.submitFile();
  };

  submitFile = () => {
    const formData = new FormData();
    formData.append("file", this.state.photo[0]);
    axios
      .post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
        axios.post("/api/photo", { photo: response.data.Location });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  openEdit = () => {
    this.setState({
      showEdit: true
    });
  };

  closeEdit = () => {
    this.setState({
      showEdit: false
    });
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
            <img
              src={this.state.photo ? this.state.photo : nav}
              alt=""
              className={styles.profileIcon}
              onClick={this.handleClick}
            />
          </div>
          {this.state.dropdown ? (
            <div
              className={styles.profileDropdown}
              onMouseLeave={() => this.setState({ dropdown: false })}
            >
              <div className={styles.dropdownContent}>
                <p>{this.state.username}</p>
                <p className={styles.editButton} onClick={this.openEdit}>
                  Edit Profile
                </p>
                <button onClick={this.logout}>Sign Out</button>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.showSideMenu ? (
          <div className={styles.sideMenu}>
            {this.state.showMenuText ? (
              <div className={styles.showMenuTextCont}>
                <div className={styles.userRequests}>
                  <h3>Requested: ${this.state.requested}</h3>
                  <h3>Recieved: ${this.state.received}</h3>
                </div>
                <div className={styles.newReports}>
                  {" "}
                  <h3>Submitted Reports</h3>
                </div>
                <ReportList />
              </div>
            ) : (
              <div className={styles.hideMenuText} />
            )}
          </div>
        ) : (
          <div className={styles.hiddenSideMenu} />
        )}
        {this.state.showEdit ? (
          <div className={styles.profileEdit}>
            <div className={styles.closeEdit} onClick={this.closeEdit}>
              X
            </div>
            <h2>Profile</h2>
            <div>
              <h3>Photo</h3>
              <input
                type="file"
                onChange={e => this.setState({ photo: e.target.files })}
              />
            </div>
            <div>
              <h3>Name</h3>
              <input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <h3>Email</h3>
              <input
                type="text"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <button className={styles.saveChanges} onClick={this.saveChanges}>
              Save Changes
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(EmployeeNav);
