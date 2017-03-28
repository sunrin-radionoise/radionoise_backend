module.exports = (io, Users, rndString, Chats) =>{
  io.on('connection', (socket)=>{

    socket.on('make', (token, chat_people)=>{
      var new_Chat = new Chats({
        chat_people: chat_people,
        room_token: rndString.generate(),
      });

      new_Chat.save((err, result)=>{
        if(err) io.emit('make', 'save err');
        if(result){
          socket.room = new_Chat.room_token;
          io.emit('make', socket.room);
          socket.join(socket.room);
        }
      });
    })

    .on('connect', (room_token, token)=>{
       Chats.findOne({room_token: room_token}, (err, user)=> {
         if(err) throw err;
         if(users) socket.leave(socket.room); socket.room = room_token; socket.join(room_token);
       });
    })

    .on('disconnect', ()=>{
      socket.leave(socket.room);
      socket.room = "main";
      socket.join(socket.room);
    })


    .on('message', (msg)=>{
      io.emit('message', msg);
    })
   

  }); 
}
