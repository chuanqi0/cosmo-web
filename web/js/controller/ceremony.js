app.controller('CeremonyController', function($scope, $cookieStore) {
    // 典礼步骤
    $scope.ceremonyStep = $cookieStore.get('ceremonyStep') == null ? 1 : $cookieStore.get('ceremonyStep');

    $scope.jumpToStep = function(step) {
        $cookieStore.put('ceremonyStep', step);
        $scope.jumpToPage('ceremony')
    };

    $scope.refreshHeight = function() {
        var ceremonyHeight = 550;
        $('.fe-info-left').css('min-height', ceremonyHeight + 'px');
        $('.fe-info-right').css('min-height', ceremonyHeight + 'px');
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
