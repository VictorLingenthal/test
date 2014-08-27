window.onload = function() {

    var socket = io.connect('http://' + document.location.host);
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var stylefield = document.getElementById("style");
    var stylevaluefield = document.getElementById("stylevalue");
    var styleButton = document.getElementById("stylebutton");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            var messages = [];
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('newstyle', function (data) {
        if(data.newstyle) {
            var style = data.newstyle;
            var stylevalue = data.newstylevalue;
            content.style[style] = stylevalue;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };

    styleButton.onclick = function() {
        var style = stylefield.value;
        var stylevalue = stylevaluefield.value;
        socket.emit('style', {newstyle: style, newstylevalue: stylevalue});
    };

};