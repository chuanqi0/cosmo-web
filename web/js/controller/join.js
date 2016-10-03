// 实例化编辑器
var um = UM.getEditor('myEditor');
um.setWidth(758);
um.setHeight(650);

app.controller('JoinController', function($scope, $cookieStore, awardList) {

    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep') == null ? 1 : $cookieStore.get('applyStep');
    $scope.casus = $cookieStore.get('casus');
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

    // 验证
    $scope.titleValid = true;
    $scope.descriptionValid = true;
    $scope.placeValid = true;
    $scope.awardValid = true;

    console.log($scope.casus);

    $scope.refreshLeftHeight = function() {
        if ($scope.applyStep == 1) {
            var leftHeight = 782 + Math.ceil($scope.awardList.length / 2) * 55;
            $('.fe-apply-left').css('height', leftHeight + 'px');
        } else if ($scope.applyStep == 2) {
            $('.fe-apply-left').css('height', '912px');
        }
    };

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
        if ($scope.awardList.length > index) {
            $scope.awardList[index].apply = !$scope.awardList[index].apply;
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
        if ($scope.titleValid && $scope.descriptionValid && $scope.placeValid && $scope.awardValid) {
            return $scope.publishCasus();
        } else {
            return false;
        }
    };

    $scope.processSecondStep = function (step) {
        var content = UM.getEditor('myEditor').getContent();
        if ($scope.applyStep == 2 && step == 3) {
            if (content.length < 200) {
                alert("案例图文必须超过200字");
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

    $scope.getContent = function () {
        if ($scope.casus != null) {
            var data = {
                casusGuid: $scope.casus.guid
            };
            $.ajax({
                url: apiBase + '/api/cbwa/casus/detail',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        um.setContent(response.data.content);
                    } else {
                        console.log(response.message);
                    }
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
                    $scope.casus = response.data;
                    $cookieStore.put('casus', response.data);
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

    $scope.jumpToStep = function(step) {
        var stepSuccess = true;
        if ($scope.applyStep == 1) {
            stepSuccess = $scope.processFirstStep();
        } else if ($scope.applyStep == 2) {
            stepSuccess = $scope.processSecondStep(step);
        }
        if (stepSuccess == true) {
            $cookieStore.put('applyStep', step);
            $scope.jumpToPage('join');
        }
    };

    $scope.init = function() {
        $scope.refreshLeftHeight();
        if ($scope.applyStep == 1) {
            $scope.getRegionList();
            $scope.refreshAwardList();
        } else if ($scope.applyStep == 2) {
            $scope.getContent();
        }
    }
});
