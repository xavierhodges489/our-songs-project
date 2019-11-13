import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import "./App.css";
import Posts from "./components/posts/posts";
import Navbar from "./components/navbar/navbar";
import Comments from "./components/comments/comments";
import Login from "./components/login/login";
import SignUp from "./components/login/signUp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <div className="container">
          <SignUp />
          <Login />
          <Comments />
          <Posts />
        </div>
      </div>
    );
  }
}

export default App;
