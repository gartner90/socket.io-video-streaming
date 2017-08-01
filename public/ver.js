$(function() {
	var socket = io();
	socket.on('stream', function(image) {
		var img = document.getElementById('play');
		img.src = image;
		//$('#logger').text(image);
	});
});