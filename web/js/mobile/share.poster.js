app.controller('SharePosterController', function($scope, posterUuid, DownloadService) {

    $scope.poster = null;

    $scope.getPosterDetail = function () {
        $.ajax({
            url: domain + '/api/home/poster/detail/',
            type: 'POST',
            dataType: 'json',
            data: {
                posterUuid: posterUuid
            },
            async: false,
            success: function (response) {
                if (response.status == 0) {
                    $scope.poster = response.data;
                    console.log($scope.poster);
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
        $scope.getPosterDetail();
    };

    $scope.jumpDownload = function () {
        DownloadService.download();
    };
});
