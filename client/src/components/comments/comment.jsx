import React, { Component } from "react";
import "./comment.scss";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      trackAlbumArtUrl: null,
      trackTitle: null,
      trackArtist: null,
      trackAlbum: null,
      displayWidget: false
    };
  }

  componentDidMount() {
    fetch(`https://api.spotify.com/v1/tracks/${this.props.song}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          trackAlbumArtUrl: result.album.images[1].url,
          trackTitle: result.name,
          trackArtist: result.artists[0].name,
          trackAlbum: result.album.name
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          trackAlbumArtUrl: "/unknownTrack.jpg",
          trackTitle: "[unknown track]",
          trackArtist: "[unkown artist]",
          trackAlbum: "[unknown album]"
        });
      });
  }

  handleDelete = () => {
    fetch(`/api/comments/${this.props.CommentID}`, {
      method: "DELETE"
    }).then(() => {
      this.props.refresh();
    });
  };

  handleFameClick = () => {
    this.setState({ displayWidget: !this.state.displayWidget });
  };

  convertDate = date => {
    if (date) {
      const dateObject = new Date(date);
      const dateParts = dateObject.toDateString().split(" ");
      dateParts[0] += ",";
      dateParts[2] += ",";
      return dateParts.join(" ");
    }
  };

  handleAddOrRemove = () => {
    this.props.IsInPlaylist
      ? this.props.removeTrackFromPlaylist(
          this.props.CommentID,
          this.props.song
        )
      : this.props.addTrackToPlaylist(this.props.CommentID, this.props.song);
  };

  render() {
    return (
      <div>
        <div
          className={
            this.props.IsInPlaylist ? "comment is-in-playlist" : "comment"
          }
        >
          <div className="frame" onClick={this.handleFameClick}>
            <img src={this.state.trackAlbumArtUrl} alt="" />
          </div>
          <div className="info">
            <div className="user-info">
              <p className="username">
                Posted by {this.props.UserName} <br></br>
                {this.convertDate(this.props.CommentDate)}
              </p>
              <h2 className="description">{this.props.description}</h2>
            </div>
            <div className="meta">
              <div>
                <h2>{this.state.trackTitle}</h2>
                <h3>
                  {this.state.trackArtist} • {this.state.trackAlbum}
                </h3>
              </div>
              {this.props.UserName === this.props.currentUserName && (
                <button className="btn btn-danger" onClick={this.handleDelete}>
                  DELETE
                </button>
              )}
            </div>
          </div>
          {this.props.currentUserName === this.props.postUserName &&
            this.props.isLoggedInWithSpotify &&
            this.props.Playlist && (
              <div
                className="add-or-remove"
                onClick={() => {
                  this.handleAddOrRemove();
                }}
              >
                <p>Add or Remove From Playlist</p>
              </div>
            )}
        </div>
        {this.state.displayWidget && (
          <iframe
            src={`https://open.spotify.com/embed/track/${this.props.song}`}
            title={this.props.song}
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        )}
      </div>
    );
  }
}

export default Comment;
