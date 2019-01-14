import React, { Component } from "react";
import EmployeeNav from "../../components/Navbar/EmployeeNavbar/EmployeeNav";
import styles from "./employee.module.scss";
import Preview from "./ReportsForm/Preview";

export default class Employee extends Component {
  constructor() {
    super();

    this.state = {
      inputData: {
        selectedExpenseType: "",
        inputAmount: 0,
        date: ""
      },
      inputValues: []
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handlePush);
  }

  componentWillMount() {
    window.removeEventListener("scroll", this.handlePush);
  }

  handlePush = () => {
    window.requestAnimationFrame(() => {
      if (this.state.selectedExpenseType !== "") {
      }
    });
  };

  render() {
    let inputValues = this.state.inputValues.map(value => {
      this.state.map();
    });
    console.log(this.state);
    return (
      <div>
        <EmployeeNav />
        <div>
          <form onSubmit={this.handleSubmit} className={styles.formCont}>
            <h3>Expense Type</h3>
            <div className={styles.expenseType}>
              <label htmlFor="">
                <input
                  type="radio"
                  name="Food"
                  value="food"
                  onChange={e =>
                    this.setState({ selectedExpenseType: e.target.value })
                  }
                  checked={this.state.selectedExpenseType === "food"}
                />{" "}
                Food
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="Housing"
                  value="housing"
                  onChange={e =>
                    this.setState({ selectedExpenseType: e.target.value })
                  }
                  checked={this.state.selectedExpenseType === "housing"}
                />{" "}
                Housing
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="Equipment"
                  value="equipment"
                  onChange={e =>
                    this.setState({ selectedExpenseType: e.target.value })
                  }
                  checked={this.state.selectedExpenseType === "equipment"}
                />{" "}
                Equipment
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="Other"
                  value="other"
                  onChange={e =>
                    this.setState({ selectedExpenseType: e.target.value })
                  }
                  checked={this.state.selectedExpenseType === "other"}
                />{" "}
                Other
              </label>
            </div>
            <h3>Amount</h3>
            <label htmlFor="">
              <input
                type="number"
                placeholder="$0.00"
                value={this.state.inputAmount}
                onChange={e => this.setState({ inputAmount: e.target.value })}
              />
            </label>
            <h3>Date</h3>
            <label htmlFor="">
              <input
                type="Date"
                value={this.state.date}
                onChange={e => this.setState({ date: e.target.value })}
              />
            </label>
          </form>
          <div className={styles.loginDrop}>
            {" "}
            <Preview
              expenseType={this.state.selectedExpenseType}
              amount={this.state.inputAmount}
              date={this.state.date}
            />
          </div>
        </div>
      </div>
    );
  }
}
