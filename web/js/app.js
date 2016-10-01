var app = angular.module('app', ['ngCookies']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('BaseController', ['$scope', function($scope) {
    // 跳转页面
    $scope.jumpToPage = function (suffix) {
        window.location.href = suffix;
    };
}]);