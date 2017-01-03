import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client'

import ChatRoomHeader from '../Components/ChatRoomHeader';
import ChatMessageList from '../Components/ChatMessageList';
import SendMessage  from '../Components/SendMessage';

class ChatRoom extends Component {

  // lifecycle events

  componentWillMount(){

    this.socket = io('http://localhost:8000');
    this.socket.on('connect', () => {

        this.socket.on('user', (data) =>{
          this.setState({'myUser': data.user, 'defaultUser': data.user});
          let stateRef = this.state.thisChatRoom;
          stateRef.participants.push(data.user);
          this.setState({'thisChatRoom': stateRef})

        this.socket.emit('user_added', {user:data.user, room:stateRef.room_id});
        })


      this.socket.on('user_joined', (data) =>{
        let stateRef = this.state.thisChatRoom;
        stateRef.participants = data.users;
        this.setState({'thisChatRoom': stateRef})
      })

    this.socket.on('user_left', (data) =>{
      console.log('user left ' + data.users);
      let stateRef = this.state.thisChatRoom;

      stateRef.participants = data.users;
      this.setState({'thisChatRoom': stateRef})
      })
    this.socket.on('user_has_a_new_name', (data) =>{
      let stateRef = this.state.thisChatRoom;
      stateRef.participants = data.users;
      this.setState({'thisChatRoom': stateRef});
        })
    this.socket.on('new_message_received', (data) =>{
      let messageRef = this.state.messages;
      messageRef.push(data.message);
      this.setState({'messages': messageRef});
    })
    this.socket.on('disconnect', () =>{
      this.socket.emit('user_disconnected',{user: this.state.myUser})
    })
      })//connect ends
  }

  componentDidMount(){
    if(Object.keys(this.state.thisChatRoom).length === 0){
        axios.get('http://localhost:8000/chatrooms/getSingleChatroom/'+ this.props.params.id)
        .then( resp => {
          if(resp.status ===200 ){
            this.setState({thisChatRoom:resp.data})
          }
        })
        .catch( err =>{
          console.log(err);
        })
      }

    axios.get('http://localhost:8000/messages/getMessages/' +this.props.params.id)
    .then(resp =>{
      if(resp.status === 200){
      this.setState({messages:resp.data})
      }
    })
    .catch(err =>{
      console.log(err);
    })

    }
  componentWillUnmount(){
    this.socket.emit('user_leaves', {user: this.state.myUser, room:this.state.thisChatRoom.room_id});

  }

  ////// functions //////

  handleNameChange = () =>{

    let check = this.state.thisChatRoom.participants.filter(item => item === this.state.myUser);
    if(this.state.myUser !== undefined && this.state.myUser !== "" && check.length ===0){
    this.socket.emit('user_renamed', {oldUser:this.state.defaultUser, newUser:this.state.myUser, room:this.state.thisChatRoom.room_id})
    /// update defaultUser in case of futher name changes
    this.setState({defaultUser:this.state.myUser})
    }
    else{
      alert('Please choose another user')
    }
}

  handleInputChange = (e) =>{
    this.setState({'myUser': e.target.value})
  }

  handleSend = () =>{
    let msgRef =
    {
      'sender':this.state.myUser,
      time:Date.now(),
       message:this.state.newMessage
     };
     if(this.state.newMessage !== undefined && this.state.newMessage !==""){
    this.socket.emit('new_message', {message:msgRef, room:this.state.thisChatRoom.room_id})
    let stateRef = this.state.messages;
    stateRef.push(msgRef);
    this.setState({messages:stateRef, newMessage:""})
    }
    else {
      alert('Message is empty')
    }

  }
  handleNewMessage = (e) =>{
    this.setState({'newMessage': e.target.value});
  }

  // constructor
  constructor(){
    super();

    this.state = {
      thisChatRoom:{},
      messages:[],
      newMessage:"",
      myUser:"",
      defaultUser:""
    }
  }

  //render

  render() {
    return (
      <div className="chatpage">

      <ChatRoomHeader  user={this.state.myUser} name={this.state.thisChatRoom.room_name} participants={this.state.thisChatRoom.participants} handleInputChange={this.handleInputChange.bind(this)} handleNameChange={this.handleNameChange.bind(this)} />

      <ChatMessageList  messages={this.state.messages}/>

      <SendMessage newMessage={this.state.newMessage} handleNewMessage={this.handleNewMessage.bind(this)} handleSend={this.handleSend.bind(this)} />
      </div>
    );
  }
}

ChatRoom.propTypes ={
  thisChatRoom:React.PropTypes.object,
  messages: React.PropTypes.array,
  newMessage: React.PropTypes.string,
  myUser: React.PropTypes.string,
  defaultUser:React.PropTypes.string,
  handleSend: React.PropTypes.func,
  handleNewMessage: React.PropTypes.func,
  handleNameChange: React.PropTypes.func,
  handleInputChange: React.PropTypes.func
}

export default ChatRoom;
