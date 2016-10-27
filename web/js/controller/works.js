app.controller('WorksController', function($scope, $cookies, awardList) {
    // 奖项ID
    $scope.awardId = $cookies.get('awardId') == null ? 0 : $cookies.get('awardId');
    $scope.page = 1;
    $scope.showMore = true;

    $scope.awardList = JSON.parse(awardList);
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
        $scope.refreshLeftHeight();
    };

    $scope.refreshLeftHeight = function() {
        var worksHeight = 0;
        if ($scope.showMore == true) {
            worksHeight = 175 + Math.ceil($scope.casusList.length / 3) * 256;
        } else {
            worksHeight = 110 + Math.ceil($scope.casusList.length / 3) * 256;
        }
        worksHeight = worksHeight > 550 ? worksHeight : 550;
        $('.fe-info-left').css('height', worksHeight + 'px');
    };
});
