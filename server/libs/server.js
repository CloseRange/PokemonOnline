/*
  download node.js
  npm init
  npm insatll express --save
  npm install socket.io --save

*/

(function() {
  var express = require('express');
  var socket = require('socket.io');

  var color = require('./color');
  var app = express();
  app.use(express.static('../public'));

  var port = 8000;
  var server;
  var io;
  var lst = [];
  var name = "";
  module.exports.init = function(p, n, c) {
    if(n) name = n;
    if(p) port = p;
    var m = "";
    if(n) m = ": " + name;
    c = c || color.blue;
    server = app.listen(port, () => console.log(c, "Starting Server" + m));
    io = socket(server);

    io.sockets.on('connection', newConnection);


    function newConnection(socket) {
      // module.exports.keywords(socket);
      for(var i=0; i<lst.length; i++) {
        socket.on(lst[i].key, lst[i].func);
      }
      console.log(color.green, socket.id);
    };
    module.exports.send = function(data, key) {
      if(!key) key = "send";
      io.sockets.emit(key, data);
    };
  }
  module.exports.on = function(key, fnc) {
    lst.push({
      key: key,
      func: fnc
    });
  }
}());
