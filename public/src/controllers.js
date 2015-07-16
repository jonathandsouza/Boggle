var app = angular.module('BoggleApplication');

app.controller('RootController', function ($scope) {

})

app.controller('AppWinController', function ($scope) {

    var socket = io();

    $scope.users = [];

    $scope.operationsTest = function () {


        socket.emit('identify', {
            username: $scope.username
        });

        socket.on('user joined', function (data) {

            console.log('user joined', data.username);

            $scope.users.push({
                username: data.username,
                selected: false
            });
            console.log('user added :' + data.username);
            $scope.$apply();
            console.log(users);
        });


        socket.on('active user list', function (data) {

            $scope.users = [];

            if (data) {
                data.forEach(function (el) {
                    $scope.users.push({
                        username: el.username,
                        selected: false
                    })
                });

                $scope.$apply();
            }
        });

    }


})