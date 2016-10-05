app.controller('CeremonyController', function($scope, $cookies) {
    // 典礼步骤
    $scope.ceremonyStep = $cookies.get('ceremonyStep') == null ? 1 : $cookies.get('ceremonyStep');

    $scope.jumpToStep = function(step) {
        $scope.putCookie('ceremonyStep', step);
        $scope.jumpToPage('ceremony')
    };

    $scope.refreshHeight = function() {
        if ($scope.ceremonyStep == 1) {
            $('.fe-info-left').css('height', '618px');
        } else if ($scope.ceremonyStep == 2) {
            $('.fe-info-left').css('height', '808px');
        } else if ($scope.ceremonyStep == 3) {
            $('.fe-info-left').css('height', '794px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});
