var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseController', function($scope, $cookies) {
    $scope.user = null;

    if ($cookies.getObject('user')) {
        $scope.user = $cookies.getObject('user');
    }

    $scope.exit = function () {
        $scope.removeCookie('user');
        $scope.removeCookie('casusGuid');
        window.location.reload();
    };

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
        $cookies.remove($key, {'path': '/', 'expires': expireDate});
    };

    $scope.putCookie = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.put($key, $value, {'path': '/', 'expires': expireDate});
    };

    $scope.putCookieObject = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.putObject($key, $value, {'expires': expireDate});
    };

    $scope.join = function () {
        var casusGuid = $cookies.get('casusGuid');
        if (casusGuid != null) {
            if (confirm("有尚未完成的参赛案例, 是否创建新的案例?")) {
                $scope.putCookie('applyStep', 1);
                $scope.removeCookie('casusGuid');
            }
        }
        $scope.jumpToPage('join');
    };

    $scope.ceremony = function () {
        var ceremonyStep = $cookies.get('ceremonyStep');
        if (ceremonyStep == 4 && $scope.user == null) {
            $scope.putCookie('ceremonyStep', 1);
        }
        $scope.jumpToPage('ceremony');
    };
});

var domain = 'http://101.201.171.131:8080/rest';
// var domain = 'http://localhost:8080';

var base = 'http://www.ccbride.com/cbwa/';
var apiBase = 'http://www.ccbride.com/cbwa';
// var base = 'http://localhost:8000/';
// var apiBase = 'http://localhost:8000';