import React, { Component } from "react";
import { connect } from "react-redux";
import { getReports } from "../../../ducks/reducer";
import styles from "./reportList.module.scss";

class ReportList extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      date: "",
      showForm: false,
      showFormText: false,
      showOverlay: false
    };
  }
  componentDidMount() {
    this.props.getReports();
  }

  showForm = (id, title, date) => {
    this.setState({
      showForm: true,
      title: title,
      date: date
    });

    setTimeout(() => {
      this.setState({
        showFormText: true
      });
    }, 700);
  };

  closeForm = () => {
    this.setState({
      showForm: false,
      showFormText: false,
      title: "",
      date: ""
    });
  };

  render() {
    let dispReportsList;
    if (this.props.reports.data) {
      dispReportsList = this.props.reports.data.map(report => {
        return (
          <div
            key={report.report_id}
            className={styles.reportListCont}
            onClick={() =>
              this.showForm(report.report_id, report.title, report.date)
            }
          >
            <div>
              <h3>{report.title}</h3>
              <h3>{report.date}</h3>
            </div>
            <h3>${report.amount}</h3>
          </div>
        );
      });
    }
    return (
      <div>
        <div>{dispReportsList}</div>
        {this.state.showOverlay ? (
          <div className={styles.overlay} onClick={this.hideForm} />
        ) : null}
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
                    cols="45"
                    rows="10"
                    value={this.state.comments}
                    readOnly
                  />
                </div>
                <div className={styles.closeForm} onClick={this.closeForm}>
                  X
                </div>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        ) : (
          <div className={styles.hiddenForm}> </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getReports }
)(ReportList);
