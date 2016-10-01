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
});

// var domain = 'http://101.201.28.172:8080/rest';
var domain = 'http://localhost:8080';

var base = 'http://localhost:8000/';