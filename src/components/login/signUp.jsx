import React, { Component } from "react";

class SignUp extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();

    // this.setState({
    //   results: [],
    //   postSong: "",
    //   postDescription: "",
    //   isMakingNew: false
    // });

    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PassWord: e.target[1].value,
        UserName: e.target[0].value
      })
    }).catch(err => {
      console.log(err);
    });
  };

  handleBack = () => {};

  render() {
    return (
      <div className="log-in">
        <h2>Sign Up</h2>
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

export default SignUp;
