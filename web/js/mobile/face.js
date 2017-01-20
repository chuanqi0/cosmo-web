/**
 * Created by ZLF on 2017/1/20.
 */
app.controller('FaceController', function($scope, photoUuid, DownloadService) {

    $scope.photo = null;
    $scope.favorList = [];
    $scope.commentList = [];

    $scope.getPhotoDetail = function () {
        $.ajax({
            url: domain + '/api/photo/detail/',
            type: 'POST',
            dataType: 'json',
            data: {
                photoUuid: photoUuid
            },
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.photo = response.data;
                    if ($scope.photo.urlList.length == 0) {
                        var one = {
                            'url': $scope.photo.url,
                            'urlThumb': $scope.photo.urlThumb,
                            'width': $scope.photo.width,
                            'height': $scope.photo.height
                        };
                        $scope.photo.urlList.push(one);
                    }
                    console.log($scope.photo);
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    };

    $scope.getFavorList = function () {
        var data = {
            photoUuid: photoUuid,
            page: 1,
            base: 0
        };
        $.ajax({
            url: domain + '/api/photo/favor/list/',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    var width = window.innerWidth;
                    $scope.favorList = response.dataList.slice(0, 7);
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    };

    $scope.getCommentlist = function () {
        var data = {
            photoUuid: photoUuid,
            page: 1,
            base: 0,
            order: 1
        };
        $.ajax({
            url: domain + '/api/photo/comment/list/',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 0) {
                    $scope.commentList = response.dataList.slice(0, 3);
                    $scope.$applyAsync();
                } else {
                    console.log(response.message);
                }
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    };

    $scope.init = function () {
        $scope.getPhotoDetail();
        $scope.getFavorList();
        $scope.getCommentlist();
        var height = window.innerHeight;
        $('.m-share-photo').css('min-height', height);
    };

    $scope.jumpDownload = function () {
        DownloadService.download();
    };
});
