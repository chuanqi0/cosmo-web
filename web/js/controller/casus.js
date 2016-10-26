app.controller('CasusController', function($scope, $sce, casus, cbwaUser) {

    // 案例
    $scope.casus = JSON.parse(casus);
    $scope.casusBg = "http://cosmolove.image.alimmdn.com/cbwa/bg/casus_bg_" + $scope.casus.id % 10 + ".jpg";
    $scope.cbwaUser = JSON.parse(cbwaUser);

    $scope.contentHtml = $sce.trustAsHtml($scope.casus.content);
});
