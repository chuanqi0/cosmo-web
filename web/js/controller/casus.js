app.controller('CasusController', function($scope, $sce, casus, cbwaUser) {

    // 案例
    $scope.casus = JSON.parse(casus);
    $scope.casusBg = "http://cosmolove.image.alimmdn.com/cbwa/bg/casus_bg_" + $scope.casus.id % 10 + ".jpg";
    $scope.cbwaUser = JSON.parse(cbwaUser);

    $scope.contentHtml = $sce.trustAsHtml($scope.casus.content);

    $scope.vote = function() {
	alert("投票已截止，请关注接下来的婚尚盛典暨颁奖典礼哦～");
	return;
        // 查看所有的奖项
        var data = {
            "casusGuid": $scope.casus.guid
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/vote',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    alert("感谢您为" + $scope.casus.name + "\n投出了宝贵的一票");
                    $scope.casus.voteNumber++;
                } else {
                    alert("一天最多只能给每个案例投5票");
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };
});
