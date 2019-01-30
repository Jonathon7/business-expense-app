import React, { Component } from "react";
import axios from "axios";
import EmployeeNav from "../../components/Navbar/EmployeeNavbar/EmployeeNav";
import styles from "./employee.module.scss";
import Preview from "./ReportsForm/Preview";

export default class Employee extends Component {
  constructor() {
    super();

    this.state = {
      entryAmount: 0,
      title: "",
      selectedExpenseType: "",
      inputAmount: "",
      date: "",
      comments: "",
      ispersonal: false,
      reports: [],
      username: "",
      reportId: 0,
      file: ""
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.userAuth();
    this.getInitialUserInfo();
  }

  componentWillUnmount() {
    this.userAuth();
    this.getInitialUserInfo();
  }

  userAuth = () => {
    axios
      .get("/auth/user")
      .then(response => {
        if (!response.data.user) {
          this.props.history.push("/");
        } else if (response.data.user) {
          this.props.history.push("/employee");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getInitialUserInfo = () => {
    axios.get("/api/user").then(response => {
      this.setState({
        username: response.data.username
      });
    });
  };

  submitFile = title => {
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        axios.post("/api/image", { image: response.data.Location, title });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  saveFormData = () => {
    let inputData = {
      title: this.state.title + " " + this.state.entryAmount,
      date: this.state.date,
      expense_type: this.state.selectedExpenseType,
      amount: this.state.inputAmount,
      comments: this.state.comments,
      isPersonal: this.state.ispersonal,
      username: this.state.username
    };

    this.submitFile(inputData.title);

    this.setState({
      reports: [...this.state.reports, inputData],
      selectedExpenseType: "",
      inputAmount: "",
      date: "",
      comments: "",
      ispersonal: false,
      entryAmount: this.state.entryAmount + 1
    });

    axios
      .post("/api/form", inputData)
      .catch(err => {
        console.log(err);
      })
      .catch(err => {
        console.log(err);
      });

    this.addRequestAmount(inputData.amount);
  };

  //adds request amount to the employee table in db
  addRequestAmount = amount => {
    axios
      .post("/api/request", { amount })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitForm = () => {
    this.setState({
      reports: [],
      title: ""
    });
  };

  handleDelete(title) {
    setTimeout(() => {
      if (!this.state.reports[0]) {
        this.setState({
          title: ""
        });
      }
    }, 500);

    let filteredReports = this.state.reports.filter(
      report => report.title !== title
    );

    this.setState({
      reports: filteredReports
    });

    axios.delete(`/api/form/${title}`).catch(err => {
      console.log(err);
    });
  }

  render() {
    let dispReports;
    if (this.state.reports[0]) {
      dispReports = this.state.reports.map((report, index) => {
        return (
          <div className={styles.reportList} key={index}>
            <div className={styles.reportListFirstCol}>
              <div className={styles.reportListType}>
                <h3>{report.expense_type}</h3>
              </div>
              <div className={styles.reportListDate}>
                <h3>{report.date}</h3>
              </div>
            </div>
            <div className={styles.reportListAmount}>
              <div
                className={styles.xButton}
                onClick={e => this.handleDelete(report.title)}
              >
                x
              </div>
              <h3>${report.amount}</h3>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <EmployeeNav />
        <div className={styles.employeeCont}>
          <h1 className={styles.header}>Submit New Expense</h1>
          <form className={styles.formCont}>
            <div>
              <div>
                <h3>Title</h3>
                <input
                  type="text"
                  name="Title"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </div>
              <h3>Expense Type</h3>
              <div className={styles.expenseType}>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="Food"
                    value="Food"
                    onChange={e =>
                      this.setState({ selectedExpenseType: e.target.value })
                    }
                    checked={this.state.selectedExpenseType === "Food"}
                  />{" "}
                  Food
                </label>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="Housing"
                    value="Housing"
                    onChange={e =>
                      this.setState({ selectedExpenseType: e.target.value })
                    }
                    checked={this.state.selectedExpenseType === "Housing"}
                  />{" "}
                  Housing
                </label>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="Equipment"
                    value="Equipment"
                    onChange={e =>
                      this.setState({ selectedExpenseType: e.target.value })
                    }
                    checked={this.state.selectedExpenseType === "Equipment"}
                  />{" "}
                  Equipment
                </label>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="Other"
                    value="Other"
                    onChange={e =>
                      this.setState({ selectedExpenseType: e.target.value })
                    }
                    checked={this.state.selectedExpenseType === "Other"}
                  />{" "}
                  Other
                </label>
              </div>
              <h3>Amount</h3>
              <label htmlFor="">
                <input
                  type="number"
                  placeholder="0.00"
                  value={this.state.inputAmount}
                  onChange={e => this.setState({ inputAmount: e.target.value })}
                />
              </label>
            </div>
            <div className={styles.dateAndComments}>
              <h3>Date</h3>
              <label htmlFor="">
                <input
                  type="Date"
                  value={this.state.date}
                  onChange={e => this.setState({ date: e.target.value })}
                />
              </label>
              <div className={styles.textarea}>
                <h3>Comments</h3>
                <textarea
                  name=""
                  id=""
                  rows="6"
                  value={this.state.comments}
                  onChange={e => this.setState({ comments: e.target.value })}
                />
              </div>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  onClick={e =>
                    this.setState({ isPersonal: !this.state.isPersonal })
                  }
                />{" "}
                <p>Personal Expense</p>
              </div>
            </div>
          </form>
          <div className={styles.outerImageUpload}>
            <div className={styles.imageUpload}>
              <p>Upload a receipt</p>
              <div className={styles.uploadButtons}>
                <input
                  label="upload file"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={this.handleFileUpload}
                />
              </div>
            </div>
          </div>
          <div className={styles.preview}>
            {" "}
            <Preview
              title={this.state.title}
              isPersonal={this.state.isPersonal}
              comments={this.state.comments}
              expenseType={this.state.selectedExpenseType}
              amount={this.state.inputAmount}
              date={this.state.date}
              saveForm={this.saveFormData}
            />
          </div>
        </div>
        <div className={styles.reportListCont}>
          {dispReports}
          {this.state.reports[0] ? (
            <button
              className={styles.submitFormButton}
              onClick={this.submitForm}
            >
              Submit
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
