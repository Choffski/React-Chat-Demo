
let fs = require('fs');

module.exports = {

addParticipiant: function(participant, room, callback){

  let content = fs.readFileSync('./chatrooms.json');
  let parsed = JSON.parse(content);
  let filtered = parsed.filter(item => item.room_id === room);
  Promise.all(filtered) .then( ()=>{

    filtered[0].participants.push(participant);
    fs.writeFile('./chatrooms.json', JSON.stringify(filtered), function(err, data){
      if(!err){
        callback(filtered[0].participants)
      }
    })
  })

},

removeParticipant: function(participant, room, callback){
  let content = fs.readFileSync('./chatrooms.json');
  let parsed = JSON.parse(content);
  let filtered = parsed.filter(item => item.room_id === room);
  let filteredUsers =  filtered[0].participants.filter(name => name !== participant);

  Promise.all(filteredUsers) .then( ()=>{

  filtered[0].participants = filteredUsers;


    fs.writeFile('./chatrooms.json', JSON.stringify(filtered), function(err, data){
      if(!err){
        callback(filtered[0].participants)
      } else{
        console.log(err);
      }
    })
  })

},

renameParticipant: function(oldParticipant, newParticipant, room, callback){
  let content = fs.readFileSync('./chatrooms.json')
  let parsed = JSON.parse(content);
  let filtered = parsed.filter(item => item.room_id === room);
  let filteredUsers =  filtered[0].participants.filter(name => name !== oldParticipant);

  Promise.all(filteredUsers) .then( () => {
    filteredUsers.push(newParticipant);
    console.log(filteredUsers);
    filtered[0].participants = filteredUsers;

        fs.writeFile('./chatrooms.json', JSON.stringify(filtered), function(err, data){
          if(!err){
            callback(filtered[0].participants)
          } else{
            console.log(err);
          }
        })
  })

},

  // addParticipiant: (participant, room, callback) => {
  //   let content = fs.readFileSync('./chatRooms.json');
  //   let parsed = JSON.parse(content)
  //   let filtered = parsed.filter(item => item.room_id === room);
  //   filtered[0].participants.push(participant);
  //   console.log(JSON.stringify(filtered));
  //   Promise.all(filtered)
  //   .then( () =>{
  //     fs.writeFile('chatrooms.json',JSON.stringify(filtered), (err) =>{
  //       callback(filtered[0].participants);
  //     });
  //
  //   })


//  },
  getChatRoomsFromStorage: (participants) =>{
  let content = fs.readFileSync('./chatrooms.json');
  return JSON.parse(content);
  }
}
