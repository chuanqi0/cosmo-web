app.controller('CeremonyController', function($scope, $cookies) {
    // 典礼步骤
    $scope.ceremonyStep = $cookies.get('ceremonyStep') == null ? 1 : $cookies.get('ceremonyStep');

    $scope.jumpToStep = function(step) {
        $scope.putCookie('ceremonyStep', step);
        $scope.jumpToPage('ceremony');
    };

    $scope.refreshHeight = function() {
        if ($scope.ceremonyStep == 1) {
            $('.fe-info-left').css('height', '583px');
        } else if ($scope.ceremonyStep == 2) {
            $('.fe-info-left').css('height', '808px');
        } else if ($scope.ceremonyStep == 3) {
            $('.fe-info-left').css('height', '794px');
        }
    };

    $scope.init = function () {
        $scope.refreshHeight();
    };
});

app.controller('CeremonyTicketController', function($scope, $cookies, cbwaUser, UtilService) {

    $scope.cbwaUser = JSON.parse(cbwaUser);
    $scope.ticket = null;

    $scope.name = $scope.cbwaUser.name;
    $scope.telephone = $scope.user.telephone;
    $scope.address = '';

    $scope.nameValid = true;
    $scope.telephoneValid = true;
    $scope.addressValid = true;

    $scope.jumpToStep = function(step) {
        $scope.putCookie('ceremonyStep', step);
        $scope.jumpToPage('ceremony');
    };

    $scope.refreshLeftHeight = function() {
        $('.fe-info-left').css('height', '657px');
    };

    $scope.checkTelephone = function () {
        if (!UtilService.checkTelephone($scope.telephone)) {
            $scope.telephoneValid = false;
        } else {
            $scope.telephoneValid = true;
        }
    };

    $scope.getTicketDetail = function () {
        var ticketGuid = $cookies.get('ticketGuid');
        if (ticketGuid != null && ticketGuid != '') {
            var data = {
                ticketGuid: ticketGuid
            };
            $.ajax({
                url: apiBase + '/api/cbwa/ticket/detail',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        $scope.ticket = response.data;
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

    $scope.checkName = function () {
        var reg = new RegExp("^[\u4e00-\u9fa5]{2,10}$");
        if (reg.test($scope.name)) {
            $scope.nameValid = true;
        } else {
            $scope.nameValid = false;
        }
    };

    $scope.checkAddress = function () {
        if ($scope.address != '') {
            $scope.addressValid = true;
        } else {
            $scope.addressValid = false;
        }
    };

    $scope.createTicket = function () {
        var data = {
            userUuid: $scope.user.uuid,
            ticketGuid: $scope.ticket == null ? '' : $scope.ticket.guid,
            name: $scope.name,
            telephone: $scope.telephone,
            address: $scope.address
        };
        $.ajax({
            url: apiBase + '/api/cbwa/ticket/create',
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.ticket = response.data;
                    $scope.putCookie('ticketGuid', response.data.guid);
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.ticketAndPay = function () {
        $scope.checkTelephone();
        $scope.checkName();
        $scope.checkAddress();
        if ($scope.telephoneValid && $scope.nameValid && $scope.addressValid) {
            $scope.createTicket();
            if ($scope.ticket != null) {
                $scope.pay();
            }
        }
    };

    $scope.pay = function () {
        if ($scope.ticket != null && $scope.user != null) {
            var data = {
                userUuid: $scope.user.uuid,
                targetUuid: $scope.ticket.guid,
                targetType: 99,
                totalFee: $scope.ticket.totalFee,
                subject: '全国婚礼作品大赛',
                body: '门票费: ¥' + $scope.ticket.totalFee,
                returnUrl: base + 'ceremony/success'
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

    $scope.init = function () {
        $scope.refreshLeftHeight();
        $scope.getTicketDetail();
        if ($scope.ticket != null) {
            $scope.name = $scope.ticket.name;
            $scope.telephone = $scope.ticket.telephone;
            $scope.address = $scope.ticket.address;
        }
    };
});
