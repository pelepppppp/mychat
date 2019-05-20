
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mysql = require('mysql');

var connection =  mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'chikabox',
});

// connection.connect(function(error){
//    if(!!error){
//      console.log('error');
//    }else{
//      console.log('Connected to databas!');
//      getUsers();
//    }
// });

var users = [];
var connections =[];
var dataUsers = [];

server.listen(process.env.PORT || 2020);
console.log("Server Running.......")

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/views/chat.html')
})

io.sockets.on('connection',function(socket){
   connections.push(socket);
   console.log('Connected: %s sockets connected',connections.length);
  
  socket.on('disconnect',function(data){
  	 // if(!socket.username) return;
  	  users.splice(users.indexOf(socket.username),1);
  	  updateUsernames();
      connections.splice(connections.indexOf(socket),1);
      console.log('Disonnected: %s sockets disconnected',connections.length);
  });

  socket.on('send message',function(data){
  	console.log(data);
     io.sockets.emit('new message',{msg:data,user:socket.username})
  });
  
  socket.on('new user',function(data,callback){
  	callback(true);
  	socket.username = data;
  	users.push(socket.username);
  	updateUsernames();
  });

   socket.on('logout',function(data,callback){
    socket.emit('disconnect',data);
  });

  function updateUsernames(){
  	io.sockets.emit('get users',users);
  }
})

//get Data from Database
function getUsers(){
  connection.query("Select * from tblUser",function(error,rows,fields){
     if(!!error){
      console.log('error query!');
     }else{
       for(var i = 0;i< rows.length;i++){
          dataUsers.push(rows[i].NickName);
          console.log(dataUsers);
       }
     }
  });

}
