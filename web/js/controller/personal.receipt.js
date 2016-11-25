app.controller('PersonalReceiptController', function($scope, cbwaUser) {

    // 数据
    $scope.cbwaUser = JSON.parse(cbwaUser);

    $scope.receiptFee = $scope.cbwaUser.receiptLimit - $scope.cbwaUser.receiptApply;
    $scope.receiptFee = $scope.receiptFee.toFixed(2);
    $scope.receiptTitle = $scope.cbwaUser.company;
    $scope.receiptAddress = $scope.cbwaUser.companyLocation;
    $scope.receiptNumber = '';
    $scope.receiptBankName = '';
    $scope.receiptBankNumber = '';

    $scope.titleValid = true;
    $scope.addressValid = true;
    $scope.numberValid = true;
    $scope.bankNameValid = true;
    $scope.bankNumberValid = true;

    $scope.jumpToStep = function(step) {
        $scope.putCookie('personalStep', step);
        $scope.jumpToPage('personal');
    };

    $scope.checkInput = function () {
        if ($scope.receiptTitle == '') {
            $scope.titleValid = false;
        }
        if ($scope.receiptAddress == '') {
            $scope.addressValid = false;
        }
        if ($scope.receiptNumber == '') {
            $scope.numberValid = false;
        }
        if ($scope.receiptBankName == '') {
            $scope.bankNameValid = false;
        }
        if ($scope.receiptBankNumber == '') {
            $scope.bankNumberValid = false;
        }
    };

    $scope.refuse = function () {
        alert("可申请额度不足");
    };

    $scope.applyReceipt = function() {
        $scope.checkInput();
        if ($scope.titleValid && $scope.addressValid && $scope.numberValid && $scope.bankNameValid && $scope.bankNumberValid) {
            var data = {
                userUuid: $scope.user.uuid,
                receiptFee: $scope.receiptFee,
                receiptTitle: $scope.receiptTitle,
                receiptAddress: $scope.receiptAddress,
                receiptNumber: $scope.receiptNumber,
                receiptBankName: $scope.receiptBankName,
                receiptBankNumber: $scope.receiptBankNumber
            };
            $.ajax({
                url: apiBase + '/api/cbwa/receipt/apply',
                type: 'POST',
                async: false,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 0) {
                        alert("申请成功，发票将会在3到15个工作日内寄出");
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
