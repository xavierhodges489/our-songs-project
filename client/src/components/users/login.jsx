import React, { Component } from "react";
import "./login.scss";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      badLogInMessage: "",
      badUserNameMessage: "",
      badPassWordMessage: "",
      username: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === "" && this.state.password === "") {
      this.setState({
        badUserNameMessage: "Must have a username",
        badPassWordMessage: "Must have a password",
      });
    } else if (this.state.username === "") {
      this.setState({ badUserNameMessage: "Must have a username" });
    } else if (this.state.password === "") {
      this.setState({ badPassWordMessage: "Must have a password" });
    } else {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: e.target[0].value,
          Password: e.target[1].value,
        }),
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          else {
            this.setState({
              badLogInMessage: "Incorrect Login",
            });
            return Promise.reject();
          }
        })
        .then((result) => {
          console.log(result);
          this.props.handleLogIn(result[0].UserName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleLoginWithSpotify = (e) => {
    e.preventDefault();
    fetch("/api/token/loginwithspotify", { method: "POST" })
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.json();
        else {
          return Promise.reject();
        }
      })
      .then((result) => {
        window.location.href = result.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="log-in">
        <h2>Log In</h2>
        <div className="log-in-container">
          <div>
            <button
              className="btn btn-primary btn-green"
              onClick={this.handleLoginWithSpotify}
            >
              Login With Spotify
            </button>
          </div>
          <div className="divider">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="form-text text-muted" htmlFor="username">
                Enter Username
              </label>
              <input
                value={this.state.username}
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                    badUserNameMessage: "",
                    badLogInMessage: "",
                  });
                }}
                className={
                  this.state.badUserNameMessage || this.state.badLogInMessage
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                name="username"
                placeholder="Username"
                id="username"
              />
              <div className="invalid-feedback">
                {this.state.badUserNameMessage}
              </div>
            </div>
            <div className="form-group">
              <label className="form-text text-muted" htmlFor="password">
                Enter Password
              </label>
              <input
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                    badPassWordMessage: "",
                    badLogInMessage: "",
                  });
                }}
                className={
                  this.state.badPassWordMessage || this.state.badLogInMessage
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
              <div className="invalid-feedback">
                {this.state.badPassWordMessage}
              </div>
            </div>
            <div className="form-group">
              <label className="form-text" htmlFor="username">
                (Users not logged in with spotify will not be able to create
                spotify playlists)
              </label>
              <label className="form-text text-danger" htmlFor="username">
                {this.state.badLogInMessage}
              </label>
            </div>

            <div className="postOrCancel">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.handleLogInClose}
              >
                Cancel
              </button>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
