app.controller('JoinSuccessController', function($scope, $cookies, $interval) {

    $scope.success = false;

    $scope.casus = null;

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
        }
    };

    $scope.init = function () {
        // var timer = $interval(function () {
        //     $scope.getCasusDetail();
        //     if ($scope.casus != null) {
        //         if ($scope.casus.paid == true) {
        //             $scope.success = true;
        //             $scope.putCookie('applyStep', 1);
        //             console.log("Remove Before: " + $cookies.get('casusGuid'));
        //             $cookies.remove('casusGuid');
        //             console.log("Remove After: " + $cookies.get('casusGuid'));
        //             console.log("订单状态: 已支付");
        //             $interval.cancel(timer);
        //         } else {
        //             console.log("订单状态: 未支付");
        //         }
        //     }
        // }, 2000);

        $scope.success = true;
        $scope.putCookie('applyStep', 1);
        console.log("Remove Before: " + $cookies.get('casusGuid'));
        $scope.removeCookie('casusGuid');
        console.log("Remove After: " + $cookies.get('casusGuid'));
    };
});
