app.controller('WorksController', function($scope, $cookies) {
    // 奖项ID
    $scope.awardId = $cookies.get('awardId') == null ? 1 : $cookies.get('awardId');
    $scope.page = 1;
    $scope.showMore = true;

    $scope.casusList = [];

    $scope.jumpToDetail = function ($index) {
        var casus = $scope.casusList[$index];
        $scope.jumpToPage('casus/' + casus.guid);
    };

    $scope.refreshCasusList = function ($awardId) {
        $scope.page = 1;
        $scope.showMore = true;
        $scope.awardId = $awardId;
        $scope.putCookie('awardId', $awardId);
        $scope.getCasusList();
    };

    $scope.getCasusList = function () {
        var data = {
            "awardId": $scope.awardId,
            "page": $scope.page
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/list',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                console.log(response);
                if (response.status == 0) {
                    if ($scope.page == 1) {
                        $scope.casusList = [];
                    }
                    for (var i = 0 ; i < response.data.length; i++) {
                        $scope.casusList.push(response.data[i]);
                    }
                    console.log(response.totalPage);
                    if ($scope.page < response.totalPage) {
                        $scope.page++;
                    } else {
                        $scope.showMore = false;
                    }
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };
});
