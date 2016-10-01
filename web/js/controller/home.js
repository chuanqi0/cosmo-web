app.controller('HomeController', function($scope, $cookieStore, judgeList) {
    // 评委列表
    $scope.judgeList = JSON.parse(judgeList);
});
