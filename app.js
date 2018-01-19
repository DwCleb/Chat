var app = require('./config/server');

//configurando porta de comunicação
var server = app.listen('8090', function(){ 
  console.warn('Server on | http://localhost:%s', server.address().port);
});

var io = require('socket.io').listen(server);

var users = []; //array para usuários

app.set('io', io);
app.set('users', users);

io.on('connection', function(socket){

  socket.on('voceEntrou', function(data){
    socket.username = data.user;
    socket.slugname = app.get('slugify')(data.user);

    if(users.indexOf(socket.slugname) > -1){
      return false;
    }
    users.push(socket.slugname);
    socket.broadcast.emit('alguemLogou', {logou: socket.username, slug: socket.slugname, users: users});
    socket.emit('alguemLogou', {logou: socket.username, slug: socket.slugname, users: users});
  });

  socket.on('enviouMensagem', function(data){
    socket.broadcast.emit('recebeuMensagem', {emissor: data.emissor, mensagem: data.mensagem});
  });

  socket.on('digitando', function(data){
    socket.broadcast.emit('estaDigitando', {emissor: data.emissor, mensagem: ' está digitando...'});
  });

  socket.on('parouDeDigitar', function(data){
    socket.broadcast.emit('alguemParouDeDigitar', {emissor: data.emissor});
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('alguemSaiu', {saiu: socket.username, slug: socket.slugname });
    var i = users.indexOf(socket.slugname);
    if(i != -1) {
    	users.splice(i, 1);
    }
  });

});
