app.controller('InfoController', function($scope, $cookieStore) {
    // 典礼步骤
    $scope.infoStep = $cookieStore.get('infoStep') == null ? 1 : $cookieStore.get('infoStep');

    $scope.jumpToStep = function(step) {
        $cookieStore.put('infoStep', step);
        $scope.jumpToPage('info');
    };

    $scope.refreshHeight = function() {
        var infoHeight = 550;
        $('.fe-info-left').css('min-height', infoHeight + 'px');
        $('.fe-info-right').css('min-height', infoHeight + 'px');
        if ($scope.infoStep == 1) {
            $('.fe-info-left').css('height', '1046px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});
