import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import axios from 'axios';

import ChatRoomList from '../Components/ChatRoomList'

class ChatRooms extends Component {

  // Lifecycle events
  componentWillMount(){
    axios.get('http://localhost:8000/chatrooms/getAllChatRooms')
    .then(resp =>{
      if(resp.status === 200){
        this.setState({chatRooms:resp.data})
      }
    })
    .catch(err =>{
      console.log(err);
    })
  }
  // Lifecycle events end

  // support functions
    handleNav = (path) =>{
      hashHistory.push(path);
    }

  // support functions end

  constructor(){
    super();
    this.state ={
      chatRooms:[]
    }

  }
  render() {
    return (
      <div className="chatroom-list-container">

        <div className="chatroom-list-holder">
          <ChatRoomList chatRooms={this.state.chatRooms} openRoom={this.handleNav.bind(this)}/>
        </div>

        <div className="chatroom-content">

          {this.props.children}

        </div>

      </div>
    );
  }
}

ChatRooms.propTypes ={
  chatRooms:React.PropTypes.array,
}


export default ChatRooms;
