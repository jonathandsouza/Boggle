var express = require('express');
var port = process.env.PORT || 3200;

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var comm = require('./serverModules/socketCommunication')(io);

app.use(express.static('./bower_components'));
app.use(express.static('./node_modules'));
app.use(express.static('./public'));

app.get('/', function (req, res) {

    res.send('api has started');
})


server.listen(port, function () {

    console.log('application running on :' + port);
});