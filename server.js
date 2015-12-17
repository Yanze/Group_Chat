var express = require("express");
var path = require("path");

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var server = app.listen(5000, function() {});

var io = require('socket.io').listen(server);


var users = {};
var all_messages = [];

io.sockets.on('connection', function(socket) {
  // console.log(socket.id + ":connected");

  socket.on("got_new_user", function(user_name) {
    users[socket.id] = user_name;

    io.sockets.emit('new_user_connected', user_name, all_messages);
  });


  socket.on("send_message", function(message) {
    //console.log("user name:" + users[socket.id]);

    var new_message =  "<strong>" + users[socket.id] + " says:</strong> " + message;
    all_messages.push(new_message);
    io.sockets.emit('message_received', new_message);

  });


});

app.get("/", function(req, res) {
  res.render('index');
});
