function goFullscreen() {
    document.documentElement.requestFullscreen();
}

function endFullscreen() {
    document.exitFullscreen();
}

function addFullscreenButtons() {
    jQuery('aside.controls .navigate-right').before('<div class="go-fullscreen enabled"><a href="#x" onclick="goFullscreen()"><small>+</small></a></div>');
    jQuery('aside.controls .navigate-right').before('<div class="exit-fullscreen enabled"><a href="#x" onclick="endFullscreen()"><small>-</small></a></div>');
}

jQuery(document).ready(addFullscreenButtons);

function getLocation() {
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(positionInfo) {
    jQuery('#geolocation-info').html(dump(positionInfo));
}

function dump(obj) {
    var out = '{\n';
    for (var i in obj) {
        out += i + ": " + (typeof obj[i] === 'object' ? dump(obj[i]) : obj[i]) + "<br/>\n";
    }
    out += '\b}';
    return out;
}

function showVideo(stream) {
    var video = jQuery('#webcam')[0];

    if ('mozSrcObject' in video) {
        video.mozSrcObject = stream;
    } else if (window.webkitURL) {
        video.src = window.webkitURL.createObjectURL(stream);
    } else {
        video.src = stream;
    }

    video.play();
}

function errorHandler(error) {

}

function startWebcam() {
    navigator.getUserMedia({ video: true }, showVideo, errorHandler);
}

function handleWorkerMessage(event) {
    jQuery('#worker-response').html(event.data);
}
function runWorker() {
    var bee = new Worker("js/worker.js");
    bee.onmessage = handleWorkerMessage;
}