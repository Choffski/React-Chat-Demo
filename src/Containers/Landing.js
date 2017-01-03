import React, { Component } from 'react';


class Landing extends Component {
  render() {
    return (
      <div  className="landing-page">
        <div id="first" className="separator"></div>
        <h1 className="landing-title"> Welcome! </h1>
        <p className="landing-text">
          Start by selecting a chatroom from left-side menu.
        </p>
        <div className="separator"></div>

      </div>
    );
  }
}

export default Landing;
