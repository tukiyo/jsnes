var socket = io.connect('http://localhost:3000');

var buttons = {
	38: "up",
	37: "left",
	40: "down",
	39: "right",
	17: "select",
	13: "start",
	88: "a",
	90: "b"
};

socket.on('hello', function(data) {
  socket.emit('ready', { ready: true });
  console.log("HANDSHAKE!");
});

socket.on('keyUp', function (data) {
  console.log("keyUp", data);
  nes.keyboard.keyUp({keyCode: data});
  $('#showbutton-'+buttons[data]).css('color', '#777');
});

socket.on('keyDown', function (data) {
  console.log("keyDown", data);
  nes.keyboard.keyDown({keyCode: data});
  $('#showbutton-'+buttons[data]).css('color', '#fff');
});
