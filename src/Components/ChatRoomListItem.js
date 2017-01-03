import React, { Component } from 'react';


class ChatRoomListItem extends Component {

  render() {
    let chatRooms;
    if(this.props.chatRooms){
      chatRooms = this.props.chatRooms.map(item =>{
        return <ChatRoomListItem key={item.room_id} name={item.room_name} active={item.participants.length} />
      })
    }
    return (
      <div className="chatroom-list-item" onClick={this.props.clickHandler}>
        <b>{this.props.name}</b>
      </div>
    );
  }
}

export default ChatRoomListItem;
