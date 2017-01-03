
let fs = require('fs');

module.exports = {

  getMessagesInRoom: (room) =>{
  let content = fs.readFileSync('./'+room+'.json');
  return JSON.parse(content);
},

addMessage: (room, message) =>{

console.log(room);
  let content = fs.readFileSync('./'+room+'.json');
  let parsed = JSON.parse(content);
  console.log(parsed);
  parsed.push(message);

  fs.writeFile('./'+room+'.json', JSON.stringify(parsed), function(err){
    if(err){
      console.log(err);
    }else{
      console.log('done adding');
    }
  })

}

}
