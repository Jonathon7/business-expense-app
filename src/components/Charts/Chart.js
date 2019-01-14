import React, { Component } from "react";
import styles from "./chart.module.scss";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getEmployees } from "../../ducks/reducer";

class Chart extends Component {
  render() {
    // let labels = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December"
    // ];

    let totalExpenses = this.props.employees
      .map(employee => {
        return employee.amount_requested;
      })
      .reduce((total, currentAmount) => {
        return total + currentAmount;
      }, 0);

    let chartData = {
      labels: ["Total Expenses"],
      datasets: [
        {
          label: "Total Expenses",
          data: [totalExpenses],
          backgroundColor: ["rgba(255, 99, 132, 0.6)"]
        }
      ]
    };

    return (
      <div className={styles.chart}>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Employee Expenses",
              barThickness: 10
            },
            legend: {
              display: false
            }
          }}
        />{" "}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEmployees }
)(Chart);
