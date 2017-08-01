$(function() {
	var socket = io();
	socket.on('stream', function(image) {
		var img = document.getElementById('play');
		img.src = image;
		//$('#logger').text(image);
	});

	socket.on('voice', function(arrayBuffer) {
	    var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
	    var audio = document.createElement('audio');
	    audio.src = window.URL.createObjectURL(blob);
	    audio.play();
	    console.log('arrayBuffer', arrayBuffer, audio);
	});
});