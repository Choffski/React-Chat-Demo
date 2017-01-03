let express = require('express');
let app = express();

let bodyParser = require('body-parser');
const port = 8000;


let chatRoomsRouter = require('./routes/chatrooms.js');
let messagesRouter = require('./routes/messages.js');
let helpers = require('./helpers/chatroomHelpers.js');
let msgHelpers = require('./helpers/messageHelpers.js');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "http://localhost:3000");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

// ///// Routes /////
app.use('/chatrooms', chatRoomsRouter);
app.use('/messages', messagesRouter)


let server = app.listen(port)
let io = require('socket.io').listen(server);

io.on('connection', (socket) =>{
  console.log('connected ' + socket.id);

  let user = 'user-' + Math.floor(Math.random() * (1000 - 1));
  // tell user who HE is
  socket.emit('user', { user: user });
  // tell others that user joined
  // socket.broadcast.emit('user_joined', {user:user});
  //socket.broadcast.emit('user_joined',{user: user});

  socket.on('user_added', (data) =>{
    helpers.addParticipiant(data.user, data.room, (resp) =>{
      socket.broadcast.emit('user_joined', {users:resp});
    })
  })

  socket.on('disconnect', () =>{
    /* does not work, yet*/
    console.log('disconnected');
  })

  socket.on('user_leaves', (data)=>{
    helpers.removeParticipant(data.user, data.room, (resp)=>{
      socket.broadcast.emit('user_left',{ users:resp })
    })
  })
  socket.on('user_renamed', (data) =>{
    helpers.renameParticipant(data.oldUser, data.newUser, data.room, (resp) =>{
      io.emit('user_has_a_new_name', {users:resp})
    })
  })
  socket.on('new_message', (data)=> {
    msgHelpers.addMessage(data.room,data.message)
    socket.broadcast.emit('new_message_received', {message:data.message})
  })


})
