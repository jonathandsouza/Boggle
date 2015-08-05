module.exports = function (io) {
    'use strict';

    //        io.on('connection', function (socket) {
    //    
    //            console.log('a user connected');
    //    
    //            socket.on('chat message', function (msg) {
    //                console.log('to: ' + msg.to);
    //                console.log('message: ' + msg.message);
    //                //            io.emit('chat message', msg);
    //                //sockets[0].emit('chat message', msg.message);
    //    
    //                console.log(sockets[msg.to]);
    //    
    //                io.sockets.connected[sockets[msg.to]].emit('chat message', msg.message);
    //    
    //            });
    //    
    //            socket.on('disconnect', function () {
    //                console.log('user disconnected');
    //            });
    //    
    //            socket.on('add user', function (data) {
    //    
    //                console.log('user added :' + data.username)
    //    
    //                users.push(data.username);
    //                sockets[data.username] = socket.id;
    //    
    //                console.log(socket.id);
    //    
    //                io.emit('user joined', users);
    //            });
    //    
    //        });


    function socketManager() {

        this.socketInfo = [];
        this.activeSocktes = 0;

        this.getUserNameBySocketId = function (socketId) {


            this.socketInfo.forEach(function (el) {

                if (el.socketId == socketId)
                    return el;

            });

        };

        this.getSocketIDByUserName = function (userName) {

            this.socketInfo.forEach(function (el) {

                if (el.username == userName)
                    return el;
            });

        };


        this.storeSocketInfo = function (data) {

            if (data && data.username && data.socketId) {

                this.socketInfo.push({
                    username: data.username,
                    socketId: data.socketId
                });
            }

        };

        this.removeSocket = function (data) {

            if (data.username) {

                this.socketInfo = this.socketInfo
                    .filter(function (el) {
                        return el.username !== data.username;
                    });

            }

            if (data.socketId) {

                this.socketInfo = this.socketInfo
                    .filter(function (el) {
                        return el.socketId !== data.socketId;
                    });

            }

        };

        this.getUserList = function () {

            var tmpUsr = [];

            this.socketInfo.forEach(function (el) {

                if (el.username) {

                    tmpUsr.push(el.username);

                }

            });

            return tmpUsr;
        };


    }


    var objSocketManager = new socketManager();


    io.on('connection', function (socket) {

        console.log('user connected on socket: ' + socket.id);

        socket.on('disconnect', function () {

            console.log('user disconnected from socket :' + socket.id);

            var userSocketInfo = objSocketManager.getUserNameBySocketId(socket.id);

            if (userSocketInfo && userSocketInfo.username) {

                io.emit('user left', {
                    username: userSocketInfo.username
                });
            }

        });

        socket.on('identify', function (data) {

            console.log('identity');
            console.log(data);
            if (data && data.username && socket.id) {
                objSocketManager.storeSocketInfo({
                    username: data.username,
                    socketId: socket.id
                });
            }

            console.log(objSocketManager.socketInfo);

            socket.broadcast.emit('user joined', {
                username: data.username
            });



        });

        socket.on('get active user list', function (data) {
            socket.emit('active user list', objSocketManager.getUserList);
        });

        socket.on('challenge', function (data) {

            if (data && data.challenger && data.challenged) {


                var userSocketInfo = objSocketManager.getSocketIDByUserName(data.challenged)

                if (userSocketInfo && userSocketInfo.socketId) {

                    io.sockets.socket(userSocketInfo.socketId).emit('challenged', {});
                }

            }



        });

        socket.on('challenge response', function (data) {});



    });
}