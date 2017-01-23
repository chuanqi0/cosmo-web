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

    if (window.location.href.indexOf('fill') != -1) {
        // 初始化背景图片
        var img = new Image();
        if (type == 'woman') {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_1.png';
        } else if (type == 'man') {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_2.png';
        } else {
            img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_3.png';
        }
        img.onload = function () {
            //准备canvas环境
            var canvas = document.getElementById("poster-canvas");
            canvas.height = (img.height / img.width) * canvas.width;
            var ctx = canvas.getContext("2d");
            // 绘制图片
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        }
    }

    $scope.ModelType = '';
    var coord = [[0, 0], [0, 0]];
    if (window.location.href.indexOf('photo') != -1) {
        $scope.ModelType = type;
        if (type == 'woman') {
            document.getElementById('model-img').src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_1.png';
        } else if (type == 'man') {
            document.getElementById('model-img').src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_2.png';
        } else {
            document.getElementById('model-img').src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_3.png';
        }
        // var imgCrops = [document.getElementById("img-crop-0"), document.getElementById("img-crop-1")];
        // var startX, startY, changeX, changeY;
        $("#photo").on("change", function () {
            // if ($('.component').css('display') == 'none') {
            //     $('.component').css('display', 'block');
            //     $('#js-crop').css('display', 'block');
            // }
            var fr = new FileReader();
            var file = this.files[0]
            //console.log(file);
            if (!file || !/image\/\w+/.test(file.type)) {
                alert(file.name + "请上传图片文件！");
                return;
            }
            console.log(file);
            fr.readAsDataURL(file);

            fr.onload = function () {
                document.getElementById("resize-image").src = fr.result;
                // $scope.$apply(function () {
                //     $scope.srcImg = fr.result;
                // });
                resizeableImage($('.resize-image'));
            };
        });
        // for (var i = 0; i <= 1; i++) {
        //     coord[i][0] = imgCrops[i].offsetLeft;
        //     coord[i][1] = imgCrops[i].offsetTop;
        //     (function (idx) {
        //         imgCrops[idx].addEventListener("touchstart", function (e) {
        //             startX = e.targetTouches[0].pageX;
        //             startY = e.targetTouches[0].pageY;
        //             return;
        //         });
        //         imgCrops[idx].addEventListener("touchmove", function (e) {
        //             e.preventDefault();
        //             e.stopPropagation();
        //             changeX = e.changedTouches[0].pageX - startX;// + x;
        //             changeY = e.changedTouches[0].pageY - startY;// + y;
        //             move($(this), changeX, changeY);
        //             return;
        //
        //         });
        //         imgCrops[idx].addEventListener("touchend", function (e) {
        //             changeX = e.changedTouches[0].pageX - startX;// + x;
        //             changeY = e.changedTouches[0].pageY - startY;// + y;
        //             coord[idx][0] = changeX;
        //             coord[idx][1] = changeY;
        //             // coord[idx][0] = coord[idx][0] + e.changedTouches[0].pageX - startX;
        //             // coord[idx][1] = coord[idx][1] + e.changedTouches[0].pageY - startY;
        //             move($(this), changeX, changeY);
        //             return;
        //
        //         });
        //     })(i);
        // }
    }
    $scope.croppedImgUrl = '';
    var cropCount = 0;
    $scope.shiftImageArea = function (url) {
        cropCount++;
        if ($scope.ModelType != 'couple' && cropCount > 1 || $scope.ModelType == 'couple' && cropCount > 2) {
            return;
        }
        $scope.croppedImgUrl = url;

        $('.crop-tip-2').css('display', 'block');
        $('.target-area').css('display', 'block');
        $('.crop-tip-1').css('display', 'none');

        console.log('------------------------->' + $scope.ModelType);
        if ($scope.ModelType == 'couple') {
            $('.component').css('display', 'block');
            $('.btn-upload').css('display', 'block');
            $('#js-crop').css('display', 'block');
        } else {
            $('.component').css('display', 'none');
            $('.btn-upload').css('display', 'none');
            $('#js-crop').css('display', 'none');
            $('.btn-ok').css('display', 'block');
        }
        var cropComponentState = $('.component').css('display');
        //
        (function (cnt) {
            var croppedImg = document.getElementById('cropped-img-1');
            if (cnt == 2) {
                croppedImg = document.getElementById('cropped-img-2');
            }
            croppedImg.src = url;
            var startX, startY, changeX, changeY;
            croppedImg.addEventListener("touchstart", function (e) {
                startX = e.targetTouches[0].pageX;
                startY = e.targetTouches[0].pageY;
                return;
            });
            croppedImg.addEventListener("touchmove", function (e) {
                e.preventDefault();
                e.stopPropagation();
                changeX = e.changedTouches[0].pageX - startX;
                changeY = e.changedTouches[0].pageY - startY;
                move($(this), changeX, changeY);
                return;

            });
            croppedImg.addEventListener("touchend", function (e) {
                changeX = e.changedTouches[0].pageX - startX;
                changeY = e.changedTouches[0].pageY - startY;
                if (cnt == 1) {
                    coord[0][0] = changeX;
                    coord[0][1] = changeY;
                } else if (cnt == 2) { // 上传第二张图
                    coord[1][0] = changeX;
                    coord[1][1] = changeY;
                }
                move($(this), changeX, changeY);
                return;
            });
        })(cropCount);
        if (cropCount == 2) {  //第二次触发
            $('.component').css('display', 'none');
            $('.btn-upload').css('display', 'none');
            $('#js-crop').css('display', 'none');
            $('.btn-ok').css('display', 'block');
        }
    };

    $scope.finish = function () {
        $('.btn-ok').attr('disabled', true);
        var wholeImageDataUrl = $scope.generateWholeImageDataUrl();
        $scope.createFacePoster(wholeImageDataUrl);
    };

    $scope.generateWholeImageDataUrl = function () {
        var cropWidth = parseInt($("#cropped-img-1").css("width"));
        var cropHeight = parseInt($("#cropped-img-1").css("height"));

        var modelImg = document.getElementById('model-img');

        var scale = (modelImg.naturalWidth / modelImg.width);

        //准备canvas环境
        var canvas = document.createElement('canvas');
        canvas.width = modelImg.width;
        canvas.height = modelImg.height;
        var ctx = canvas.getContext("2d");
        // 绘制图片
        ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
        // 文字
        ctx.font = "22px microsoft yahei";
        ctx.fillStyle = "#000000";
        if (type == 'couple') {
            ctx.fillStyle = "#FFFFFF";
        }
        ctx.fillText(tag1 != '-' ? tag1 : '', 16, 110 * (canvas.height / 412), 80);
        ctx.fillStyle = "#BA882A";
        if (type == 'woman') {
            ctx.fillStyle = "#FF3366";
        }
        ctx.fillText(tag2 != '-' ? tag2 : '', 16, 190 * (canvas.height / 412), 100);
        ctx.font = "20px microsoft yahei";
        ctx.fillStyle = "#BA882A";
        if (type == 'woman') {
            ctx.fillStyle = "#FF3366";
        }
        ctx.fillText(tag3 != '-' ? tag3 : '', 16, 280 * (canvas.height / 412), 90);
        ctx.fillStyle = "#BA882A";
        if (type == 'woman') {
            ctx.fillStyle = "#FF3366";
        }
        var toLeft = (canvas.width - 20 * (tag4.length.length <= 5 ? tag4.length : 5));
        ctx.fillText(tag4 != '-' ? tag4 : '', toLeft, 110 * (canvas.height / 412), 100);
        ctx.fillStyle = "#BA882A";
        var toLeft = (canvas.width - 20 * (tag5.length <= 6 ? tag6.length : 6));
        ctx.fillText(tag5 != '-' ? tag5 : '', toLeft, 180 * (canvas.height / 412), 120);
        ctx.font = "22px microsoft yahei";
        ctx.fillStyle = "#000000";
        if (type == 'couple') {
            ctx.fillStyle = "#FFFFFF";
        }
        var toLeft = (canvas.width - 22 * (tag6.length <= 7 ? tag6.length : 7));
        ctx.fillText(tag6 != '-' ? tag6 : '', toLeft, 250 * (canvas.height / 412), 140);
        // 头像
        try {
            var croppedImg = document.getElementById('cropped-img-1');
            ctx.drawImage(croppedImg, 0, 0, croppedImg.width, croppedImg.height, coord[0][0], coord[0][1], cropWidth, cropHeight);
            var croppedImg = document.getElementById('cropped-img-2');
            ctx.drawImage(croppedImg, 0, 0, croppedImg.width, croppedImg.height, coord[1][0], coord[1][1], cropWidth, cropHeight);
        } catch (e) {
            console.log(e);
        }
        // 二维码
        var img2vm = document.getElementById('img-2vm');
        ctx.drawImage(img2vm, 0, 0, img2vm.width, img2vm.height, 0, canvas.height - 50, 50, 50);
        // 赶回合成之后的图片
        return canvas.toDataURL("image/png");
    };

    $scope.createFacePoster = function (imageUrl) {
        var faceUuid = generateUuid();
        var data = {
            "faceUuid": faceUuid,
            "type": type,
            "tags": [tag1, tag2, tag3, tag4, tag5, tag6].join('#'),
            "crops": imageUrl
        };
        $.ajax({
            url: apiBase + '/api/face/create',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    window.location.href = base + 'face/show/' + faceUuid;
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
    };

    if (window.location.href.indexOf('show') != -1) {
        var data = {
            "faceUuid": faceUuid
        };
        $.ajax({
            url: apiBase + '/api/face/detail',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    // drawImage(response.data);
                    showImage(response.data);
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.error(err);
            }
        });
        function showImage(imageObj) {
            document.getElementById('show-img').src = imageObj.crops;
        }

        function drawImage(faceObj) {
            var img = new Image();
            if (faceObj.type == 'woman') {
                img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_1.png';
            } else if (faceObj.type == 'man') {
                img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_2.png';
            } else {
                img.src = 'http://www.ccbride.com/pub/img/mobile/face/img_model_3.png';
            }
            img.onload = function () {
                //准备canvas环境
                var canvas = document.getElementById("poster-canvas");
                canvas.height = (img.height / img.width) * canvas.width;
                var ctx = canvas.getContext("2d");
                // 绘制图片
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // 文字
                ctx.font = "18px microsoft yahei";
                var tags = faceObj.tags.split('#');
                ctx.fillStyle = "#000000";
                ctx.fillText(tags[0] != '-' ? tags[0] : '', 16, 110 * (canvas.height / 412));
                ctx.fillStyle = "#BA882A";
                if (faceObj.type == 'woman') {
                    ctx.fillStyle = "#FF3366";
                }
                ctx.fillText(tags[1] != '-' ? tags[1] : '', 16, 190 * (canvas.height / 412));
                ctx.fillStyle = "#BA882A";
                if (faceObj.type == 'woman') {
                    ctx.fillStyle = "#FF3366";
                }
                ctx.fillText(tags[2] != '-' ? tags[2] : '', 16, 280 * (canvas.height / 412));
                ctx.fillStyle = "#BA882A";
                if (faceObj.type == 'woman') {
                    ctx.fillStyle = "#FF3366";
                }
                ctx.fillText(tags[3] != '-' ? tags[3] : '', 235 * (canvas.width / 343), 110 * (canvas.height / 412), 90);
                ctx.fillStyle = "#BA882A";
                ctx.fillText(tags[4] != '-' ? tags[4] : '', 216 * (canvas.width / 343), 180 * (canvas.height / 412), 110);
                ctx.fillStyle = "#000000";
                ctx.fillText(tags[5] != '-' ? tags[5] : '', 224 * (canvas.width / 343), 250 * (canvas.height / 412), 100);
                // 头像
                try {
                    var crops = faceObj.crops.split('#');
                    var crop1 = $("<img src='" + crops[0] + "'/>")[0];
                    var coord1 = crops[1];
                    ctx.drawImage(crop1, 0, 0, crop1.width, crop1.height, parseInt(coord1.split(',')[0]) - cropWidth / 2, parseInt(coord1.split(',')[1]), cropWidth, cropHeight);
                    if (crops[2]) {
                        var crop2 = $("<img src='" + crops[2] + "'/>")[0];
                        var coord2 = crops[3];
                        ctx.drawImage(crop2, 0, 0, crop2.width, crop2.height, parseInt(coord2.split(',')[0]) - cropWidth / 2, parseInt(coord2.split(',')[1]), cropWidth, cropHeight);
                    }
                } catch (e) {
                    console.log(e);
                }
                // 二维码
                var img2vm = document.getElementById('img-2vm');
                ctx.drawImage(img2vm, 0, 0, img2vm.width, img2vm.height, 0, canvas.height - 50, 50, 50);  //img2vm.width, img2vm.height);
            }
        }
    }

    function move(ele, x, y) {
        // console.log(x + '-' + y);
        ele.css({
            '-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)',
            'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)'
        });
    }

    function resizeableImage(image_target) {
        // Some variable and settings
        var $container,
            orig_src = new Image(),
            image_target = $(image_target).get(0),
            event_state = {},
            constrain = false,
            min_width = 60, // Change as required
            min_height = 60,
            max_width = 400, // Change as required
            max_height = 500,
            resize_canvas = document.createElement('canvas');

        init = function () {

            // When resizing, we will always use this copy of the original as the base
            orig_src.src = image_target.src;

            // Wrap the image with the container and add resize handles
            if (cropCount == 0) {
                $(image_target).wrap('<div class="resize-container"></div>')
                    .before('<span class="resize-handle resize-handle-nw"></span>')
                    .before('<span class="resize-handle resize-handle-ne"></span>')
                    .after('<span class="resize-handle resize-handle-se"></span>')
                    .after('<span class="resize-handle resize-handle-sw"></span>');
                $(image_target).parent('.resize-container');
            }

            // Assign the container to a variable
            $container = $('.resize-container');
            // $container = $(image_target).parent('.resize-container');

            // Add events
            $container.on('mousedown touchstart', '.resize-handle', startResize);
            $container.on('mousedown touchstart', 'img', startMoving);
            $('#js-crop').on('click', crop);
        };

        startResize = function (e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            $(document).on('mousemove touchmove', resizing);
            $(document).on('mouseup touchend', endResize);
        };

        endResize = function (e) {
            e.preventDefault();
            $(document).off('mouseup touchend', endResize);
            $(document).off('mousemove touchmove', resizing);
        };

        saveEventState = function (e) {
            // Save the initial event details and container state
            event_state.container_width = $container.width();
            event_state.container_height = $container.height();
            event_state.container_left = $container.offset().left;
            event_state.container_top = $container.offset().top;
            event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
            event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            // This is a fix for mobile safari
            // For some reason it does not allow a direct copy of the touches property
            if (typeof e.originalEvent.touches !== 'undefined') {
                event_state.touches = [];
                $.each(e.originalEvent.touches, function (i, ob) {
                    event_state.touches[i] = {};
                    event_state.touches[i].clientX = 0 + ob.clientX;
                    event_state.touches[i].clientY = 0 + ob.clientY;
                });
            }
            event_state.evnt = e;
        };

        resizing = function (e) {
            var mouse = {},
                width, height, left, top, offset = $container.offset();
            mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
            mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            // Position image differently depending on the corner dragged and constraints
            if ($(event_state.evnt.target).hasClass('resize-handle-se')) {
                width = mouse.x - event_state.container_left;
                height = mouse.y - event_state.container_top;
                left = event_state.container_left;
                top = event_state.container_top;
            } else if ($(event_state.evnt.target).hasClass('resize-handle-sw')) {
                width = event_state.container_width - (mouse.x - event_state.container_left);
                height = mouse.y - event_state.container_top;
                left = mouse.x;
                top = event_state.container_top;
            } else if ($(event_state.evnt.target).hasClass('resize-handle-nw')) {
                width = event_state.container_width - (mouse.x - event_state.container_left);
                height = event_state.container_height - (mouse.y - event_state.container_top);
                left = mouse.x;
                top = mouse.y;
                if (constrain || e.shiftKey) {
                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                }
            } else if ($(event_state.evnt.target).hasClass('resize-handle-ne')) {
                width = mouse.x - event_state.container_left;
                height = event_state.container_height - (mouse.y - event_state.container_top);
                left = event_state.container_left;
                top = mouse.y;
                if (constrain || e.shiftKey) {
                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                }
            }

            // Optionally maintain aspect ratio
            if (constrain || e.shiftKey) {
                height = width / orig_src.width * orig_src.height;
            }

            if (width > min_width && height > min_height && width < max_width && height < max_height) {
                // To improve performance you might limit how often resizeImage() is called
                resizeImage(width, height);
                // Without this Firefox will not re-calculate the the image dimensions until drag end
                $container.offset({
                    'left': left,
                    'top': top
                });
            }
        }

        resizeImage = function (width, height) {
            resize_canvas.width = width;
            resize_canvas.height = height;
            resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
            $(image_target).attr('src', resize_canvas.toDataURL("image/png"));
        };

        startMoving = function (e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            $(document).on('mousemove touchmove', moving);
            $(document).on('mouseup touchend', endMoving);
        };

        endMoving = function (e) {
            e.preventDefault();
            $(document).off('mouseup touchend', endMoving);
            $(document).off('mousemove touchmove', moving);
        };

        moving = function (e) {
            var mouse = {},
                touches;
            e.preventDefault();
            e.stopPropagation();

            touches = e.originalEvent.touches;

            mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
            mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
            $container.offset({
                'left': mouse.x - (event_state.mouse_x - event_state.container_left),
                'top': mouse.y - (event_state.mouse_y - event_state.container_top)
            });
            // Watch for pinch zoom gesture while moving
            if (event_state.touches && event_state.touches.length > 1 && touches.length > 1) {
                var width = event_state.container_width,
                    height = event_state.container_height;
                var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
                a = a * a;
                var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
                b = b * b;
                var dist1 = Math.sqrt(a + b);

                a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                a = a * a;
                b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                b = b * b;
                var dist2 = Math.sqrt(a + b);

                var ratio = dist2 / dist1;

                width = width * ratio;
                height = height * ratio;
                // To improve performance you might limit how often resizeImage() is called
                resizeImage(width, height);
            }
        };

        crop = function () {
            //Find the part of the image that is inside the crop box
            var crop_canvas,
                left = $('.overlay').offset().left - $container.offset().left,
                top = $('.overlay').offset().top - $container.offset().top,
                width = $('.overlay').width(),
                height = $('.overlay').height();

            var scale = 1;
            if (image_target.naturalWidth != image_target.width) {
                scale = image_target.naturalWidth / image_target.width;
            }

            var aimWidth = 80 * ($('.target-area').width() / 343);  // 实际想绘制的图片大小
            var aimHeight = aimWidth;
            if ($scope.ModelType != 'man') {
                aimWidth *= 0.7;
                aimHeight *= 0.7;
            }
            crop_canvas = document.createElement('canvas');
            crop_canvas.width = aimWidth;
            crop_canvas.height = aimHeight;
            var context = crop_canvas.getContext('2d');
            context.arc(aimWidth / 2, aimWidth / 2, aimWidth / 2, 0, 2 * Math.PI);  // (x, y, point, 0, 180)
            context.clip();
            context.drawImage(image_target, left * scale, top * scale, width * scale, height * scale, 0, 0, aimWidth, aimHeight);

            var croppedImgUrl = crop_canvas.toDataURL("image/png");

            $scope.shiftImageArea(croppedImgUrl);
            // window.open(crop_canvas.toDataURL("image/png"));
        }

        init();
    };

    function generateUuid(len, radix) {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

}]);