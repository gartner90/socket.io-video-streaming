$(function() {
	var socket = io.connect('http://localhost:8080', { 'forceNew': true});
	socket.on('stream', function(image) {
		var img = document.getElementById('play');
		img.src = image;
		//$('#logger').text(image);
	});
});