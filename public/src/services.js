var app = angular.module('BoggleApplication')

app.factory('Communication', function ($rootScope) {
    var socket;

    return {
        getSocket: function () {

            if (socket)
                return socket;
            else {
                socket = io.connect();
                return socket;
            }

        }
    }


});

app.factory('userService', function () {

    var username = '',
        key = '',
        isValid = false;

    return {

        setCredentialsAndVerify: function (vUsername, vKey) {
            username = vUsername;
            key = vKey;
            isValid = true;
            return true; //emp code;
        },

        getUsername: function () {
            return username;
        },
        isUserValidated: function () {
            return isValid;
        }

    }

});