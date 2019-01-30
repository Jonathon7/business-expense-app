import React, { Component } from "react";
import { connect } from "react-redux";
import { getReports, getApproved, getDenied } from "../../../ducks/reducer";
import styles from "./reportList.module.scss";
import receipt from "../../../images/receipt.png";

class ReportList extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      date: "",
      expenseType: "",
      amount: "",
      comments: "",
      denialComments: "",
      showForm: false,
      showFormText: false,
      showOverlay: false,
      showReceipt: false,
      receipts: ""
    };
  }

  componentDidMount() {
    this.props.getReports();
    this.props.getApproved();
    this.props.getDenied();
  }

  showForm = (
    id,
    title,
    date,
    comments,
    expenseType,
    amount,
    denialComments,
    receipts
  ) => {
    this.setState({
      showForm: true,
      title: title,
      date: date,
      comments: comments,
      expenseType: expenseType,
      amount: amount,
      denialComments: denialComments,
      receipts: receipts
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

  showReceipt = () => {
    this.setState({
      showReceipt: true
    });
  };

  render() {
    let dispReportsList;
    if (this.props.reports.data) {
      dispReportsList = this.props.reports.data.map(report => {
        return (
          <div
            key={report.report_id}
            className={styles.submittedCont}
            onClick={() =>
              this.showForm(
                report.report_id,
                report.title,
                report.date,
                report.comments,
                report.expense_type,
                report.amount,
                report.denialComments,
                report.receipts
              )
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
    let dispApproved;
    if (this.props.approved.data) {
      dispApproved = this.props.approved.data.map(report => {
        return (
          <div
            key={report.report_id}
            className={styles.reportListCont}
            onClick={() =>
              this.showForm(
                report.report_id,
                report.title,
                report.date,
                report.comments,
                report.expense_type,
                report.amount,
                report.denialComments,
                report.receipts
              )
            }
          >
            <div>
              <h3>{report.title}</h3>
              <h3>{report.date}</h3>
            </div>
            <h3 className={styles.submittedAmount}>${report.amount}</h3>
          </div>
        );
      });
    }
    let dispDenied;
    if (this.props.denied.data) {
      dispDenied = this.props.denied.data.map(report => {
        return (
          <div
            key={report.report_id}
            className={styles.deniedCont}
            onClick={() =>
              this.showForm(
                report.report_id,
                report.title,
                report.date,
                report.comments,
                report.expense_type,
                report.amount,
                report.denial_comments,
                report.receipts
              )
            }
          >
            <div>
              <h3>{report.title}</h3>
              <h3>{report.date}</h3>
            </div>
            <h3 className={styles.submittedAmount}>${report.amount}</h3>
          </div>
        );
      });
    }
    return (
      <div>
        <div>{dispReportsList}</div>
        <div className={styles.approvedReports}>
          <h3>Approved Reports</h3>
        </div>
        <div>{dispApproved}</div>
        <div className={styles.deniedReports}>
          <h3>Denied Reports</h3>
        </div>
        <div>{dispDenied}</div>
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
                  <div>
                    <p>Comments: </p>
                    <textarea
                      name=""
                      id=""
                      cols="45"
                      rows={this.state.denialComments ? "5" : "10"}
                      value={this.state.comments}
                      readOnly
                    />
                  </div>
                  {this.state.denialComments ? (
                    <div>
                      <p>Reason for Denial: </p>
                      <textarea
                        name=""
                        id=""
                        cols="45"
                        rows="5"
                        value={this.state.denialComments}
                        readOnly
                      />
                    </div>
                  ) : null}
                </div>
                {this.state.receipts ? (
                  <div
                    className={styles.receiptIcon}
                    onClick={this.showReceipt}
                  >
                    <img src={receipt} alt="" />
                  </div>
                ) : null}

                <div className={styles.closeForm} onClick={this.closeForm}>
                  X
                </div>
              </div>
            ) : (
              <div> </div>
            )}
            {this.state.showReceipt ? (
              <div className={styles.receipt}>
                <img
                  src={this.state.receipts}
                  alt=""
                  className={styles.receiptImg}
                />
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
          <div className={styles.hiddenForm}> </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getReports, getApproved, getDenied }
)(ReportList);
