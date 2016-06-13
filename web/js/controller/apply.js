// 实例化编辑器
var um = UM.getEditor('myEditor');
um.setWidth(758);
um.setHeight(650);

app.controller('ApplyController', ['$scope', '$cookieStore', function($scope, $cookieStore, $http) {
    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep');
    $scope.casusGuid = $cookieStore.get('casusGuid') == null ? '' : $cookieStore.get('casusGuid');
    $scope.title = '';
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

    $scope.publishCasus = function () {
        var applyAwardList = [];
        for (var i = 0; i < $scope.awardList.length; i++) {
            var award = $scope.awardList[i];
            if (award.apply == true) {
                applyAwardList.push(award.id);
            }
        }
        var data = {
            userGuid: '41B41492-E718-C839-9C4F-8D20E2F1A877',
            casusGuid: $scope.casusGuid,
            title: $scope.title,
            description: $scope.description,
            place: $scope.place,
            price: $scope.price,
            region: $scope.province + ' ' + $scope.city,
            awardList: JSON.stringify(applyAwardList)
        };
        $.ajax({
            url: '/api/fantastic/casus/publish',
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.casusGuid = response.data.guid;
                    $cookieStore.put('casusGuid', $scope.casusGuid);
                } else {
                    console.log(response.message);
                    if ($scope.casusGuid == '') {
                        alert("案例发布失败");
                    } else {
                        alert("案例更新失败");
                    }
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
                if ($scope.casusGuid == '') {
                    alert("案例发布失败");
                } else {
                    alert("案例更新失败");
                }
            }
        });
    };

    $scope.getCasusDetail = function() {
        var data = {
            casusGuid: $scope.casusGuid
        };
        $.ajax({
            url: '/api/fantastic/casus/detail',
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.title = response.data.title;
                    $scope.description = response.data.description;
                    $scope.price = response.data.price;
                    var regionArray = response.data.region.split(' ');
                    $scope.province = regionArray[0];
                    $scope.cityList = $scope.regionList[$scope.province];
                    $scope.city = regionArray[1];
                    $scope.place = response.data.place;
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
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
            if ($scope.applyStep == 1 && step == 2) {
                $scope.publishCasus();
            }
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
        if ($scope.casusGuid != '') {
            $scope.getCasusDetail();
        }
    }
}]);
