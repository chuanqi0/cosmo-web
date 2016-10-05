app.controller('PersonalController', function($scope, $cookies, cbwaUser) {

    // 数据
    $scope.cbwaUser = JSON.parse(cbwaUser);
    $scope.telephone = $scope.user.telephone;
    $scope.name = $scope.cbwaUser.name;
    $scope.identityCard = $scope.cbwaUser.identityCard;
    $scope.wechat = $scope.cbwaUser.wechat;
    $scope.company = $scope.cbwaUser.company;
    $scope.companyLocation = $scope.cbwaUser.companyLocation;
    $scope.companyIntro = $scope.cbwaUser.companyIntro;

    $scope.wechatValid = true;

    $scope.checkWechat = function () {
        if ($scope.wechat == '') {
            $scope.wechatValid = false;
        } else {
            $scope.wechatValid = true;
        }
    };

    $scope.save = function () {
        $scope.checkWechat();
        if ($scope.wechatValid == true && $scope.user != null) {
            var data = {
                "userUuid": $scope.user.uuid,
                "name": $scope.name,
                "identityCard": $scope.identityCard,
                "wechat": $scope.wechat,
                "company": $scope.company,
                "companyLocation": $scope.companyLocation,
                "companyIntro": $scope.companyIntro
            };
            $.ajax({
                url: domain + '/api/user/cbwa/',
                type: 'POST',
                dataType: 'json',
                data: data,
                async: false,
                success: function (response) {
                    if (response.status == 0) {
                        alert("保存修改成功");
                    } else {
                        alert(response.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        }
    };

    $scope.jumpToStep = function(step) {
        $scope.putCookie('personalStep', step);
        $scope.jumpToPage('personal');
    };
});

app.controller('PersonalCasusController', function($scope, $cookies) {

    $scope.casusOrderList = [];

    $scope.jumpToStep = function(step) {
        $scope.putCookie('personalStep', step);
        $scope.jumpToPage('personal');
    };

    $scope.openOrder = function ($index) {
        var currentOrder = $scope.casusOrderList[$index];
        var valid = currentOrder.valid;
        var paid = currentOrder.paid;
        if (valid == true && paid == false) {
            var casusGuid = currentOrder.guid;
            $scope.putCookie('applyStep', 1);
            $scope.putCookie('casusGuid', casusGuid);
            $scope.jumpToPage('join');
        } else if (valid == true && paid == true) {

        } else {
            alert("订单已取消");
        }
    };

    $scope.cancelOrder = function ($index) {
        var currentOrder = $scope.casusOrderList[$index];
        var valid = currentOrder.valid;
        var paid = currentOrder.paid;
        if (valid == true && paid == false) {
            var casusGuid = currentOrder.guid;
            var data = {
                casusGuid: casusGuid
            };
            $.ajax({
                url: apiBase + '/api/cbwa/casus/cancel',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        alert("参赛案例取消成功");
                        $scope.casusOrderList[$index] = response.data;
                    } else {
                        alert(response.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.error(err);
                }
            });
        }
    };

    $scope.getPersonalCasusList = function() {
        var data = {
            "userUuid": $scope.user.uuid
        };
        $.ajax({
            url: apiBase + '/api/cbwa/casus/personal',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    console.log(response.data);
                    $scope.casusOrderList = response.data;
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.refreshHeight = function() {
        var j = 0;
        for (var i = 0; i < $scope.casusOrderList.length; i++) {
            j += $scope.casusOrderList[i].awardList.length;
        }
        var personalHeight = 110 + 180 * $scope.casusOrderList.length + 25 * j;
        personalHeight = personalHeight > 550 ? personalHeight : 550;
        $('.fe-personal-left').css('height', personalHeight + 'px');
        $('.fe-personal-right').css('height', personalHeight + 'px');
    };

    $scope.init = function () {
        $scope.getPersonalCasusList();
        $scope.refreshHeight();
    };
});
