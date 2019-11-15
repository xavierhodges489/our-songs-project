import React, { Component } from "react";
import "./navbar.scss";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <h1>OurSongs</h1>
          <div className="logged">
            {this.props.isLoggedIn ? (
              <div className="logged-in">
                <h3>{this.props.Username}</h3>
                <button
                  className="btn btn-secondary"
                  onClick={this.props.handleLogOut}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="logged-out">
                <button
                  className="btn btn-secondary"
                  onClick={this.props.handleLogInOpenClose}
                >
                  Login
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={this.props.handleSignUpOpenClose}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
