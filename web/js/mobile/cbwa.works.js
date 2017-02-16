app.controller('WorksController', function($scope, $cookies) {
    // 奖项ID
    $scope.page = 1;
    $scope.showMore = true;

    $scope.casusList = [];

    $scope.jumpToDetail = function ($index) {
        var casus = $scope.casusList[$index];
        $scope.jumpToPage('cbwa/casus/' + casus.guid);
    };

    $scope.refreshCasusList = function ($awardId) {
        $scope.page = 1;
        $scope.showMore = true;
        $scope.awardId = $awardId;
        $scope.putCookie('awardId', $awardId);
        $scope.getCasusList();
    };

    $scope.vote = function($index) {
        alert("投票已截止，请关注接下来的婚尚盛典暨颁奖典礼哦～");
	return;
        var casus = $scope.casusList[$index];
        // 查看所有的奖项
        var data = {
            "casusGuid": casus.guid
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/vote',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    alert("感谢您为" + casus.name + "\n投出了宝贵的一票");
                    $scope.casusList[$index].voteNumber++;
                } else {
                    alert("一天最多只能给每个案例投5票");
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.about = function() {
        window.location.href = apiBase + "/cbwa/";
    };

    $scope.getCasusList = function () {
        // 查看所有的奖项
        var data = {
            "awardId": 0,
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
