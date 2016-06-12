// 实例化编辑器
var um = UM.getEditor('myEditor');
um.setWidth(758);
um.setHeight(650);

app.controller('ApplyController', ['$scope', '$cookieStore', function($scope, $cookieStore, $http) {
    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep');
    $scope.name = '';
    $scope.description = '';
    $scope.place = '';
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
    $scope.validator = false;

    $scope.refreshLeftHeight = function() {
        if ($scope.applyStep == 1) {
            var leftHeight = 772 + Math.ceil($scope.awardList.length / 2) * 55;
            $('.fe-apply-left').css('height', leftHeight + 'px');
        } else if ($scope.applyStep == 2) {
            $('.fe-apply-left').css('height', '912px');
        }
    };

    $scope.getAwardList = function() {
        $.ajax({
            url: '/api/fantastic/award/list',
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.awardList = response.data;
                    $scope.refreshLeftHeight();
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
    };

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

    $scope.checkFirstStep = function() {
        if ($scope.name == '') {
            alert("请输入案例名称");
            return false;
        } else if ($scope.description == '') {
            alert("请输入案例简介");
            return false;
        } else if ($scope.place == '') {
            alert("请输入案例场地");
            return false;
        } else {
            var hasAward = false;
            console.log($scope.awardList);
            for (var i = 0; i < $scope.awardList.length; i++) {
                if ($scope.awardList[i].apply == true) {
                    hasAward = true;
                    break;
                }
            }
            if (hasAward == false) {
                alert("请至少报名一个选送奖项");
                return false;
            }
        }
        return true;
    };

    $scope.checkSecondStep = function () {
        var content = UM.getEditor('myEditor').getContent();
        if (content.length < 200) {
            alert("案例图文必须超过200字");
            return false;
        }
        return true;
    };

    $scope.jumpToStep = function(step) {
        $scope.validator = false;
        var check = true;
        if ($scope.applyStep == 1 && step == 2) {
            check = $scope.checkFirstStep();
        } else if ($scope.applyStep == 2 && step == 3) {
            check = $scope.checkSecondStep();
        }
        if (check == true) {
            $scope.validator = false;
            $cookieStore.put('applyStep', step);
            $scope.applyStep = step;
            $scope.refreshLeftHeight();
        } else {
            $scope.validator = true;
        }
    };

    $scope.init = function($index) {
        $scope.getAwardList();
        $scope.getRegionList();
    }
}]);
