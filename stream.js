Stream = function(options) {
    var videoElement = document.getElementById(options.videoElement),
        width = options.width || 640,
        height = options.height || 480,
        motionDetection = options.motionDetection || false,
        stream, imageComparer, motionDetector;

    if (motionDetection) {
        imageComparer = ImageComparer({
            width: width,
            height: height
        });

        motionDetector = MotionDetector({
            compare: imageComparer.compare,
            captureImage: captureImage
        });
    }

    function start() {
        getUserMedia().call(navigator, { video: true }, onStream, function(e) {
            console.error(e);
        });
    };

    function onStream(localMediaStream) {
        console.log(videoElement);
        if (videoElement) {
            var vendorURL = window.URL || window.webkitURL;
            if (navigator.mozGetUserMedia) {
                videoElement.mozSrcObject = localMediaStream;
                videoElement.play();
            } else {
                videoElement.src = vendorURL.createObjectURL(localMediaStream);
            }
            stream = localMediaStream;

            if (motionDetection && motionDetector) {
                motionDetector.start();
            }
        }
    };

    function stop() {
        stream.stop();
        videoElement.src = '';
        if (motionDetection && motionDetector) {
            motionDetector.stop();
        }
    };

    function captureImage() {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);
        return canvas;
    };

    function getUserMedia() {
        return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
    };

    return {
        start: start,
        stop: stop,
        captureImage: captureImage
    };
};
