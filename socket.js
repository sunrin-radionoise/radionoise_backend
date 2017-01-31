module.exports = (io) =>{
  io.on('connection', function(socket){
    socket.on('message', function(msg){
      io.emit('message', msg);
    });

    socket.on('test', function(msg){
      io.emit('test', msg);
    });
  }); 

}
