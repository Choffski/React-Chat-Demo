import React, { Component } from 'react';
import { Link } from 'react-router'
class ChatRoomHeader extends Component {

  handleChange = (e) =>{
    this.props.handleInputChange(e);
  }

  render() {
    return (
      <div className="header-wrapper">
      <div className="chatpage-header">

        <div className="chatpage-header-leave">
          <Link to="/chatrooms">Leave</Link>
        </div>

        <div className="chatpage-header-info">
        <h1>{this.props.name}</h1>
        <span>Participants: {this.props.participants}</span>
      </div>

      </div>
      <span>Do you want to change your current username?: <input type="text" value={this.props.user} onChange={this.handleChange.bind(this)}/><button onClick={this.props.handleNameChange}>Change</button></span>
    </div>
    );
  }
}

ChatRoomHeader.propTypes ={
  onChange: React.PropTypes.func,
  onClick:React.PropTypes.func,
}


export default ChatRoomHeader;
