var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseMobileController', function($scope, $cookies) {

    $scope.jumpToPage = function ($page) {
        window.location.href = base + $page;
    };

    $scope.getShortText = function ($text, $length) {
        if ($text.length > $length) {
            $text = $text.substr(0, $length) + '...';
        }
        return $text;
    };

    $scope.removeCookie = function ($key) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.remove($key, {'path': '/cbwa/', 'expires': expireDate});
    };

    $scope.putCookie = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.put($key, $value, {'path': '/cbwa/', 'expires': expireDate});
    };

    $scope.putCookieObject = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.putObject($key, $value, {'path': '/cbwa/', 'expires': expireDate});
    };
});

var domain = 'http://101.201.171.131:8080/rest';
// var domain = 'http://localhost:8080';