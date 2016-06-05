// 实例化编辑器
var um = UM.getEditor('fe-editor');

app.controller('ApplyController', ['$scope', '$cookieStore', function($scope, $cookieStore, $http) {
    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep');
    // 价格
    $scope.priceList = ['5万以下', '5~10万', '10~20万', '20~50万', '50万以上'];
    $scope.price = '5万以下';
    // 地区
    $scope.provinceList = ['北京', '上海'];
    $scope.province = '北京';
    $scope.cityList = ['朝阳', '海淀'];
    $scope.city = '朝阳';
    $scope.awardList = [];

    $scope.getAwardList = function() {
        $.ajax({
            url: '/api/fantastic/award/list',
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.awardList = response.data;
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.applyAward = function($index) {
        if ($scope.awardList.length > $index) {
            $scope.awardList[$index].apply = !$scope.awardList[$index].apply;
        }
    };

    $scope.$watch('feApplyRightFinished', function (feApplyRightFinishedEvent) {
        console.log($scope.awardList.length);
    });

    $scope.init = function($index) {
        $scope.getAwardList();
    }
}]);

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('feApplyRightFinished');
                });
            }
        }
    };
});
