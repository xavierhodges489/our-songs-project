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
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.username === "") {
      this.setState({ badUserNameMessage: "Must have a username" });
    } else if (this.state.password === "") {
      this.setState({ badPassWordMessage: "Must have a password" });
    } else {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          UserName: e.target[0].value,
          Password: e.target[1].value
        })
      })
        .then(res => {
          if (res.status === 200) return res.json();
          else {
            this.setState({
              badLogInMessage: "Incorrect Login"
            });
            return Promise.reject();
          }
        })
        .then(user => {
          this.props.handleLogIn(user[0].UserID, user[0].Username);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleLogInWithSpotify = () => {};

  render() {
    return (
      <div className="log-in">
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-text text-muted" htmlFor="username">
              Enter Username
            </label>
            <input
              value={this.state.username}
              onChange={e => {
                this.setState({
                  username: e.target.value,
                  badUserNameMessage: "",
                  badLogInMessage: ""
                });
              }}
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
            />
            <label className="form-text text-warning" htmlFor="username">
              {this.state.badUserNameMessage}
            </label>
          </div>
          <div className="form-group">
            <label className="form-text text-muted" htmlFor="password">
              Enter Password
            </label>
            <input
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value,
                  badPassWordMessage: "",
                  badLogInMessage: ""
                });
              }}
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />
            <label className="form-text text-warning" htmlFor="password">
              {this.state.badPassWordMessage}
            </label>
          </div>
          <label className="form-text text-warning" htmlFor="username">
            {this.state.badLogInMessage}
          </label>

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
        <div className="divider">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-green"
            onClick={this.props.handleLogInWithSpotify}
          >
            Log In With Spotify
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
