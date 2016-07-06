const Beam = require('beam-client-node');
const Interactive = require('beam-interactive-node');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = require('./config.json');

console.log(config.channelId);
const channelId = config.channelId;
const username = config.username;
const password = config.password;

const beam = new Beam();

server.listen(3000);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var connections = {};

io.on('connection', function (socket) {
  connections[0] = socket.id;
  socket.emit('hello', { hello: 'world' });
  socket.on('ready', function (data) {
    console.log(data);
    //socket.emit('keyDown', 13);
    //socket.emit('keyUp', 13);
  });
});

beam.use('password', {
    username,
    password,
})
.attempt()
.then(() => beam.game.join(channelId))
.then(res => createRobot(res))
.then(robot => performRobotHandShake(robot))
.then(robot => setupRobotEvents(robot))
.catch(err => {
    //throw new Error('Error connecting to Beam Interactive', err);
	console.log(err);
});

function createRobot (res) {
    return new Interactive.Robot({
        remote: res.body.address,
        channel: channelId,
        key: res.body.key,
    });
}

function performRobotHandShake (robot) {
    return new Promise((resolve, reject) => {
        robot.handshake(err => {
            if (err) {
                reject(err);
            }
            resolve(robot);
        });
    });
}

var buttons = {
	0: 38,
	1: 37,
	2: 40,
	3: 39,
	4: 17,
	5: 13,
	6: 88,
	7: 90,
};

var holding = {}

function setupRobotEvents (robot) {
    robot.on('report', report => {
		if (report.tactile.length > 0) {
			report.tactile.forEach(tactile => {
				if (tactile.holding > 0) {
					console.log("keyDown "+ buttons[tactile.id]);
          io.sockets.connected[connections[0]].emit('keyDown', buttons[tactile.id]);
          holding[buttons[tactile.id]] = true;
				} else {
          if (holding[buttons[tactile.id]]) {
            console.log("keyUp "+ buttons[tactile.id]);
            io.sockets.connected[connections[0]].emit('keyUp', buttons[tactile.id]);
            holding[buttons[tactile.id]] = false;
          }
        }
			});
		}
    });
    robot.on('error', err => {
        throw new Error('There was an error in the Interactive connection', err);
    });
}
