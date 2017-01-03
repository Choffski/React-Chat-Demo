import React, { Component } from 'react';


class ChatMessage extends Component {

  convertTime = (timeStamp) =>{
/* STILL HAS ISSUE; WRONG +000 INSTEAD OF CORRECT TIMEZONE*/

var date = new Date(timeStamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var month = months[date.getMonth()]

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' /' + date.getDay() + '/' + month;
return formattedTime;
  }

  render() {

    return (
      <div  className="chat-message">
        <b>{this.props.sender}: </b> <br/>
          <span>{this.props.message}</span> <br/>

        {/* <span>{this.convertTime(this.props.timeStamp)}</span> */}
      </div>
    );
  }
}





export default ChatMessage;
