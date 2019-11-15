import React, { Component } from "react";
import "./welcome.css";

class Welcome extends Component {
  state = {};
  render() {
    return (
      <div className="welcome">
        <div className="container">
          <h1>Welcome, {this.props.UserName}</h1>
          <p>Log in to make posts and comments.</p>
          <button
            className="btn btn-primary"
            onClick={this.props.handleWelcomeGoBack}
          >
            Return to OurSongs
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
