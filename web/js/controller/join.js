// 实例化编辑器
var um = UM.getEditor('myEditor');
um.setWidth(758);
um.setHeight(650);

app.controller('JoinController', function($scope, $cookies, awardList, cbwaUser) {

    // 申请步骤
    $scope.applyStep = $cookies.get('applyStep') == null ? 1 : $cookies.get('applyStep');
    $scope.casus = null;
    $scope.title = $scope.casus == null ? '' : $scope.casus.title;
    $scope.description = $scope.casus == null ? '' : $scope.casus.description;
    $scope.place = $scope.casus == null ? '' : $scope.casus.place;
    // 价格
    $scope.priceList = ['5万以下', '5~10万', '10~20万', '20~50万', '50万以上'];
    $scope.price = $scope.casus == null ? $scope.priceList[0] : $scope.casus.price;
    // 地区
    $scope.regionList = [];
    $scope.provinceList = [];
    $scope.province = '北京';
    $scope.cityList = [];
    $scope.city = '朝阳';
    $scope.awardList = JSON.parse(awardList);
    $scope.cbwaUser = JSON.parse(cbwaUser);

    // 验证
    $scope.titleValid = true;
    $scope.descriptionValid = true;
    $scope.placeValid = true;
    $scope.awardValid = true;

    $scope.changeProvince = function () {
        $scope.cityList = $scope.regionList[$scope.province];
        $scope.city = $scope.cityList[0];
    };

    $scope.getRegionList = function() {
        $.ajax({
            url: apiBase + '/api/region/list',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.regionList = response.data;
                    for (var region in $scope.regionList) {
                        $scope.provinceList.push(region);
                    }
                    if ($scope.casus != null) {
                        var regionArray = $scope.casus.region.split(' ');
                        $scope.province = regionArray[0];
                        $scope.city = regionArray[1];
                    }
                    $scope.cityList = $scope.regionList[$scope.province];
                    $scope.$applyAsync();
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
        if ($scope.casus != null && $scope.casus.paid == true) {
            alert("案例已支付，不可修改选送奖项");
        } else {
            if ($scope.awardList.length > index) {
                $scope.awardList[index].apply = !$scope.awardList[index].apply;
            }
        }
    };

    $scope.refreshAwardList = function () {
        if ($scope.casus != null) {
            for (var i = 0; i < $scope.casus.awardList.length; i++) {
                var awardId = $scope.casus.awardList[i].id;
                for (var j = 0; j < $scope.awardList.length; j++) {
                    if ($scope.awardList[j].id == awardId) {
                        $scope.awardList[j].apply = 1;
                    }
                }
            }
        }
    };

    $scope.processFirstStep = function() {
        if ($scope.title == '') {
            $scope.titleValid = false;
        } else {
            $scope.titleValid = true;
        }
        if ($scope.description == '') {
            $scope.descriptionValid = false;
        } else {
            $scope.descriptionValid = true;
        }
        if ($scope.place == '') {
            $scope.placeValid = false;
        } else {
            $scope.placeValid = true;
        }
        if ($scope.cbwaUser.level == 0) {
            $scope.awardValid = false;
            for (var i = 0; i < $scope.awardList.length; i++) {
                if ($scope.awardList[i].apply == true) {
                    $scope.awardValid = true;
                    break;
                }
            }
            if ($scope.awardValid == false) {
                alert("请至少报名一个选送奖项");
            }
        }
        if ($scope.titleValid && $scope.descriptionValid && $scope.placeValid && $scope.awardValid) {
            return $scope.publishCasus();
        } else {
            return false;
        }
    };

    $scope.processSecondStep = function () {
        var content = UM.getEditor('myEditor').getContent();
        if (content.length < 200) {
            alert("案例图文必须超过200个字符");
            return false;
        } else {
            if (content.indexOf('src=', 0) == -1) {
                alert("案例必须上传图片");
                return false;
            }
        }
        return $scope.extraCasus(content);
    };

    $scope.extraCasus = function ($content) {
        var success = false;
        var data = {
            casusGuid: $scope.casus == null ? '' : $scope.casus.guid,
            content: $content
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/extra',
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    success = true;
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
        return success;
    };

    $scope.getCasusDetail = function () {
        var casusGuid = $cookies.get('casusGuid');
        if (casusGuid != null && casusGuid != '') {
            var data = {
                casusGuid: casusGuid
            };
            $.ajax({
                url: apiBase + '/api/cbwa/casus/detail',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        $scope.casus = response.data;
                    } else {
                        console.log(response.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        } else {
            $scope.applyStep = 1;
        }
    };

    $scope.pay = function () {
        if ($scope.casus != null && $scope.user != null) {
            var data = {
                userUuid: $scope.user.uuid,
                targetUuid: $scope.casus.guid,
                targetType: 100,
                totalFee: $scope.casus.totalFee,
                subject: '全国婚礼作品大赛',
                body: '参赛费: ¥' + $scope.casus.totalFee,
                returnUrl: base + 'join/success'
            };
            $.ajax({
                url: domain + '/api/pay/alipay/instant',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'html',
                success: function (response) {
                    $('#pay-btn').append(response);
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        }
    };

    $scope.publishCasus = function () {
        var success = false;
        var applyAwardList = [];
        for (var i = 0; i < $scope.awardList.length; i++) {
            var award = $scope.awardList[i];
            if (award.apply == true) {
                var awardMini = {
                    "id": award.id,
                    "name": award.name,
                    "fee": award.fee
                };
                applyAwardList.push(awardMini);
            }
        }
        var data = {
            userUuid: $scope.user.uuid,
            casusGuid: $scope.casus == null ? '' : $scope.casus.guid,
            title: $scope.title,
            description: $scope.description,
            place: $scope.place,
            price: $scope.price,
            region: $scope.province + ' ' + $scope.city,
            awardList: JSON.stringify(applyAwardList)
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/publish',
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    success = true;
                    $scope.putCookie('casusGuid', response.data.guid);
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
        return success;
    };

    $scope.jumpToStep = function(step) {
        var stepSuccess = true;
        if ($scope.applyStep == 1) {
            stepSuccess = $scope.processFirstStep();
        } else if ($scope.applyStep == 2) {
            stepSuccess = $scope.processSecondStep();
        }
        if (stepSuccess == true) {
            $scope.putCookie('applyStep', step);
            $scope.jumpToPage('join');
        } else {
            alert("保存案例失败");
        }
    };

    $scope.jumpToSuccess = function() {
        var stepSuccess = $scope.processSecondStep();
        if (stepSuccess == true) {
            $scope.jumpToPage('join/success');
        } else {
            alert("保存案例失败");
        }
    };

    $scope.init = function() {
        $scope.getCasusDetail();
        if ($scope.applyStep == 1) {
            $scope.getRegionList();
            $scope.refreshAwardList();
            if ($scope.casus != null) {
                $scope.title = $scope.casus.title;
                $scope.description = $scope.casus.description;
                $scope.place = $scope.casus.place;
                $scope.price = $scope.casus.price;
            }
        } else if ($scope.applyStep == 2) {
            if ($scope.casus != null) {
                um.setContent($scope.casus.content);
            }
        }
    }
});
