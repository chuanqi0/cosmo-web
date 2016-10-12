app.controller('HomeController', function($scope, judgeList) {

    // 评委列表
    $scope.judgeListSrc = JSON.parse(judgeList);
    $scope.judgeList = [];
    var judgeLength = $scope.judgeListSrc.length;
    for (var i = 0; i < judgeLength; i += 6) {
        var judgeRow = [];
        judgeRow.push($scope.judgeListSrc[i]);
        if (i + 1 < judgeLength) {
            judgeRow.push($scope.judgeListSrc[i + 1]);
        }
        if (i + 2 < judgeLength) {
            judgeRow.push($scope.judgeListSrc[i + 2]);
        }
        if (i + 3 < judgeLength) {
            judgeRow.push($scope.judgeListSrc[i + 3]);
        }
        if (i + 4 < judgeLength) {
            judgeRow.push($scope.judgeListSrc[i + 4]);
        }
        if (i + 5 < judgeLength) {
            judgeRow.push($scope.judgeListSrc[i + 5]);
        }
        $scope.judgeList.push(judgeRow);
    }

    $scope.jumpToWorks = function ($awardId) {
        $scope.putCookie('awardId', $awardId);
        $scope.jumpToPage('works');
    };
});
