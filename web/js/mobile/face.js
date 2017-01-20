app.controller('SwapFaceCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.gotoStartMake = function () {
        window.location.href = base + 'face/model';
    };

    $scope.model = {
        woman: true,
        man: false,
        couple: false
    };

    $scope.changeModel = function (type) {
        if ($scope.model[type] == true) {
            return;
        }
        $scope.model[type] = !$scope.model[type];
        for (var key in $scope.model) {
            if (key != type && $scope.model[type] == true) {
                $scope.model[key] = false;
            }
        }
    };

    $scope.gotoStepFill = function () {
        var type = '';
        for (var key in $scope.model) {
            if ($scope.model[key] == true) {
                type = key;
                break;
            }
        }
        window.location.href = base + 'face/step/fill';
    };

    $scope.gotoStepPhoto = function () {
        window.location.href = base + 'face/step/photo';
    };

    $scope.waterMark = {
        tag1: '新年快乐',  // 110
        tag2: '哈哈',  // 190
        tag3: '',  // 280
        tag4: '',
        tag5: '',
        tag6: '',
        sourceImage: '',
        croppedImage: ''
    };

    // 填充文字
    $scope.gotoChoosePhoto = function () {
        $state.go('face.step2photo');
    };

    if ($state.current.url.indexOf('step') != -1) {
        var img = new Image();
        img.src = './img/face/img_model_2.png';
        // 加载完成开始绘制
        img.onload = function () {
            //准备canvas环境
            var canvas = document.getElementById("poster-canvas");
            canvas.height = (img.height / img.width) * canvas.width;
            var ctx = canvas.getContext("2d");
            // 绘制图片
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 绘制水印
            var ModelType = 0;
            //ctx.font = "20px microsoft yahei";
            ctx.fillStyle = "#000000";
            ctx.fillText($scope.waterMark.tag1, 16, 110);
            ctx.fillStyle = "#BA882A";
            if (ModelType == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag2, 16, 190);
            ctx.fillStyle = "#BA882A";
            if (ModelType == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag3, 16, 280);
            ctx.fillStyle = "#BA882A";
            if (ModelType == 1) {
                ctx.fillStyle = "pink";
            }
            ctx.fillText($scope.waterMark.tag4, 16, 110);
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText($scope.waterMark.tag5, 16, 180);
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText($scope.waterMark.tag6, 16, 250);
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