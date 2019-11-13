import React, { Component } from "react";

class Login extends Component {
  state = {};

  handleSubmit = () => {};

  handleBack = () => {};

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

          <div className="postOrCancel">
            <button className="btn btn-primary" onClick={this.handleCancel}>
              Cancel
            </button>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
