app.controller('SwapFaceCtrl', ['$scope', '$cookieStore', function ($scope, $cookieStore) {

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
            '/' + ($scope.waterMark.tag1 ? $scope.waterMark.tag1 : '-') +
            '/' + ($scope.waterMark.tag2 ? $scope.waterMark.tag2 : '-') +
            '/' + ($scope.waterMark.tag3 ? $scope.waterMark.tag3 : '-') +
            '/' + ($scope.waterMark.tag4 ? $scope.waterMark.tag4 : '-') +
            '/' + ($scope.waterMark.tag5 ? $scope.waterMark.tag5 : '-') +
            '/' + ($scope.waterMark.tag6 ? $scope.waterMark.tag6 : '-');
    };

    $scope.uploadImage = function () {
        document.getElementById("photo").click();
    };

    if (window.location.href.indexOf('fill') != -1 || window.location.href.indexOf('show') != -1) {
        // 初始化背景图片
        var img = new Image();
        if (type == 'woman') {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_1.png';
        } else if (type == 'man') {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_2.png';
        } else {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_3.png';
        }
        // 获取文字tag
        // if (window.location.href.indexOf('photo') != -1) {
        //     $scope.waterMark.tag1 = tag1 != '-' ? tag1 : '';
        //     $scope.waterMark.tag2 = tag2 != '-' ? tag2 : '';
        //     $scope.waterMark.tag3 = tag3 != '-' ? tag3 : '';
        //     $scope.waterMark.tag5 = tag4 != '-' ? tag4 : '';
        //     $scope.waterMark.tag5 = tag5 != '-' ? tag5 : '';
        //     $scope.waterMark.tag6 = tag6 != '-' ? tag6 : '';
        // }
        // 加载完成开始绘制
        img.onload = function () {
            //准备canvas环境
            var canvas = document.getElementById("poster-canvas");
            canvas.height = (img.height / img.width) * canvas.width;
            var ctx = canvas.getContext("2d");
            // 绘制图片
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            // 绘制水印
            if (window.location.href.indexOf('show') != -1) {
                // 文字
                //ctx.font = "20px microsoft yahei";
                ctx.fillStyle = "#000000";
                ctx.fillText(tag1 != '-' ? tag1 : '', 16, 110 * (459 / canvas.height));
                ctx.fillStyle = "#BA882A";
                if (type == 1) {
                    ctx.fillStyle = "pink";
                }
                ctx.fillText(tag2 != '-' ? tag2 : '', 16, 190 * (459 / canvas.height));
                ctx.fillStyle = "#BA882A";
                if (type == 1) {
                    ctx.fillStyle = "#FF99FF";
                }
                ctx.fillText(tag3 != '-' ? tag3 : '', 16, 280 * (459 / canvas.height));
                ctx.fillStyle = "#BA882A";
                if (type == 1) {
                    ctx.fillStyle = "#FF99FF";
                }
                ctx.fillText(tag4 != '-' ? tag4 : '', 16, 110 * (459 / canvas.height));
                ctx.fillStyle = "#BA882A";
                ctx.fillText(tag5 != '-' ? tag5 : '', 16, 180 * (459 / canvas.height));
                ctx.fillStyle = "#000000";
                ctx.fillText(tag6 != '-' ? tag6 : '', 16, 250 * (459 / canvas.height));
                // 头像
                crop1.replace(/@/g, '/');
                ctx.drawImage(crop1, 0, 0, crop1.width, crop1.height, 0, 0, coord1.split(',')[0], coord1.split(',')[1]);
                if (crop2 != null) {
                    crop2.replace(/@/g, '/');
                    ctx.drawImage(crop2, 0, 0, crop2.width, crop2.height, 0, 0, coord2.split(',')[0], coord2.split(',')[1]);
                }
                // 二维码
                var $img2vm = $('#img-2vm');
                ctx.drawImage($img2vm, 0, 0, $img2vm.width(), $img2vm.height(), 0, 0, 0, canvas.height - $img2vm.height());
            }
        }
    }

    $scope.srcImg = '';
    var coord = [[0, 0], [0, 0]];
    if (window.location.href.indexOf('photo') != -1) {
        // 图片裁剪
        var srcimg = $("#src-img")[0];
        var imgCrops = [$("#img-crop-0")[0], $("#img-crop-1")[0]];
        var width = parseInt($("#img-crop-0").css("width"));
        var height = parseInt($("#img-crop-0").css("height"));
        var startX, startY, scale = 1;
        var changeX, changeY;
        $("#photo").on("change", function () {
            var fr = new FileReader();
            var file = this.files[0]
            //console.log(file);
            if (!/image\/\w+/.test(file.type)) {
                alert(file.name + "不是图片文件！");
                return;
            }
            console.log(file);
            fr.readAsDataURL(file);

            fr.onload = function () {
                srcimg.src = fr.result;
                $scope.$apply(function () {
                    $scope.srcImg = fr.result;
                });
                //var widthInit = img.width;
                //if (img.width > img.height) {
                //    img.height = height;
                //    x = (width - img.width) / 2;
                //    y = 0;
                //} else {
                //    img.width = width;
                //    x = 0;
                //    y = (height - img.height) / 2;
                //}
                //scale = img.width / $("#src-img").width();
                //move(img, x, y);
            };
        });
        for (var i = 0; i <= 1; i++) {
            coord[i][0] = imgCrops[i].offsetLeft;
            coord[i][1] = imgCrops[i].offsetTop;
            (function (idx) {
                imgCrops[idx].addEventListener("touchstart", function (e) {
                    startX = e.targetTouches[0].pageX;
                    startY = e.targetTouches[0].pageY;
                    return;
                });
                imgCrops[idx].addEventListener("touchmove", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    changeX = e.changedTouches[0].pageX - startX;// + x;
                    changeY = e.changedTouches[0].pageY - startY;// + y;
                    move($(this), changeX, changeY);
                    return;

                });
                imgCrops[idx].addEventListener("touchend", function (e) {
                    changeX = e.changedTouches[0].pageX - startX;// + x;
                    changeY = e.changedTouches[0].pageY - startY;// + y;
                    coord[idx][0] = coord[idx][0] + e.changedTouches[0].pageX - startX;
                    coord[idx][1] = coord[idx][1] + e.changedTouches[0].pageY - startY;
                    move($(this), changeX, changeY);
                    return;

                });
            })(i);
        }
        //确定目标图片的样式
        function move(ele, x, y) {
            console.log(x + '-' + y);
            ele.css({
                '-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)',
                'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)'
            });
        }

        //裁剪图片
        function imageData($img, i) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage($img[i], coord[i][0], coord[i][1], width, width, 0, 0, width, height);
            return canvas.toDataURL();
        }
    }

    $scope.finish = function () {
        var crop1 = imageData($("#src-img"), 0).replace(/\//g, '@');
        var crop2 = null;
        if ($scope.ModelType == 'couple') {
            crop2 = imageData($("#src-img"), 1).replace(/\//g, '@');
        }
        console.log(crop1);
        console.log(crop2);
        // $cookieStore.put('cropped-img', {
        //     // type: type,
        //     // tag1: tag1,
        //     // tag2: tag2,
        //     // tag3: tag3,
        //     // tag4: tag4,
        //     // tag5: tag5,
        //     // tag6: tag6,
        //     crop1: crop1,
        //     crop2: crop2,
        //     coord: coord
        // });

        // $("#imgShow").html("<img src=" + crop1 + " /><img src=" + crop2 + " />");
        window.location.href = base + 'face/show/' + type +
            '/' + tag1 + '/' + tag2 + '/' + tag3 + '/' + tag4 + '/' + tag5 + '/' + tag6 +
            '/' + crop1 + '/' + coord[0] + '/' + crop2 + '/' + coord[1];
    };


}]);