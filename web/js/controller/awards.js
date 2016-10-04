app.controller('AwardsController', function($scope, $cookieStore) {
    // 典礼步骤
    $scope.awardsStep = $cookieStore.get('awardsStep') == null ? 1 : $cookieStore.get('awardsStep');

    $scope.jumpToStep = function(step) {
        $cookieStore.put('awardsStep', step);
        $scope.jumpToPage('awards');
    };

    $scope.refreshHeight = function() {
        var awardsHeight = 550;
        $('.fe-info-left').css('min-height', awardsHeight + 'px');
        $('.fe-info-right').css('min-height', awardsHeight + 'px');
        if ($scope.awardsStep == 1) {
            $('.fe-info-left').css('height', '822px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});
