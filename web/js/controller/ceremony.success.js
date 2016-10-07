app.controller('CeremonySuccessController', function($scope, $cookies, $interval) {

    $scope.success = false;

    $scope.ticket = null;

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

    $scope.init = function () {
        var timer = $interval(function () {
            $scope.getTicketDetail();
            if ($scope.ticket != null) {
                if ($scope.ticket.paid == true) {
                    $scope.success = true;
                    console.log("Remove Before: " + $cookies.get('ticketGuid'));
                    $scope.removeCookie('ticketGuid');
                    console.log("Remove After: " + $cookies.get('ticketGuid'));
                    console.log("订单状态: 已支付");
                    $interval.cancel(timer);
                } else {
                    console.log("订单状态: 未支付");
                }
            }
        }, 2000);
    };

    $scope.jumpToStep = function(step) {
        $scope.putCookie('ceremonyStep', step);
        $scope.jumpToPage('ceremony');
    };
});
