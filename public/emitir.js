$(function() {
	var canvas = document.getElementById('preview');
	var context = canvas.getContext("2d");

	canvas.width = 800;
	canvas.height = 600;

	context.width = canvas.width;
	context.height = canvas.height;

	var video = document.getElementById("video");
	console.log('win', window);
	var socket = io();
	function logger(msg) {
		$('#logger').text(msg);
	}

	function loadCam(stream) {
		video.src = window.URL.createObjectURL(stream);
		//logger('Camara cargada correctamente')
	}

	function loadfail(stream) {
		logger('Camara MAL cargada')
	}

	function viewVideo() {
		context.drawImage(video, 0, 0, context.width, context.height);
		socket.emit('stream', canvas.toDataURL('image/webp'));
	}

	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia );

	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true, audio: true},loadCam, loadfail)
	} else {
		console.log('no navigator.getUserMedia');
	}

	setInterval(function() {
		viewVideo(video, context);
	},100);
});
