import React, { Component } from "react";

class Comments extends Component {
  constructor() {
    super();
    this.state = { comments: [] };
  }

  render() {
    return (
      <div className="comments-section">
        <h1>Comments</h1>
      </div>
    );
  }
}

export default Comments;
