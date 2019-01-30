import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar";
import receipt from "../../../images/receipt.png";
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
      username: "",
      reportId: "",
      receipt: "",
      showReceipt: false,
      textarea: false,
      denialComments: ""
    };
  }

  componentDidMount() {
    axios
      .get("/auth/user")
      .then(response => {
        if (!response.data.user) {
          this.props.history.push("/");
        } else if (response.data.user) {
          this.props.history.push("/requests");
        }
      })
      .catch(err => {
        console.log(err);
      });

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
          username: response.data[0].username,
          receipt: response.data[0].receipts,
          reportId: id
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
      showOverlay: false,
      showReceipt: false
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
    let { reportId, amount, username } = this.state;

    //sets status from new to approved on report
    axios.put("/api/report/approve/", { reportId, username }).catch(err => {
      console.log(err);
    });

    //adds approved amount to employee's received amount column in db
    axios.put("/api/report/amount", { username, amount }).catch(err => {
      console.log(err);
    });

    this.setState({
      showForm: false,
      showFormText: false,
      showOverlay: false
    });
  };

  //toggles text area for denial comments
  denialComments = () => {
    this.setState({
      textarea: true
    });
  };

  denyReport = () => {
    let { reportId, denialComments } = this.state;
    axios.put("/api/report/deny/", { reportId, denialComments }).catch(err => {
      console.log(err);
    });

    this.setState({
      showForm: false,
      showFormText: false,
      showOverlay: false,
      textarea: false
    });
  };

  render() {
    let dispReports = this.state.newReports.map(report => {
      return (
        <div className={styles.reportList} key={report.report_id}>
          <div className={styles.titleUser}>
            <div>
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
                  {!this.state.textarea ? (
                    <textarea
                      name=""
                      id=""
                      cols="45"
                      rows="10"
                      value={this.state.comments}
                      readOnly
                    />
                  ) : (
                    <textarea
                      name=""
                      id=""
                      cols="45"
                      rows="10"
                      value={this.state.denialComments}
                      onChange={e =>
                        this.setState({ denialComments: e.target.value })
                      }
                    />
                  )}
                </div>
                {!this.state.textarea ? (
                  <div className={styles.approveDeny}>
                    {" "}
                    <button
                      className={styles.approve}
                      onClick={this.approveReport}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.deny}
                      onClick={this.denialComments}
                    >
                      Deny
                    </button>{" "}
                    {this.state.receipt ? (
                      <img
                        src={receipt}
                        alt=""
                        onClick={() =>
                          this.setState({
                            showReceipt: !this.state.showReceipt
                          })
                        }
                        className={styles.receiptImg}
                      />
                    ) : null}
                    {this.state.showReceipt ? (
                      <div className={styles.receipt}>
                        <img src={this.state.receipt} alt="" height="470px" />
                        <div
                          onClick={() =>
                            this.setState({
                              showReceipt: !this.state.showReceipt
                            })
                          }
                          className={styles.hideImgX}
                        >
                          X
                        </div>
                      </div>
                    ) : (
                      <div className={styles.hideReceipt}> </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.submitButtonCont}>
                    <button
                      className={styles.submitButton}
                      onClick={this.denyReport}
                    >
                      Submit
                    </button>
                  </div>
                )}{" "}
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
