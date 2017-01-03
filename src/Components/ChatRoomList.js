import React, { Component } from 'react';

import ChatRoomListItem from './ChatRoomListItem';

class ChatRoomList extends Component {

  clickHandler = (id) =>{
    this.props.openRoom('/chatrooms/'+ id);
  }


  render() {
    let chatRooms;
    if(this.props.chatRooms){
      chatRooms = this.props.chatRooms.map(item =>{
        return <ChatRoomListItem clickHandler={this.clickHandler.bind(this, item.room_id)} key={item.room_id} name={item.room_name} active={item.participants.length} />
      })
    }
    return (
      <div  className="chatroom-list">
        {chatRooms}
      </div>
    );
  }
}

export default ChatRoomList;
