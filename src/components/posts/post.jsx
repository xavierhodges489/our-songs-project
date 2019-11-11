import React, { Component } from "react";
import "./post.css";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      trackAlbumArtUrl: null,
      trackTitle: null,
      trackArtist: null
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
          trackArtist: result.artists[0].name
        });
      });
  }

  render() {
    return (
      <div className="post">
        <div className="frame">
          <img src={this.state.trackAlbumArtUrl} alt="" />
        </div>
        <div className="info">
          <div className="meta">
            <h2>{this.state.trackTitle}</h2>
            <h3>{this.state.trackArtist}</h3>
          </div>
          <p className="description">{this.props.description}</p>
          <button className="btn btn-secondary">View Comments</button>
        </div>
      </div>
    );
  }
}

export default Post;
