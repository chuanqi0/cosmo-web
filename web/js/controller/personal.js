app.controller('PersonalController', function($scope, $cookieStore, cbwaUser) {

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
        $cookieStore.put('personalStep', step);
        $scope.jumpToPage('personal');
    };
});

app.controller('PersonalCasusController', function($scope, $cookieStore) {

    $scope.jumpToStep = function(step) {
        $cookieStore.put('personalStep', step);
        $scope.jumpToPage('personal');
    };
});

app.controller('PersonalOrderController', function($scope, $cookieStore) {

    $scope.casusOrderList = [];

    $scope.jumpToStep = function(step) {
        $cookieStore.put('personalStep', step);
        $scope.jumpToPage('personal');
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
