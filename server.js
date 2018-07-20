var session = require('express-session');
var express = require("express");
var bodyParser = require('body-parser');
var path = require( "path");
var app = express();
app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index',{});
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
// var users = {};


io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on( "got_new_user", function (data){
        console.log(data.name);
        console.log(data.msg);
        // users.add(data.name, data.msg)
        socket.broadcast.emit('server_response',{name: data.name, msg: data.msg});
    })
})