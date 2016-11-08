app.controller('ConsultController', function($scope, $cookies, $uibModal, adminUserList) {
    // 典礼步骤
    var $ctrl = this;
    $scope.consultStep = $cookies.get('consultStep') == null ? 1 : $cookies.get('consultStep');
    $scope.consultLevel = 1;
    $scope.consultList = [];
    $scope.consultTypeList = ["", "(婚纱照)", "(场地)", "(策划)", "(旅拍)"];
    $scope.consultStatusList = [{key: 0, value: "非目标"}, {key: 1, value: "已定好"},
        {key: 2, value: "推荐失败"}, {key: 3, value: "推荐成功"}, {key: 4, value: "无法接通"},
        {key: 5, value: "跟进中"}, {key: 6, value: "等待处理"}, {key: 7, value: "推荐中"}];
    $scope.allConsultStatusList = [{key: -1, value: "全部"}, {key: 0, value: "非目标"}, {key: 1, value: "已定好"},
        {key: 2, value: "推荐失败"}, {key: 3, value: "推荐成功"}, {key: 4, value: "无法接通"},
        {key: 5, value: "跟进中"}, {key: 6, value: "等待处理"}, {key: 7, value: "推荐中"}];
    $scope.allConsultStatus = $scope.allConsultStatusList[0];

    $scope.adminUserList = JSON.parse(adminUserList);
    $scope.regionList = [];

    $scope.currentUser = null;

    $scope.changeAllConsultStatus = function () {
        $scope.getConsultList();
    };

    $scope.pageChanged = function () {
        if ($scope.pagination.currentPage == 1) {
            $scope.pagination.base = 0;
        }
        console.log($scope.pagination);
        $scope.getConsultList();
    };

    $scope.pagination = {
        totalElement: 0,
        currentPage: 1,
        base: 0,
        maxSize: 5
    };

    $scope.jumpToStep = function(step) {
        $scope.putCookie('consultStep', step);
        $scope.jumpToPage('consult');
    };

    $scope.refreshHeight = function() {
        if ($scope.consultStep == 1 || $scope.consultStep == 2) {
            $('.fe-consult-left').css('height', '729px');
            $('.fe-consult-right').css('height', '729px');
        }
    };

    $scope.getConsultList = function () {
        var data = {
            "userUuid": $scope.adminUser.userUuid,
            "page": $scope.pagination.currentPage,
            "base": $scope.pagination.base,
            "consultLevel": $scope.consultLevel,
            "status": $scope.allConsultStatus.key
        };
        $.ajax({
            url: domain + '/api/admin/user/consult/list/',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.consultList = response.dataList;
                    for (var i = 0; i < $scope.consultList.length; i++) {
                        var currentConsult = $scope.consultList[i];
                        currentConsult.consultStatusObject = $scope.consultStatusList[currentConsult.status];
                        if ($scope.consultLevel == 2) {
                            for (var j = 0; j < $scope.adminUserList.length; j++) {
                                if (currentConsult.adminUserId == $scope.adminUserList[j].userId) {
                                    currentConsult.adminUser = $scope.adminUserList[j];
                                }
                            }
                        }
                    }
                    $scope.pagination.totalElement = response.totalElement;
                    $scope.pagination.base = response.base;
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.changeConsultUser = function ($index) {
        var currentConsult = $scope.consultList[$index];
        var data = {
            "userUuid": $scope.adminUser.userUuid,
            "consultId": currentConsult.id,
            "consultAdminUserId": currentConsult.adminUser.userId,
            "consultRemarkList": currentConsult.remarkList,
            "consultStatus": currentConsult.status
        };
        $.ajax({
            url: domain + '/api/admin/user/consult/update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.consultList[$index].adminUserId = response.data.adminUserId;
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.changeConsultStatus = function ($index) {
        var currentConsult = $scope.consultList[$index];
        if (confirm("更改咨询状态?")) {
            var data = {
                "userUuid": $scope.adminUser.userUuid,
                "consultId": currentConsult.id,
                "consultAdminUserId": currentConsult.adminUserId,
                "consultRemarkList": currentConsult.remarkList,
                "consultStatus": currentConsult.consultStatusObject.key
            };
            $.ajax({
                url: domain + '/api/admin/user/consult/update/',
                type: 'POST',
                dataType: 'json',
                data: data,
                async: false,
                success: function (response) {
                    if (response.status == 0) {
                        currentConsult.status = response.data.status;
                    } else {
                        console.log(response.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        } else {
            currentConsult.consultStatusObject = $scope.consultStatusList[currentConsult.status];
        }
    };

    $scope.getUserDetail = function (userUuid) {
        var userDetail = null;
        if (userUuid != '') {
            var data = {
                "userUuid": userUuid
            };
            $.ajax({
                url: domain + '/api/user/detail/',
                type: 'POST',
                dataType: 'json',
                data: data,
                async: false,
                success: function (response) {
                    if (response.status == 0) {
                        userDetail = response.data;
                    } else {
                        console.log(response.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        }
        return userDetail;
    };

    $scope.open = function ($index) {
        var currentConsult = $scope.consultList[$index];
        $scope.currentUser = $scope.getUserDetail(currentConsult.userUuid);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'consult.detail.html',
            controller: 'ConsultDetailController',
            resolve: {
                adminUser: function () {
                    return $scope.adminUser;
                },
                currentUser: function () {
                    return $scope.currentUser;
                },
                currentConsult: function () {
                    return currentConsult;
                },
                regionList: function () {
                    return $scope.regionList;
                }
            }
        });
        modalInstance.result.then(
            function ($status) {
                console.log("Commit modal: " + $status);
            }, function ($reason) {
                console.log('Close modal at ' + new Date());
            }
        );
    };

    $scope.getRegionList = function() {
        $.ajax({
            url: apiBase + '/api/region/list',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.regionList = response.data;
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.initMine = function () {
        $scope.consultLevel = 1;
        $scope.getConsultList();
        $scope.getRegionList();
        $scope.refreshHeight();
    };

    $scope.initAll = function () {
        $scope.consultLevel = 2;
        $scope.getConsultList();
        $scope.getRegionList();
        $scope.refreshHeight();
    };
});

app.controller('ConsultDetailController', function($scope, $uibModalInstance, adminUser, currentUser, currentConsult, regionList) {

    $scope.currentUser = currentUser;
    $scope.keyList = ['姓名', '婚期', '意向', '预算', '偏好', '其它'];
    $scope.remarkList = JSON.parse(currentConsult.remarkList);
    $scope.province = '北京';
    $scope.city = '朝阳';
    if ($scope.remarkList.length > 0) {
        var regionArray = $scope.remarkList[0].value.split(' ');
        $scope.province = regionArray[0];
        $scope.city = regionArray[1];
        $scope.remarkList.splice(0, 1);
    }
    // 地区
    $scope.regionList = regionList;
    $scope.provinceList = [];
    for (var region in $scope.regionList) {
        $scope.provinceList.push(region);
    }
    $scope.cityList = $scope.regionList[$scope.province];
    $scope.region = '地区';

    $scope.changeProvince = function () {
        console.log($scope.province);
        $scope.cityList = $scope.regionList[$scope.province];
        $scope.city = $scope.cityList[0];
        $scope.$applyAsync();
    };

    $scope.commit = function () {
        var remarkArray = [{key: '地区', value: $scope.province + ' ' + $scope.city}];
        for (var i = 0; i < $scope.remarkList.length; i++) {
            var remark = {
                key: $scope.remarkList[i].key,
                value: $scope.remarkList[i].value
            };
            remarkArray.push(remark);
        }
        var data = {
            "userUuid": adminUser.userUuid,
            "consultId": currentConsult.id,
            "consultAdminUserId": currentConsult.adminUserId,
            "consultRemarkList": JSON.stringify(remarkArray),
            "consultStatus": currentConsult.status
        };
        $.ajax({
            url: domain + '/api/admin/user/consult/update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    currentConsult.remarkList = response.data.remarkList;
                    currentConsult.region = response.data.region;
                    $uibModalInstance.close(0);
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.close = function () {
        $uibModalInstance.dismiss();
    };

    $scope.addRemark = function () {
        $scope.remarkList.push({key: $scope.keyList[0], value: ''});
    };

    $scope.deleteRemark = function ($index) {
        $scope.remarkList.splice($index, 1);
    };
});
