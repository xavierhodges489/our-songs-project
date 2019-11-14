import React, { Component } from "react";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      isBadLogIn: false,
      badLogInMessage: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

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
      .then(res => res.json())
      .then(user => {
        if (user.length > 0)
          this.props.handleLogIn(user[0].UserID, user[0].Username);
        else
          this.setState({
            isBadLogIn: true,
            badLogInMessage: "username or password is incorrect"
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="form-group">
            <label className="form-text text-muted" htmlFor="password">
              Enter Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />
          </div>
          {this.state.isBadLogIn && (
            <label className="form-text text-warning" htmlFor="username">
              {this.state.badLogInMessage}
            </label>
          )}

          <div className="postOrCancel">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.handleLogInOpenClose}
            >
              Cancel
            </button>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
