let express = require('express');
let router = express.Router();
let helpers = require('../helpers/chatroomHelpers.js')
let fs = require('fs');


// function getChatRoomsFromStorage(){
//   let content = fs.readFileSync('./chatrooms.json');
// return JSON.parse(content);
// }

router.get('/getAllChatRooms', (req, res) =>{

  res.send(helpers.getChatRoomsFromStorage());
  })

router.get('/getSingleChatroom/:id', (req, res) => {

  let content = helpers.getChatRoomsFromStorage();
  console.log(content);
  let filtered = content.filter(item =>  item.room_id === req.params.id);
  res.send(filtered[0]);

})





module.exports = router;
