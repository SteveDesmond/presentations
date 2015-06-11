var x = 0;

function doStuff() {
    postMessage('ey yo, I\'m workin\' on it! ' + (++x * 10) + '%');
    if (x < 10) {
        setTimeout(doStuff, 500);
    } else {
        postMessage('{ "super": "complex", "JSON": [ "object" ] }');
    }
}

doStuff();