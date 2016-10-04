var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseController', function($scope, $cookieStore) {
    $scope.user = null;

    if ($cookieStore.get('user')) {
        $scope.user = $cookieStore.get('user');
    }

    $scope.exit = function () {
        $cookieStore.remove('user');
        window.location.reload();
    };

    $scope.jumpToPage = function ($page) {
        window.location.href = base + $page;
    };

    $scope.join = function ($page) {
        var casusGuid = $cookieStore.get('casusGuid');
        if (casusGuid != null) {
            if (confirm("有尚未完成的参赛案例, 是否创建新的案例?")) {
                $cookieStore.put('applyStep', 1);
                $cookieStore.remove('casusGuid');
            }
        }
        $scope.jumpToPage('join');
    };

    $scope.ceremony = function () {
        var ceremonyStep = $cookieStore.get('ceremonyStep');
        if (ceremonyStep == 4 && $scope.user == null) {
            $cookieStore.put('ceremonyStep', 1);
        }
        $scope.jumpToPage('ceremony');
    };
});

// var domain = 'http://101.201.28.172:8080/rest';
var domain = 'http://localhost:8080';

var base = 'http://localhost:8000/';
var apiBase = 'http://localhost:8000';