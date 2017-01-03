import React, { Component } from 'react';


class SendMessage extends Component {



  render() {
    return (
      <div className="send-message-area">

          <input placeholder="Type a new message" type="text" value={this.props.newMessage} onChange={this.props.handleNewMessage}/> <button onClick={this.props.handleSend}> Send </button>
      </div>
    );
  }
}

export default SendMessage;
