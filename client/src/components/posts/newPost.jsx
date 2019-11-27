import React, { Component } from "react";
import Track from "./track";
import "./newPost.scss";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      postSong: "",
      postDescription: "",
      isMakingNew: false,
      songToPost: "",
      badPostSongMessage: "",
      badPostDescriptionMessage: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.songToPost === "") {
      this.setState({
        badPostSongMessage: "Please select a song"
      });
    } else if (this.state.postDescription === "") {
      this.setState({
        badPostDescriptionMessage: "Posts must have a description"
      });
    } else {
      fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          PostDescription: e.target[1].value,
          PostSong: e.target[0].value,
          UserID: this.props.UserID
        })
      })
        .then(() => {
          this.props.refresh();
          this.setState({
            results: [],
            postSong: "",
            postDescription: "",
            isMakingNew: false,
            songToPost: "",
            badPostSongMessage: "",
            badPostDescriptionMessage: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleOnChange = e => {
    this.setState({ postSong: e.target.value });
    fetch(
      `https://api.spotify.com/v1/search?q=${e.target.value}&type=track&market=US&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          results: result.tracks.items
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ results: [] });
      });
  };

  handleTrackClick = id => {
    const isTrack = element => element.id === id;
    const selectedTrackIndex = this.state.results.findIndex(isTrack);
    const selectedTrack = this.state.results[selectedTrackIndex];

    this.setState({
      results: [],
      postSong: id,
      songToPost: `${selectedTrack.name} by ${selectedTrack.artists[0].name}`,
      badPostSongMessage: ""
    });
  };

  handleCreateNewPost = () => {
    this.setState({ isMakingNew: true });
  };

  handleCancel = () => {
    this.setState({
      results: [],
      postSong: "",
      postDescription: "",
      isMakingNew: false,
      songToPost: "",
      badPostSongMessage: "",
      badPostDescriptionMessage: ""
    });
  };

  render() {
    return (
      <div>
        {this.state.isMakingNew ? (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="form-text text-muted" htmlFor="PostSong">
                Enter Spotify Track ID{" "}
                {this.state.songToPost && (
                  <span htmlFor="PostSong"> ({this.state.songToPost})</span>
                )}
              </label>
              <input
                onChange={this.handleOnChange}
                value={this.state.postSong}
                className="form-control"
                type="text"
                name="PostSong"
                id="PostSong"
              />

              {this.state.badPostSongMessage && (
                <label className="form-text text-warning" htmlFor="PostSong">
                  {this.state.badPostSongMessage}
                </label>
              )}
            </div>
            <div>
              {this.state.results.map(track => (
                <Track
                  key={track.id}
                  trackClick={this.handleTrackClick}
                  trackAlbumArtUrl={track.album.images[2].url}
                  trackTitle={track.name}
                  trackArtist={track.artists[0].name}
                  trackAlbum={track.album.name}
                  id={track.id}
                />
              ))}
            </div>
            <div className="form-group">
              <label className="form-text text-muted" htmlFor="PostDescription">
                Enter Description
              </label>
              <input
                onChange={e =>
                  this.setState({ postDescription: e.target.value })
                }
                value={this.state.postDescription}
                className="form-control"
                type="text"
                name="PostDescription"
                id="PostDescription"
              />
              {this.state.badPostDescriptionMessage && (
                <label
                  className="form-text text-warning"
                  htmlFor="PostDescription"
                >
                  {this.state.badPostDescriptionMessage}
                </label>
              )}
            </div>
            <div className="postOrCancel">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
              <input className="btn btn-primary" type="submit" value="Post" />
            </div>
          </form>
        ) : (
          <button
            onClick={this.handleCreateNewPost}
            className="btn btn-primary"
          >
            Create New Post
          </button>
        )}
      </div>
    );
  }
}

export default NewPost;
