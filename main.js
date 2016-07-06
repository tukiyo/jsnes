var socket = io.connect('http://localhost:3000');

socket.on('hello', function(data) {
  socket.emit('ready', { ready: true });
  console.log("HANDSHAKE!");
});

socket.on('keyUp', function (data) {
  console.log("keyUp", data);
  nes.keyboard.keyUp({keyCode: data});
});

socket.on('keyDown', function (data) {
  console.log("keyDown", data);
  nes.keyboard.keyDown({keyCode: data});
});
