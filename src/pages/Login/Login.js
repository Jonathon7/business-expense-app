import React, { Component } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import lock from "../../images/lock-icon.png";
import user from "../../images/user.png";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      signup: false,
      registered: false
    };
  }

  signup = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/signup", { username, password })
      .then(
        this.setState({
          username: "",
          password: "",
          registered: true
        })
      )
      .catch(err => {
        console.log(err);
      });
  };

  toggleSignup = () => {
    this.setState({
      signup: true
    });
  };

  login = () => {
    const { username, password } = this.state;
    axios.post("/auth/login", { username, password }).then(response => {
      if (response.data.isAdmin) {
        this.props.history.push("/admin");
      } else if (!response.data.isAdmin) {
        this.props.history.push("/employee");
      }
      this.setState({
        username: "",
        password: ""
      });
    });
  };

  render() {
    return (
      <div>
        <div className={styles.loginCont}>
          <div className={styles.loginInnerCont}>
            {this.state.signup && !this.state.registered ? (
              <h2>Please enter Username and Password.</h2>
            ) : !this.state.registered ? (
              <h2>Already have an account?</h2>
            ) : null}{" "}
            {this.state.registered ? (
              <h2>Please Log in again with Username and Password</h2>
            ) : null}
            <div className={styles.loginInputs}>
              <div className={styles.username}>
                <img src={user} alt="" />
                <input
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </div>
              <div className={styles.password}>
                <img src={lock} alt="" />
                <input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
            {this.state.signup && !this.state.registered ? (
              <button className={styles.createAccount} onClick={this.signup}>
                Create Account
              </button>
            ) : this.state.registered && this.state.signup ? (
              <button className={styles.loginButton} onClick={this.login}>
                Login
              </button>
            ) : (
              <button className={styles.loginButton} onClick={this.login}>
                Login
              </button>
            )}
            <div className={styles.loginSignupCont}>
              <h2>New to this site?</h2>
              <button
                className={
                  this.state.signup ? styles.disabled : styles.signupButton
                }
                onClick={this.toggleSignup}
                disabled={this.state.signup}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <h1>Header</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, maxime
            minima ipsum eum neque beatae. Deserunt quae neque fuga accusantium
            quidem doloremque incidunt. Tempore qui enim quibusdam nisi
            perspiciatis animi.
          </p>
        </div>
      </div>
    );
  }
}
