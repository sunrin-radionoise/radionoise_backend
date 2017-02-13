module.exports = (io, Users, rndString, Chats) =>{
  io.on('connection', (socket)=>{
    socket.on('message', (msg, room_token)=>{
      io.broadcast.to(room_token).emit('message', msg);
    })

    .on('make', (token, chat_people)=>{
      var new_Chat = new Chats({
        chat_people: chat_people,
        room_token: rndString.generate(),
      });

      new_Chat.save((err, result)=>{
        if(err) io.emit('make', 'save err');
        if(result){
          io.emit('make', new_Chat.room_token);
          io.room.join(new_Chat.room_token);
        }
      });
    })

    .on('join', (room_token, token)=>{
       Chats.findOne({room_token: room_token}, (err, user)=> {
         if(err) throw err;
         if(users)  socket.room.join(user.token);
       });
    })

    .on('message', (msg)=>{
      io.broadcast.emit('message', msg);
    })
   

  }); 
}
