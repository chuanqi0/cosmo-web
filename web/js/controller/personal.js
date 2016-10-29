app.controller('PersonalController', function($scope, cbwaUser) {

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

app.controller('PersonalCasusController', function($scope, cbwaUser) {

    // 数据
    $scope.cbwaUser = JSON.parse(cbwaUser);
    $scope.casusOrderList = [];

    $scope.jumpToStep = function(step) {
        $scope.putCookie('personalStep', step);
        $scope.jumpToPage('personal');
    };

    $scope.openOrder = function ($index) {
        var currentOrder = $scope.casusOrderList[$index];
        var valid = currentOrder.valid;
        var paid = currentOrder.paid;
        if ($scope.cbwaUser.level != 0 || (valid == true && paid == false)) {
            var casusGuid = currentOrder.guid;
            $scope.putCookie('applyStep', 1);
            $scope.putCookie('casusGuid', casusGuid);
            $scope.jumpToPage('join');
        } else if (valid == true && paid == true) {
            var casusGuid = currentOrder.guid;
            $scope.jumpToPage('casus/' + casusGuid);
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

    $scope.init = function () {
        $scope.getPersonalCasusList();
    };
});

app.controller('PersonalTicketController', function($scope) {

    $scope.ticketOrderList = [];

    $scope.jumpToStep = function(step) {
        $scope.putCookie('personalStep', step);
        $scope.jumpToPage('personal');
    };

    $scope.openOrder = function ($index) {
        var currentOrder = $scope.ticketOrderList[$index];
        var valid = currentOrder.valid;
        var paid = currentOrder.paid;
        if (valid == true && paid == false) {
            var ticketGuid = currentOrder.guid;
            $scope.putCookie('ceremonyStep', 4);
            $scope.putCookie('ticketGuid', ticketGuid);
            $scope.jumpToPage('ceremony');
        } else if (valid == true && paid == true) {
            alert("实体门票将尽快邮寄给您");
        } else {
            alert("订单已取消");
        }
    };

    $scope.cancelOrder = function ($index) {
        var ticketOrder = $scope.ticketOrderList[$index];
        var valid = ticketOrder.valid;
        var paid = ticketOrder.paid;
        if (valid == true && paid == false) {
            var ticketGuid = ticketOrder.guid;
            var data = {
                ticketGuid: ticketGuid
            };
            $.ajax({
                url: apiBase + '/api/cbwa/ticket/cancel',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        alert("典礼门票取消成功");
                        $scope.ticketOrderList[$index] = response.data;
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

    $scope.getPersonalTicketList = function() {
        var data = {
            "userUuid": $scope.user.uuid
        };
        $.ajax({
            url: apiBase + '/api/cbwa/ticket/personal',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    console.log(response.data);
                    $scope.ticketOrderList = response.data;
                    $scope.$applyAsync();
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.init = function () {
        $scope.getPersonalTicketList();
    };
});
