import React, { Component } from "react";
import { connect } from "react-redux";
import { getReports } from "../../../ducks/reducer";
import styles from "./reportList.module.scss";

class ReportList extends Component {
  componentDidMount() {
    this.props.getReports();
  }

  render() {
    let dispReportsList;
    if (this.props.reports.data) {
      dispReportsList = this.props.reports.data.map(report => {
        return (
          <div key={report.report_id} className={styles.reportListCont}>
            <div>
              <h3>{report.title}</h3>
              <h3>{report.date}</h3>
            </div>
            <h3>${report.amount}</h3>
          </div>
        );
      });
    }
    return <div>{dispReportsList}</div>;
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getReports }
)(ReportList);
