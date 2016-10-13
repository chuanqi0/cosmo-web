app.controller('DownloadController', function($scope, $location, direct, DownloadService) {
    $scope.pcHover = 0;

    $scope.setHover = function ($hover) {
        $scope.pcHover = $hover;
    };

    $scope.jumpDownload = function () {
        if (DownloadService.isWeibo()) {
            $('#download-modal').modal();
        } else {
            DownloadService.download();
        }
    };

    $scope.iOSDownload = function () {
        DownloadService.iOSDownload();
    };

    $scope.androidDownload = function () {
        DownloadService.androidDownload();
    };

    $scope.init = function () {
        if (direct == 'true') {
            if (!DownloadService.isSocial()) {
                if (DownloadService.isIOSDevice()) {
                    DownloadService.iOSDownload();
                } else if (DownloadService.isAndroidDevice()) {
                    DownloadService.androidDownload();
                }
            }
        }
    };
});
