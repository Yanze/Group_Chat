$(document).ready(function() {
  var socket = io.connect('192.168.0.14:5000'); // this triggers the connection event in our server;
  var user_name = prompt("What's your name?");
  $(".chat-room").fadeIn();

  socket.emit("got_new_user", user_name);


  $("#send").click(function(){
    var message = String($("#message").val()).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

   socket.emit("send_message", message);
   $("#message").val("");
   return false;
  });


  socket.on('new_user_connected', function(user_name, all_messages) {
    $("#messages").append("<p class='alert alert-success'>"+user_name+" connected now!</p>");
    for(var i = 0; i < all_messages.length; i++){
      $("#messages").append("<p>"+all_messages[i]+"</p>");
    }

  });

  socket.on('message_received', function(new_message) {
    $("#messages").append("<p>"+new_message+"</p>");

  });


});
