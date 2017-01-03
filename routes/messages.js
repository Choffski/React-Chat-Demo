let express = require('express');
let router = express.Router();
let helpers = require('../helpers/messageHelpers.js')
let fs = require('fs');


// function getChatRoomsFromStorage(){
//   let content = fs.readFileSync('./chatrooms.json');
// return JSON.parse(content);
// }


router.get('/getMessages/:id', (req, res) => {

  let content = helpers.getMessagesInRoom(req.params.id);
  res.send(content);

})





module.exports = router;
