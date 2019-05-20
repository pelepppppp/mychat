
// $(function(){

// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// var mysql = require('mysql');
// var dataUsers = [];
// var mysql = require('mysql');

// var connection =  mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'',
//   database:'chikabox',
// });

// connection.connect(function(error){
//    if(!!error){
//      console.log('error');
//    }else{
//      console.log('Connected to databas!');
//      getUsers();
//    }
// });

// function getUsers(){
//   connection.query("Select * from tblUser",function(error,rows,fields){
//      if(!!error){
//       console.log('error query!');
//      }else{
//        for(var i = 0;i< rows.length;i++){
//           dataUsers.push(rows[i].NickName);
//           console.log(dataUsers);
//        }
//      }
//   });
// }
// });