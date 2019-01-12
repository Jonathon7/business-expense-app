import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default class Admin extends Component {
  constructor() {
    super();

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/employees")
      .then(response => {
        this.setState({
          employees: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Bar
          data={this.state.employees}
          options={{
            title: {
              display: this.state.username
            }
          }}
        />
      </div>
    );
  }
}
