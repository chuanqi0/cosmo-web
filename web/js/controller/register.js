app.controller('RegisterController', function($scope, $cookieStore, $interval, UtilService) {

    // 数据
    $scope.telephone = '';
    $scope.password = '';
    $scope.rePassword = '';
    $scope.code = '';
    $scope.nickname = '';
    $scope.sendTimer = 0;

    $scope.telephoneValid = true;
    $scope.passwordValid = true;
    $scope.rePasswordValid = true;
    $scope.codeValid = true;
    $scope.nicknameValid = true;

    $scope.checkTelephone = function () {
        if (!UtilService.checkTelephone($scope.telephone)) {
            $scope.telephoneValid = false;
        } else {
            $scope.telephoneValid = true;
        }
    };

    $scope.checkPassword = function () {
        if ($scope.password == '') {
            $scope.passwordValid = false;
        } else {
            $scope.passwordValid = true;
        }
        if ($scope.rePassword == '') {
            $scope.rePasswordValid = false;
        } else {
            $scope.rePasswordValid = true;
        }
        if ($scope.password != '' && $scope.rePassword != '') {
            if ($scope.password != $scope.rePassword) {
                $scope.passwordValid = false;
                $scope.rePasswordValid = false;
            } else {
                $scope.passwordValid = true;
                $scope.rePasswordValid = true;
            }
        }
    };

    $scope.checkNickname = function () {
        if ($scope.nickname == '') {
            $scope.nicknameValid = false;
        } else {
            $scope.nicknameValid = true;
        }
    };

    $scope.checkCode = function ($type) {
        var data = {
            "telephone": $scope.telephone,
            "type": $type,
            'pin': $scope.code
        };
        $.ajax({
            url: domain + '/api/user/pin/check/',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.codeValid = true;
                } else {
                    $scope.codeValid = false;
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    $scope.reset = function () {
        $scope.checkTelephone();
        $scope.checkPassword();
        $scope.checkCode(2);
        if ($scope.codeValid == true) {
            if ($scope.passwordValid == true) {
                var data = {
                    "telephone": $scope.telephone,
                    "password": hex_md5($scope.password)
                };
                $.ajax({
                    url: domain + '/api/user/reset/',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function (response) {
                        if (response.status == 0) {
                            alert("重置密码成功");
                            window.location.href = base + 'login';
                        } else {
                            alert(response.message);
                        }
                    },
                    error: function (xhr, status, err) {
                        console.error(err);
                    }
                });
            }
        } else {
            alert("验证码不正确");
        }
    };

    $scope.register = function () {
        $scope.checkTelephone();
        $scope.checkPassword();
        $scope.checkNickname();
        $scope.checkCode(1);
        if ($scope.codeValid == true) {
            if ($scope.passwordValid == true && $scope.nicknameValid) {
                var data = {
                    "telephone": $scope.telephone,
                    "password": hex_md5($scope.password),
                    "nickname": $scope.nickname,
                    "gender": 2,
                    "deviceId": UtilService.generateUuid(),
                    "deviceType": 3,
                    "version": "1.0.0"
                };
                $.ajax({
                    url: domain + '/api/user/register/',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function (response) {
                        if (response.status == 0) {
                            alert("注册成功");
                            $cookieStore.put('user', response.data);
                            window.location.href = base;
                        } else {
                            alert(response.message);
                        }
                    },
                    error: function (xhr, status, err) {
                        console.error(err);
                    }
                });
            }
        } else {
            alert("验证码不正确");
        }
    };

    $scope.sendCode = function ($type) {
        $scope.checkTelephone();
        if ($scope.telephoneValid == true) {
            if ($scope.sendTimer == 0) {
                var success = false;
                var data = {
                    "telephone": $scope.telephone,
                    "type": $type,
                    'deviceId': UtilService.generateUuid()
                };
                $.ajax({
                    url: domain + '/api/user/pin/send/',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function (response) {
                        if (response.status == 0) {
                            alert("已发送验证码, 请注意查收!");
                            success = true;
                        } else {
                            if ($type == 1 && response.message == "手机号已注册") {
                                alert("手机号已注册, 请直接登录");
                                window.location.href = base + 'login';
                            } else {
                                alert(response.message);
                            }
                        }
                    },
                    error: function (xhr, status, err) {
                        console.error(err);
                    }
                });
                if (success == true) {
                    $scope.sendTimer = 60;
                    var timer = $interval(function () {
                        $('#sendTimer').html($scope.sendTimer + "s");
                        $scope.sendTimer--;
                        console.log($scope.sendTimer);
                        if ($scope.sendTimer == 0) {
                            $('#sendTimer').html("发送");
                            $interval.cancel(timer);
                        }
                    }, 1000);
                }
            }
        }
    };

    $scope.login = function () {
        $scope.checkTelephone();
        $scope.checkPassword();
        if ($scope.telephoneValid == true && $scope.passwordValid == true) {
            var data = {
                "telephone": $scope.telephone,
                "password": hex_md5($scope.password)
            };
            $.ajax({
                url: domain + '/api/user/login/',
                type: 'POST',
                dataType: 'json',
                data: data,
                async: false,
                success: function (response) {
                    if (response.status == 0) {
                        alert("登录成功");
                        $cookieStore.put('user', response.data);
                        window.location.href = base;
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
