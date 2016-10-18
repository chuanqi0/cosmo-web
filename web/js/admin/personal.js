app.controller('PersonalController', function($scope) {

    // 数据
    $scope.telephone = $scope.user.telephone;
    $scope.name = $scope.adminUser.name;
    $scope.identityCard = $scope.adminUser.identityCard;
    $scope.wechat = $scope.adminUser.wechat;
    $scope.company = $scope.adminUser.company;
    $scope.companyLocation = $scope.adminUser.companyLocation;
    $scope.companyIntro = $scope.adminUser.companyIntro;

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
                url: domain + '/api/user/admin/',
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
