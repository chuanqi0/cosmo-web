app.controller('ExtraController', function($scope) {

    // 数据
    $scope.name = '';
    $scope.identityCard = '';
    $scope.wechat = '';
    $scope.company = '';
    $scope.companyLocation = '';
    $scope.companyIntro = '';

    $scope.nameValid = true;
    $scope.identityCardValid = true;
    $scope.wechatValid = true;

    $scope.checkName = function () {
        var reg = new RegExp("^[\u4e00-\u9fa5]{2,10}$");
        if (reg.test($scope.name)) {
            $scope.nameValid = true;
        } else {
            $scope.nameValid = false;
        }
    };

    $scope.checkIdentityCard = function () {
        if (/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test($scope.identityCard)) {
            $scope.identityCardValid = true;
        } else {
            $scope.identityCardValid = false;
        }
    };

    $scope.checkWechat = function () {
        if ($scope.wechat == '') {
            $scope.wechatValid = false;
        } else {
            $scope.wechatValid = true;
        }
    };

    $scope.commit = function () {
        $scope.checkName();
        $scope.checkIdentityCard();
        $scope.checkWechat();
        if ($scope.nameValid == true && $scope.identityCardValid == true && $scope.wechatValid == true && $scope.user != null) {
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
                        alert("提交成功");
                        window.location.reload();
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
});
