import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import Landing from "./Containers/Landing";
import ChatRooms from "./Containers/ChatRooms";
import ChatRoom from "./Containers/ChatRoom";

class Routes extends Component {
  render() {
    return (

      <Router history={hashHistory}>
        <Route path="/chatrooms" component={ChatRooms}>
          <IndexRoute component={Landing}/>
          <Route path="/chatrooms/:id" component={ChatRoom}></Route>
        </Route>
        <Redirect from="/" to="/chatrooms"></Redirect>
      </Router>
    );
  }
}

export default Routes;
