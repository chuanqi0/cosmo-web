app.controller('CeremonyController', function($scope, $cookieStore) {
    // 典礼步骤
    $scope.ceremonyStep = $cookieStore.get('ceremonyStep') == null ? 1 : $cookieStore.get('ceremonyStep');

    $scope.jumpToStep = function(step) {
        $cookieStore.put('ceremonyStep', step);
        $scope.jumpToPage('ceremony');
    };
});
