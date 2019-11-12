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
    // event.preventDefault();
    // const data = new FormData(event.target);

    fetch(`/api/posts/${this.props.postID}`, {
      method: "DELETE"
    });

    this.props.refresh();
  };

  render() {
    return (
      <div className="post">
        <div className="frame">
          <img src={this.state.trackAlbumArtUrl} alt="" />
        </div>
        <div className="info">
          <p className="description">{this.props.description}</p>
          <div className="meta">
            <div>
              <h2>{this.state.trackTitle}</h2>
              <h3>{this.state.trackArtist}</h3>
            </div>
            {/* <iframe
              src={`https://open.spotify.com/embed/track/${this.props.song}`}
              width="80"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe> */}
          </div>
          <div className="buttons">
            <button className="btn btn-secondary">View Comments</button>
            <button className="btn btn-danger" onClick={this.handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
