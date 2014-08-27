var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "ejs");
app.engine('html', require('ejs').__express);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("page.html");
});

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('style', function (data) {
        io.sockets.emit('newstyle', data);
    });

});

