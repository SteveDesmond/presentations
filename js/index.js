function goFullscreen() {
    document.documentElement.requestFullscreen();
}

function endFullscreen() {
    document.exitFullscreen();
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(positionInfo) {
    jQuery('#geolocation-info').html(dump(positionInfo));
}

function dump(obj) {
    var out = '{\n';
    for (var i in obj) {
        out += i + ": " + (typeof obj[i] === 'object' ? dump(obj[i])  : obj[i]) + "<br/>\n";
    }
    out += '\b}';
    return out;
}

function addFullscreenButtons() {
    jQuery('aside.controls .navigate-right').before('<div class="go-fullscreen enabled"><a href="#x" onclick="goFullscreen()"><small>+</small></a></div>');
    jQuery('aside.controls .navigate-right').before('<div class="exit-fullscreen enabled"><a href="#x" onclick="endFullscreen()"><small>-</small></a></div>');
}

jQuery(document).ready(addFullscreenButtons);