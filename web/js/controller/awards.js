app.controller('AwardsController', function($scope, $cookies) {
    // 典礼步骤
    $scope.awardsStep = $cookies.get('awardsStep') == null ? 1 : $cookies.get('awardsStep');

    $scope.jumpToStep = function(step) {
        $scope.putCookie('awardsStep', step);
        $scope.jumpToPage('awards');
    };

    $scope.refreshHeight = function() {
        if ($scope.awardsStep == 1) {
            $('.fe-info-left').css('height', '822px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});
