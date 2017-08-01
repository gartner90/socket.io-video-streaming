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
		navigator.getUserMedia({video: true},loadCam, loadfail);

		var constraints = { audio: true };
		navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
	        var mediaRecorder = new MediaRecorder(mediaStream);
	        mediaRecorder.onstart = function(e) {
	            this.chunks = [];
	        };

	        mediaRecorder.ondataavailable = function(e) {
	            this.chunks.push(e.data);
	        };
	        mediaRecorder.onstop = function(e) {
	            // var blob = new Blob(this.chunks);
	            // var url = JSON.stringify(url);
	            // socket.emit('radio', {blob : blob, url : url});

	            var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
        		socket.emit('radio', blob);
	        };

	        mediaRecorder.start();
	     //    setTimeout(function() {
		    //     mediaRecorder.stop();
		    // }, 9000);

		    setInterval(function() {
	            mediaRecorder.stop()
	            mediaRecorder.start();
	        }, 100);
	    });
	} else {
		console.log('no navigator.getUserMedia');
	}

	setInterval(function() {
		viewVideo(video, context);
	},100);
});
