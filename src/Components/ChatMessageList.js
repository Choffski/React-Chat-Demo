import React, { Component } from 'react';

import ChatMessage from './ChatMessage';

class ChatMessageList extends Component {


  render() {
    let messages;
    if(this.props.messages){
      messages = this.props.messages.map(item =>{
        return <ChatMessage key={item.time} sender={item.sender} message={item.message} timeStamp={item.time} />
      })
    }
    return (
      <div  className="chatroom-message-area">
        {messages}
      </div>
    );
  }
}
ChatMessageList.propTypes ={
  sender:React.PropTypes.string,
  key: React.PropTypes.string,
  message:React.PropTypes.string,
  timeStamp:React.PropTypes.string,
  messages:React.PropTypes.array
}

export default ChatMessageList;
