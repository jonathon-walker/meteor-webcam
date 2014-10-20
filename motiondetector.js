MotionDetector = function(options) {
    var captureCurrentImage = options.captureImage,
        comparison = options.compare,
        intervalId;

    function start() {
        Webcam.isDetectingMotion = false;
        intervalId = Meteor.setInterval(detectMotion, 1000 / 10);
    };

    function detectMotion() {
        oldImage = currentImage;
        currentImage = captureCurrentImage();

        if (oldImage && currentImage) {
            Webcam.isDetectingMotion = !comparison(currentImage, oldImage);
        }
    };

    function stop() {
        Meteor.clearInterval(intervalId);
        Webcam.isDetectingMotion = false;
    };

    return {
        start: start,
        stop: stop
    };
}
