import React, { Component } from "react";
import "./post.scss";
import moment from "moment";
import * as Vibrant from "node-vibrant";

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
          trackAlbumArtUrl: "/unknownTrack.jpg",
          trackTitle: "[unknown track]",
          trackArtist: "[unkown artist]",
          trackAlbum: "[unknown album]"
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

  handlePostClick = () => {
    Vibrant.from(this.state.trackAlbumArtUrl)
      .getPalette()
      .then(palette => {
        document.body.style.background = `linear-gradient(-30deg, ${palette.LightVibrant.hex}, #ffffff)`;
      });
  };

  render() {
    return (
      <div onClick={this.handlePostClick}>
        <div className="post">
          <div className="frame" onClick={this.handleFameClick}>
            <img
              src={this.state.trackAlbumArtUrl}
              alt={`album art for ${this.state.trackAlbum}`}
            />
          </div>
          <div className="info">
            <div className="user-info">
              <div className="username-date">
                <p className="username">Posted by {this.props.UserName}</p>
                <p className="date">
                  {moment(this.props.PostDate).format("MMM Do YY, h:mm a")}
                </p>
              </div>
              <h2
                className={
                  this.props.isViewingComments
                    ? "description bigger"
                    : "description"
                }
              >
                {this.props.description}
              </h2>
            </div>
            <div className="meta">
              <div>
                <h2>{this.state.trackTitle}</h2>
                <h3>
                  {this.state.trackArtist} • {this.state.trackAlbum}
                </h3>
              </div>
            </div>
            {(!this.props.isViewingComments || this.props.Playlist) && ( //so buttons doesn't render when in comments mode and there is not playlist button
              <div className="buttons">
                {!this.props.isViewingComments && (
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      this.props.handleViewComments({
                        UserName: this.props.UserName,
                        PostID: this.props.postID,
                        PostSong: this.props.song,
                        PostDescription: this.props.description,
                        pageNumber: this.props.pageNumber,
                        PostDate: this.props.PostDate,
                        Playlist: this.props.Playlist
                      })
                    }
                  >
                    View Comments ({this.props.numComments})
                  </button>
                )}
                {this.props.Playlist && (
                  <button
                    className="btn btn-secondary btn-spotify"
                    onClick={e => {
                      window.open(
                        `http://open.spotify.com/user/thelinmichael/playlist/${this.props.Playlist}`,
                        "_blank"
                      );
                    }}
                  >
                    Open Spotify Playlist
                  </button>
                )}
                {this.props.UserName === this.props.currentUserName &&
                  !this.props.isViewingComments && (
                    <button
                      className="btn btn-danger"
                      onClick={this.handleDelete}
                    >
                      DELETE
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>
        {this.state.displayWidget &&
          (!this.props.Playlist ? (
            <iframe
              src={`https://open.spotify.com/embed/track/${this.props.song}`}
              title={this.props.song}
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          ) : (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${this.props.Playlist}`}
              title={this.props.Playlist}
              width="100%"
              height="280"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          ))}
      </div>
    );
  }
}

export default Post;
