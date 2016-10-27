app.controller('InfoController', function($scope, $cookies) {
    // 典礼步骤
    $scope.infoStep = $cookies.get('infoStep') == null ? 1 : $cookies.get('infoStep');

    $scope.jumpToStep = function(step) {
        $scope.putCookie('infoStep', step);
        $scope.jumpToPage('info');
    };

    $scope.refreshHeight = function() {
        if ($scope.infoStep == 1) {
            $('.fe-info-left').css('height', '766px');
        } else if ($scope.infoStep == 2) {
            $('.fe-info-left').css('height', '968px');
        } else if ($scope.infoStep == 4) {
            $('.fe-info-left').css('height', '818px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});
