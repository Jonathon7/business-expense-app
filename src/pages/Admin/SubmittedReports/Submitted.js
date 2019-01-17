import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./submitted.module.scss";

export default class Submitted extends Component {
  constructor() {
    super();

    this.state = {
      usernameAdmin: "",
      name: "",
      newReports: [],
      showForm: false,
      showFormText: false,
      showOverlay: false,
      amount: "",
      comments: "",
      date: "",
      expenseType: "",
      isPersonal: "",
      status: "",
      title: "",
      username: ""
    };
  }

  componentDidMount() {
    this.getInitialUserInfo();
    this.getAllReports();
  }

  getInitialUserInfo() {
    axios.get("/api/user").then(response => {
      this.setState({
        usernameAdmin: response.data.username,
        name: response.data.name
      });
    });
  }

  showForm = id => {
    this.setState({
      showForm: true
    });

    setTimeout(() => {
      this.setState({
        showFormText: true
      });
    }, 700);

    setTimeout(() => {
      this.setState({
        showOverlay: true
      });
    }, 350);

    axios
      .get(`/api/user/report/${id}`)
      .then(response => {
        this.setState({
          amount: response.data[0].amount,
          comments: response.data[0].comments,
          date: response.data[0].date,
          expenseType: response.data[0].expense_type,
          isPersonal: response.data[0].ispersonal,
          status: response.data[0].status,
          title: response.data[0].title,
          username: response.data[0].username
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  hideForm = () => {
    this.setState({
      showForm: false,
      showFormText: false,
      showOverlay: false
    });
  };

  getAllReports = () => {
    axios.get("/api/newreports").then(response => {
      this.setState({
        newReports: response.data
      });
    });
  };

  approveReport = () => {
    axios
      .put("/api/report")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let dispReports = this.state.newReports.map(report => {
      return (
        <div className={styles.reportList} key={report.report_id}>
          <div className={styles.titleUser}>
            <div>
              {" "}
              <h3>{report.title}</h3>
            </div>
            <div>
              <h4>{report.username}</h4>
            </div>
          </div>
          <div className={styles.button}>
            <button
              className={styles.viewButton}
              onClick={() => this.showForm(report.report_id)}
            >
              View
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        {this.state.showOverlay ? (
          <div className={styles.overlay} onClick={this.hideForm} />
        ) : null}
        <Navbar />
        {this.state.showForm ? (
          <div className={styles.formCont}>
            {this.state.showFormText ? (
              <div className={styles.formInnerCont}>
                <div className={styles.title}>
                  <h1>{this.state.title}</h1>
                </div>
                <div className={styles.header}>
                  <h2>Expense Report</h2>
                </div>
                <div className={styles.expenseType}>
                  <h3>Expense Type:</h3>
                  {this.state.expenseType}
                </div>
                <div className={styles.amount}>
                  <h3>Report Total: </h3>${this.state.amount}
                </div>
                <div className={styles.comments}>
                  <textarea
                    name=""
                    id=""
                    cols="50"
                    rows="10"
                    value={this.state.comments}
                    readOnly
                  />
                </div>
                <div className={styles.approveDeny}>
                  <button
                    className={styles.approve}
                    onClick={this.approveReport}
                  >
                    Approve
                  </button>
                  <button className={styles.deny}>Deny</button>
                </div>{" "}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        ) : (
          <div className={styles.hiddenForm}> </div>
        )}
        <div className={styles.reportListCont}>{dispReports}</div>
      </div>
    );
  }
}

// <div className={styles.dateStatus}>
// <h3>{report.date}</h3>
// <h3>{report.status}</h3>
// </div>
// <div className={styles.usernameName}>
// <h3>{report.username}</h3>
// <div className={styles.viewedBy}>
//   <h3>Approver:</h3>
//   <h4>H</h4>
// </div>
// </div>
// <div className={styles.typeAmount}>
// <h3>{report.expense_type}</h3>
// <h3>${report.amount}</h3>
// </div>
