app.controller('ConsultController', function($scope, UtilService) {

    $scope.cover = '';

    $scope.consultType = 1;

    $scope.telephone = '';
    $scope.telephoneValid = true;

    $scope.getConsultCover = function() {
        $.ajax({
            url: domain + '/api/home/consult/cover',
            type: 'POST',
            async: false,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.cover = response.data;
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.selectType = function ($type) {
        $scope.consultType = $type;
    };

    $scope.checkTelephone = function () {
        if (!UtilService.checkTelephone($scope.telephone)) {
            $scope.telephoneValid = false;
        } else {
            $scope.telephoneValid = true;
        }
    };

    $scope.consult = function () {
        $scope.checkTelephone();
        if ($scope.telephoneValid == true) {
            var data = {
                "telephone": $scope.telephone,
                "consultType": $scope.consultType
            };
            $.ajax({
                url: domain + '/api/user/consult',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        alert("预约成功, 专属客服会尽快联系您哦~");
                    } else {
                        console.log(response.message);
                    }
                },
                error: function(xhr, status, err) {
                    console.error(err);
                }
            });
        } else {
            alert("手机号格式不正确哦~");
        }
    };

    $scope.init = function () {
        $scope.getConsultCover();
        var height = window.innerHeight;
        $('.m-consult').css('min-height', height + 'px');
    };
});
