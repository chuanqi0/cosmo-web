app.controller('WorksController', function($scope, awardList) {
    // 奖项ID
    $scope.awardId = 0;

    $scope.awardList = JSON.parse(awardList);
    $scope.casusList = [];

    $scope.jumpToDetail = function ($index) {
        var casus = $scope.casusList[$index];
        $scope.jumpToPage('casus/' + casus.guid);
    };

    $scope.getCasusList = function ($awardId) {
        var data = {
            "awardId": $awardId
        };
        $scope.awardId = $awardId;
        $.ajax({
            url: apiBase + '/api/cbwa/casus/list',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.casusList = response.data;
                    console.log($scope.casusList);
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
