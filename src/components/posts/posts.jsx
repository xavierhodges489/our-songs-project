import React, { Component } from "react";
import Post from "./post";
import "./posts.css";
import NewPost from "./newPost";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      token: null
    };
    this.refreshPosts = this.refreshPosts.bind(this);
  }

  refreshPosts() {
    fetch("/api/posts")
      .then(res => res.json())
      .then(posts =>
        this.setState({ posts }, () => console.log("Posts fetched...", posts))
      );
  }

  componentDidMount() {
    this.refreshPosts();

    fetch("/api/token")
      .then(res => res.json())
      .then(tokenRes => this.setState({ token: tokenRes.access_token }));
  }

  render() {
    return (
      <div className="postsSection">
        <h2>Posts</h2>
        <NewPost refresh={this.refreshPosts} />
        <div className="postsContainer">
          {this.state.posts.map(post => (
            <Post
              key={post.PostID}
              postID={post.PostID}
              refresh={this.refreshPosts}
              description={post.PostDescription}
              song={post.PostSong}
              token={this.state.token}
            />
          ))}
        </div>
        {/* <button className="btn btn-primary" onClick={this.handleAddPost}>
          Add Post
        </button> */}
      </div>
    );
  }
}

export default Posts;
