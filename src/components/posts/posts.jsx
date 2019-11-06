import React, { Component } from "react";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("/api/posts")
      .then(res => res.json())
      .then(posts =>
        this.setState({ posts }, () => console.log("Posts fetched...", posts))
      );
  }

  handleAddPost() {}

  render() {
    return (
      <div>
        <h2>Posts</h2>
        {this.state.posts.map(post => (
          <div key={post.PostID}>
            <p>{post.PostDescription}</p>
            <div>{post.PostSong}</div>
          </div>
        ))}
        <button onClick={this.handleAddPost}>Add Post</button>
      </div>
    );
  }
}

export default Posts;
