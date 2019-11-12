import React, { Component } from "react";

class NewPost extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.target);

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PostDescription: event.target[1].value,
        PostSong: event.target[0].value
      })
    })
      .then(result => {
        this.props.refresh();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="form-text text-muted" htmlFor="PostSong">
            Enter Spotify Track ID
          </label>
          <input
            className="form-control"
            type="text"
            name="PostSong"
            id="PostSong"
          />
        </div>
        <div className="form-group">
          <label className="form-text text-muted" htmlFor="PostDescription">
            Enter Description
          </label>
          <input
            className="form-control"
            type="text"
            name="PostDescription"
            id="PostDescription"
          />
        </div>
        <button className="btn btn-primary">Post</button>
      </form>
    );
  }
}

export default NewPost;
