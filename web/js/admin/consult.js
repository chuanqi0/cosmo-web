app.controller('ConsultController', function($scope, $cookies, adminUserList) {
    // 典礼步骤
    $scope.consultStep = $cookies.get('consultStep') == null ? 1 : $cookies.get('consultStep');
    $scope.consultLevel = 1;
    $scope.consultList = [];
    $scope.consultTypeList = ["", "(婚纱照)", "(场地)", "(策划)", "(旅拍)"];
    $scope.consultStatusList = [{key: 0, value: "非目标"}, {key: 1, value: "已定好"},
        {key: 2, value: "推荐失败"}, {key: 3, value: "推荐成功"}, {key: 4, value: "无法接通"},
        {key: 5, value: "跟进中"}, {key: 6, value: "等待处理"}, {key: 7, value: "推荐中"}];

    $scope.adminUserList = JSON.parse(adminUserList);

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
        if ($scope.consultStep == 1) {
            $('.fe-consult-left').css('height', '589px');
        } else {
            $('.fe-consult-left').css('height', '729px');
            $('.fe-consult-right').css('height', '729px');
        }
    };

    $scope.getConsultList = function () {
        var data = {
            "userUuid": $scope.adminUser.userUuid,
            "page": $scope.pagination.currentPage,
            "base": $scope.pagination.base,
            "consultLevel": $scope.consultLevel
        };
        $.ajax({
            url: domain + '/api/admin/user/consult/list',
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
            "consultAdminUserId": currentConsult.adminUser.userId
        };
        $.ajax({
            url: domain + '/api/admin/user/consult/user',
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
                "consultStatus": currentConsult.consultStatusObject.key
            };
            console.log(data);
            $.ajax({
                url: domain + '/api/admin/user/consult/status',
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

    $scope.initMine = function () {
        $scope.consultLevel = 1;
        $scope.getConsultList();
        $scope.refreshHeight();
    };

    $scope.initAll = function () {
        $scope.consultLevel = 2;
        $scope.getConsultList();
        $scope.refreshHeight();
    };
});
