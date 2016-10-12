app.controller('CasusController', function($scope, $sce, casus, cbwaUser) {

    // 案例
    $scope.casus = JSON.parse(casus);
    $scope.cbwaUser = JSON.parse(cbwaUser);

    $scope.contentHtml = $sce.trustAsHtml($scope.casus.content);
});
