import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import "./App.css";
import Posts from "./components/posts/posts";
import Navbar from "./components/navbar/navbar";
import Comments from "./components/comments/comments";
import LogIn from "./components/users/login";
import SignUp from "./components/users/signUp";
import Welcome from "./components/users/welcome";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      UserID: -1,
      Username: "",
      isWelcoming: false,
      isSigningUp: false,
      isLoggingIn: false,
      isViewingPosts: true,
      isViewingComments: false
    };
  }

  handleSignUpOpenClose = () => {
    this.setState({
      isSigningUp: !this.state.isSigningUp,
      isViewingPosts: !this.state.isViewingPosts && !this.state.isLoggingIn,
      isLoggingIn: false
    });
  };

  handleSignUp = UserName => {
    this.setState({ Username: UserName, isWelcoming: true });
    this.handleSignUpOpenClose();
  };

  handleWelcomeGoBack = () => {
    this.setState({ isWelcoming: false, Username: "" });
  };

  handleLogIn = (UserID, Username) => {
    this.setState({
      UserID: UserID,
      Username: Username,
      isLoggedIn: true,
      isViewingPosts: true,
      isLoggingIn: false
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
      UserID: -1
    });
  };

  handleLogInOpenClose = () => {
    this.setState({
      isLoggingIn: !this.state.isLoggingIn,
      isViewingPosts: !this.state.isViewingPosts && !this.state.isSigningUp,
      isSigningUp: false
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isWelcoming && (
          <Welcome
            UserName={this.state.Username}
            handleWelcomeGoBack={this.handleWelcomeGoBack}
          />
        )}
        <Navbar
          Username={this.state.Username}
          isLoggedIn={this.state.isLoggedIn}
          handleSignUpOpenClose={this.handleSignUpOpenClose}
          handleLogInOpenClose={this.handleLogInOpenClose}
          handleLogOut={this.handleLogOut}
        />
        <div className="container">
          {this.state.isSigningUp && (
            <SignUp
              handleSignUpOpenClose={this.handleSignUpOpenClose}
              handleSignUp={this.handleSignUp}
            />
          )}
          {this.state.isLoggingIn && (
            <LogIn
              handleLogInOpenClose={this.handleLogInOpenClose}
              handleLogIn={this.handleLogIn}
            />
          )}
          {this.state.isViewingComments && <Comments />}
          {this.state.isViewingPosts && (
            <Posts
              isLoggedIn={this.state.isLoggedIn}
              UserID={this.state.UserID}
              UserName={this.state.UserName}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
