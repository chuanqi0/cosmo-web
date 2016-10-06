app.controller('WorksController', function($scope, $cookies, awardList) {
    // 奖项ID
    $scope.awardId = $cookies.get('awardId') == null ? 0 : $cookies.get('awardId');

    $scope.awardList = JSON.parse(awardList);
    $scope.casusList = [];

    $scope.jumpToDetail = function ($index) {
        var casus = $scope.casusList[$index];
        $scope.jumpToPage('casus/' + casus.guid);
    };

    $scope.refreshCasusList = function ($awardId) {
        $scope.awardId = $awardId;
        $scope.putCookie('awardId', $awardId);
        $scope.getCasusList();
    };

    $scope.getCasusList = function () {
        var data = {
            "awardId": $scope.awardId
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/list',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.casusList = response.data;
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
        $scope.refreshLeftHeight();
    };

    $scope.refreshLeftHeight = function() {
    };
});
