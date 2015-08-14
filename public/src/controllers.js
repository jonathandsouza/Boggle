var app = angular.module('BoggleApplication');

app.controller('RootController', function ($scope) {

})


//AppWinController
app.controller('AppWinController', function ($scope, Communication, userService, $location) {

    if (!userService.isUserValidated())
        $location.url('/login');


    $scope.users = [];

    var socket = Communication.getSocket();

    socket.emit('identify', {
        username: userService.getUsername()
    });

    socket.on('user joined', function (data) {

        console.log('user joined', data.username);

        $scope.users.push({
            username: data.username,
            selected: false
        });
        console.log('user added :' + data.username);
        $scope.$apply();

    });

    socket.on('active user list', function (data) {

        console.log('active user list log');
        console.log(data);

        $scope.users = [];

        if (data) {

            angular.forEach(data,
                function (el) {
                    $scope.users.push({
                        username: el.username,
                        selected: false
                    })
                });

            $scope.$apply();
        }
    });

    socket.emit('get active user list');



})



//Login Controller
app.controller('loginController', function ($scope, userService, $location) {

    if (userService.isUserValidated())
        $location.url('/home');


    $scope.login = function () {


        var credentialValidation = userService.setCredentialsAndVerify($scope.userLoginName, '');


        if (credentialValidation == true) {
            $location.url('/home')
        }

    }



})