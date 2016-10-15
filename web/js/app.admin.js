var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseAdminController', function($scope, $cookies, $sce, UtilService) {
    $scope.user = null;
    $scope.isLogin = false;

    if ($cookies.getObject('user')) {
        $scope.user = $cookies.getObject('user');
        $scope.isLogin = true;
    }

    $scope.exit = function () {
        $scope.removeCookie('user');
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

    $scope.formatTime = function ($time) {
        return UtilService.formatTime($time);
    };

    $scope.removeCookie = function ($key) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.remove($key, {'path': '/admin/', 'expires': expireDate});
    };

    $scope.putCookie = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.put($key, $value, {'path': '/admin/', 'expires': expireDate});
    };

    $scope.putCookieObject = function ($key, $value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        $cookies.putObject($key, $value, {'path': '/admin/', 'expires': expireDate});
    };

    $scope.trustHtml = function ($html) {
        return $sce.trustAsHtml($html.replace(/\n/g, '<br />'));
    };
});