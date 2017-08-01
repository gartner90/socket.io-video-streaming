var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.status(200).send('Hola Mundo 2');
});

io.on('connection', function(socket) {
	console.log('Alguien conectado con socket.', socket);

	socket.on('stream', function(image) {
		socket.broadcast.emit('stream', image);
	});
});

server.listen(8080, function() {
	console.log('servidor corriendo en ', port);
});