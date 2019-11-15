import React, { Component } from "react";
import "./track.css";

class Track extends Component {
  render() {
    return (
      <div
        className="track"
        onClick={() => this.props.trackClick(this.props.id)}
      >
        <div className="frame">
          <img src={this.props.trackAlbumArtUrl} alt="" />
        </div>
        <div className="info">
          <div className="meta">
            <div>
              <h2>{this.props.trackTitle}</h2>
              <h3>
                {this.props.trackArtist} • {this.props.trackAlbum}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
