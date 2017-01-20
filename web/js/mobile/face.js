app.controller('SwapFaceCtrl', ['$scope', function ($scope) {

    $scope.gotoStartMake = function () {
        window.location.href = base + 'face/model';
    };

    $scope.model = {
        woman: true,
        man: false,
        couple: false
    };

    $scope.changeModel = function (modelType) {
        if ($scope.model[modelType] == true) {
            return;
        }
        $scope.model[modelType] = !$scope.model[modelType];
        for (var key in $scope.model) {
            if (key != modelType && $scope.model[modelType] == true) {
                $scope.model[key] = false;
            }
        }
    };

    $scope.gotoStepFill = function () {
        var modelType = '';
        for (var key in $scope.model) {
            if ($scope.model[key] == true) {
                modelType = key;
                break;
            }
        }
        window.location.href = base + 'face/step/fill/' + modelType;
    };

    $scope.waterMark = {
        tag1: '',  // 110
        tag2: '',  // 190
        tag3: '',  // 280
        tag4: '',
        tag5: '',
        tag6: '',
        sourceImage: '',
        croppedImage: ''
    };

    $scope.gotoStepPhoto = function () {
        window.location.href = base + 'face/step/photo/' + type +
            '/' + $scope.waterMark.tag1 +
            '/' + $scope.waterMark.tag2 +
            '/' + $scope.waterMark.tag3 +
            '/' + $scope.waterMark.tag4 +
            '/' + $scope.waterMark.tag5 +
            '/' + $scope.waterMark.tag6;
    };

    if (window.location.href.indexOf('step') != -1) {
        // 初始化背景图片
        var img = new Image();
        if (type == 'woman') {
            img.src = '../../../../img/mobile/face/img_model_1.png';
        } else if (type == 'man') {
            img.src = domain + '../../../../pub/img/mobile/face/img_model_2.png';
        } else {
            img.src = domain + '../../../../pub/img/mobile/face/img_model_3.png';
        }
        // 获取文字tag
        if (window.location.href.indexOf('photo') != -1) {
            $scope.waterMark.tag1 = tag1;
            $scope.waterMark.tag2 = tag2;
            $scope.waterMark.tag3 = tag3;
            $scope.waterMark.tag5 = tag4;
            $scope.waterMark.tag5 = tag5;
            $scope.waterMark.tag6 = tag6;
        }
        // 加载完成开始绘制
        img.onload = function () {
            //准备canvas环境
            var canvas = document.getElementById("poster-canvas");
            canvas.height = (img.height / img.width) * canvas.width;
            var ctx = canvas.getContext("2d");
            // 绘制图片
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 绘制水印
            //ctx.font = "20px microsoft yahei";
            ctx.fillStyle = "#000000";
            ctx.fillText($scope.waterMark.tag1, 16, 110 * (459 / canvas.width));
            ctx.fillStyle = "#BA882A";
            if (type == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag2, 16, 190 * (459 / canvas.width));
            ctx.fillStyle = "#BA882A";
            if (type == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag3, 16, 280 * (459 / canvas.width));
            ctx.fillStyle = "#BA882A";
            if (type == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag4, 16, 110 * (459 / canvas.width));
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText($scope.waterMark.tag5, 16, 180 * (459 / canvas.width));
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText($scope.waterMark.tag6, 16, 250 * (459 / canvas.width));
        }
    }

    $scope.myImage = '';
    $scope.myCroppedImage = '';
    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
                //$scope.waterMark.sourceImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
}]);