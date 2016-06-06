// 实例化编辑器
var um = UM.getEditor('fe-editor');

app.controller('ApplyController', ['$scope', '$cookieStore', function($scope, $cookieStore, $http) {
    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep');
    // 价格
    $scope.priceList = ['5万以下', '5~10万', '10~20万', '20~50万', '50万以上'];
    $scope.price = '5万以下';
    // 地区
    $scope.regionList = [];
    $scope.provinceList = [];
    $scope.province = '北京';
    $scope.cityList = [];
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
                    var leftHeight = 772 + Math.ceil($scope.awardList.length / 2) * 55;
                    $('.fe-apply-left').css('height', leftHeight + 'px');
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.changeProvince = function () {
        $scope.cityList = $scope.regionList[$scope.province];
        $scope.city = $scope.cityList[0];
    },

    $scope.getRegionList = function() {
        $.ajax({
            url: '/api/region/list',
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.regionList = response.data;
                    for (var region in $scope.regionList) {
                        $scope.provinceList.push(region);
                    }
                    $scope.cityList = $scope.regionList[$scope.province];
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.applyAward = function(index) {
        if ($scope.awardList.length > index) {
            $scope.awardList[index].apply = !$scope.awardList[index].apply;
        }
    };

    $scope.jumpToStep = function(step) {
        $cookieStore.put('applyStep', step);
        $scope.applyStep = step;
    };

    $scope.init = function($index) {
        $scope.getAwardList();
        $scope.getRegionList();
    }
}]);
