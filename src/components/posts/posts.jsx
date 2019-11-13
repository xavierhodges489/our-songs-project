import React, { Component } from "react";
import Post from "./post";
import "./posts.css";
import NewPost from "./newPost";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      token: null,
      numPosts: 5,
      pageNumber: 0
    };
    // this.refreshPosts = this.refreshPosts.bind(this);
  }

  componentDidMount() {
    this.refreshPosts();

    fetch("/api/token")
      .then(res => res.json())
      .then(tokenRes => this.setState({ token: tokenRes.access_token }));
  }

  refreshPosts = () => {
    fetch(`/api/posts/page/${this.state.numPosts}/${this.state.pageNumber}`)
      .then(res => res.json())
      .then(posts =>
        this.setState({ posts }, () =>
          console.log(
            `${this.state.numPosts} posts fetched on page ${this.state.pageNumber}`,
            posts
          )
        )
      );
  };

  handlePreviousPage = () => {
    if (this.state.pageNumber > 0) {
      const previousPage = this.state.pageNumber - 1;
      this.setState({ pageNumber: previousPage }, () => {
        this.refreshPosts();
      });
    }
  };

  handleNextPage = () => {
    const nextPage = this.state.pageNumber + 1;
    this.setState({ pageNumber: nextPage }, () => {
      this.refreshPosts();
    });
  };

  render() {
    return (
      <div className="postsSection">
        <h1>Posts</h1>
        <NewPost refresh={this.refreshPosts} token={this.state.token} />

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

        <div className="pageNav">
          <button
            className="btn btn-secondary"
            onClick={this.handlePreviousPage}
          >
            Previous Page
          </button>

          <h4>page {this.state.pageNumber + 1}</h4>

          <button className="btn btn-secondary" onClick={this.handleNextPage}>
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Posts;
