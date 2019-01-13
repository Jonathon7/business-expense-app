import React, { Component } from "react";
import styles from "./chart.module.scss";
import { Bar } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Monthly Expenses",
            data: [
              4356,
              6784,
              6893,
              5436,
              4563,
              7654,
              2341,
              8764,
              2376,
              5839,
              3485,
              2348
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.6)"]
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className={styles.chart}>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Monthly Expenses"
            },
            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  }
}
