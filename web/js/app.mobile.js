var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseMobileController', function($scope, $cookies, $sce, UtilService) {

    $scope.jumpToPage = function ($page) {
        window.location.href = base + $page;
    };

    $scope.isMobile = UtilService.isMobile();

    $scope.getShortText = function ($text, $length) {
        if ($text.length > $length) {
            $text = $text.substr(0, $length) + '...';
        }
        return $text;
    };

    $scope.formatTime = function ($time) {
        return UtilService.formatTime($time);
    };

    $scope.removeCookie = function ($key) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.remove($key, {'path': '/pub/mobile/', 'expires': expireDate});
    };

    $scope.putCookie = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.put($key, $value, {'path': '/pub/mobile/', 'expires': expireDate});
    };

    $scope.putCookieObject = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.putObject($key, $value, {'path': '/pub/mobile/', 'expires': expireDate});
    };

    $scope.trustHtml = function ($html) {
        return $sce.trustAsHtml($html.replace(/\n/g, '<br />'));
    };

    var ele = document.getElementsByTagName("html")[0];
    var size = window.innerWidth / 375 * 16;
    if ($scope.isMobile == false) {
        size = window.innerWidth / 375 * 8;
    }
    ele.style.fontSize = size + "px";
});