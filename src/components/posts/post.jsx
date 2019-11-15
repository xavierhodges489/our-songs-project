import React, { Component } from "react";
import "./post.css";

class Post extends Component {
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
          trackAlbumArtUrl:
            "https://raw.githubusercontent.com/xavierhodges489/MusicPlayer/master/MusicPlayer/MusicPlayer/bin/album_art/unknown.jpg",
          trackTitle: "[unknown track]",
          trackArtist: "[unkown artist]"
        });
      });
  }

  handleDelete = () => {
    fetch(`/api/posts/${this.props.postID}`, {
      method: "DELETE"
    }).then(() => {
      this.props.refresh();
    });
  };

  handleFameClick = () => {
    this.setState({ displayWidget: !this.state.displayWidget });
  };

  render() {
    return (
      <div>
        <div className="post">
          <div className="framex" onClick={this.handleFameClick}>
            <img src={this.state.trackAlbumArtUrl} alt="" />
          </div>
          <div className="info">
            <div className="user-info">
              <h2 className="description">{this.props.description}</h2>
              <p className="username">Posted by {this.props.UserName}</p>
            </div>
            <div className="meta">
              <div>
                <h2>{this.state.trackTitle}</h2>
                <h3>
                  {this.state.trackArtist} • {this.state.trackAlbum}
                </h3>
              </div>
            </div>
            <div className="buttons">
              <button className="btn btn-secondary">View Comments</button>
              {this.props.UserID === this.props.currentUserID && (
                <button className="btn btn-danger" onClick={this.handleDelete}>
                  DELETE
                </button>
              )}
            </div>
          </div>
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

export default Post;
