var express = require("express");
var app = express();
var http = require("http").Server(app);
// var server = http.createServer(app);
// var io     = require('socket.io')(http).listen(server);  

var io = require("socket.io")(http);
var Log = require("log"),
	log = new Log('debug');

var port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/', function(req,res) {
	res.redirect('index.html');
});

app.on('connection', function(socket) {
	socket.on('stream', function(image) {
		socket.broadcast.emit('stream', image)
	})
});

app.listen(port, function() {
	log.info('servidor listo en puerto', port)
})