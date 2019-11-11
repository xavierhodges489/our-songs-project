import React, { Component } from "react";
import Post from "./post";
import "./posts.css";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      token: null
    };
  }

  componentDidMount() {
    fetch("/api/posts")
      .then(res => res.json())
      .then(posts =>
        this.setState({ posts }, () => console.log("Posts fetched...", posts))
      );

    fetch("/api/token")
      .then(res => res.json())
      .then(tokenRes => this.setState({ token: tokenRes.access_token }));
  }

  handleAddPost() {}

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <div className="postsContainer">
          {this.state.posts.map(post => (
            <Post
              description={post.PostDescription}
              song={post.PostSong}
              token={this.state.token}
            />
          ))}
        </div>
        <button className="btn btn-primary" onClick={this.handleAddPost}>
          Add Post
        </button>
      </div>
    );
  }
}

export default Posts;
