var app = angular.module('BoggleApplication');


app.controller('TestingController', function ($scope) {


    $scope.test = "Live Testing";

    $scope.users = [];

    $scope.selectedUser = '';

    socket = io.connect("https://boggle-jonathandsouza.c9.io");
    //    socket = io.connect();

    socket.on('identified', function (data) {

        console.log(data);
    });


    socket.on('user joined', function (data) {

        console.log('user has joined::::::' + data.username);

        if (data && data.username)
            $scope.users.push(data.username)

        console.log($scope.users);
        $scope.$apply();

    });

    socket.on('user left', function (data) {

        console.log('user has left::::::' + data.username);

    });



    socket.on('active user list', function (data) {

        console.log('active user list log');
        console.log(data);

        $scope.users = [];

        if (data) {

            angular.forEach(data.activeUserList,
                function (el) {

                    console.log(el)

                    $scope.users.push({
                        username: el
                    })
                });

            console.log('users');
            console.log($scope.users)

        }

        $scope.$apply();
    });




    $scope.identify = function () {
        console.log('identify');

        socket.emit('identify', {
            username: $scope.user
        });

    }


    $scope.getUserList = function () {

        console.log('getUserList');
        socket.emit('get active user list');

    }

    $scope.update = function () {
        console.log(' scope updated');
        $scope.$apply();
    }



    $scope.challenge = function () {

        console.log('challenge event triggered');
        socket.emit('challenge', {
            challenger: $scope.user,
            challenged: $scope.selectedUser
        });

    }



    $scope.userSelected = function (username) {

        console.log('event triggered');

        $scope.selectedUser = username;





    }

    $scope.challengedArrived = false;

    var challengeData = {};


    socket.on('challenged', function (data) {


        console.log('YOU HAVE BEEN CHALLENGED');
        console.log(data);

        $scope.challengedArrived = true;



        challengeData = data;

        $scope.$apply();

    });



    $scope.acceptChallenge = function (accpeted) {

        response = {

            challengeID: challengeData.challengeID,
            challengeAccepted: accpeted

        };

        socket.emit('challenge response', response);


    }


    socket.on('challenge response', function (data) {


        challengeData = data;
        console.log(data);


    });



    $scope.swapWordList = function () {


        response = {

            challengeID: challengeData.challengeID,
            wordList: ["abc", "def", "ghi"],
            username: $scope.user

        };

        console.log("evaluate challenge REQUEST");
        console.log(response);

        socket.emit('swap word list', response);

    }



    socket.on('challenge result', function (data) {

        console.log('evaluate challenge  RESPONSE:::::::');
        console.log(data)
    });




});