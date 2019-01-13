import React, { Component } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import lock from "../../images/lock-icon.png";
import user from "../../images/user.png";
import bg from "../../images/bg.jpg";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      signup: false,
      registered: false,
      empty: false,
      taken: false,
      reLogin: false
    };
  }

  signup = () => {
    if (this.state.username === "" && this.state.password === "") {
      return this.setState({
        empty: true
      });
    }
    const { username, password } = this.state;
    axios
      .post("/auth/signup", { username, password })
      .then(response => {
        this.setState({
          username: "",
          password: "",
          registered: true,
          taken: false,
          reLogin: true,
          empty: false
        });

        setTimeout(() => {
          this.setState({
            signup: false,
            registered: false
          });
        }, 1500);
      })
      .catch(err => {
        this.setState({
          taken: true
        });
        console.log(err);
      });
  };

  toggleSignup = () => {
    this.setState({
      signup: true,
      empty: false
    });
  };

  login = () => {
    if (this.state.username === "" && this.state.password === "") {
      this.setState({
        empty: true
      });
    }
    const { username, password } = this.state;
    axios.post("/auth/login", { username, password }).then(response => {
      if (response.data.isAdmin) {
        this.props.history.push("/admin");
      } else if (!response.data.isAdmin) {
        this.props.history.push("/employee");
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.signup && this.state.registered ? (
          <div className={styles.notificationCont}>
            <h2>Account Successfuly Created!</h2>
          </div>
        ) : (
          <div className={styles.hiddenNotification} />
        )}
        <div className={styles.loginOuterCont}>
          <div className={styles.loginCont}>
            <h1 className={styles.appTitle}>Business Expenses</h1>
            <div className={styles.loginHeaders}>
              <div className={styles.loginHeadersText}>
                {this.state.signup && !this.state.registered ? (
                  <h2>Please enter Username and Password.</h2>
                ) : !this.state.registered && !this.state.reLogin ? (
                  <h2>Already have an account?</h2>
                ) : null}{" "}
              </div>
            </div>
            <div className={styles.loginInnerCont}>
              {this.state.reLogin ? <h2>Please Log in again</h2> : null}
              {this.state.empty ? (
                <div className={styles.emptyInput}>
                  {" "}
                  <h1> Please enter username and password</h1>{" "}
                </div>
              ) : this.state.taken ? (
                <div className={styles.usernameTaken}>
                  <h1>Username taken</h1>
                </div>
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
                    this.state.signup || this.state.reLogin
                      ? styles.disabled
                      : styles.signupButton
                  }
                  onClick={this.toggleSignup}
                  disabled={
                    this.state.signup === true || this.state.reLogin === true
                  }
                >
                  <h3>Signup</h3>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.descriptionCont}>
            <div className={styles.description}>
              <h1>Sign in to the App</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                maxime minima ipsum eum neque beatae.
              </p>
              <button>See More</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
