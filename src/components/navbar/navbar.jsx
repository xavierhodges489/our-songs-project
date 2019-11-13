import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <h1>OurSongs</h1>
        <div className="logged">
          {this.props.isLoggedIn ? (
            <div className="logged-in">
              <h3>User Name</h3>
              <button className="btn btn-secondary">Log Out</button>
            </div>
          ) : (
            <div className="logged-out">
              <button className="btn btn-secondary">Login</button>
              <button className="btn btn-secondary">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
