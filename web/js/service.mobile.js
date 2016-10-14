angular.module('app')
    .service('UtilService', [function () {
        this.checkTelephone = function ($telephone) {
            var reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
            return reg.test($telephone);
        };
        this.isMobile = function () {
            var agent = navigator.userAgent.toLowerCase();
            var mobile = /ipad/.test(agent) || /iphone/.test(agent) || /android/.test(agent);
            return mobile;
        };
        this.formatTime = function ($time) {
            var dateNow = new Date();
            var tmpArr = $time.split(/\s|-|:/);
            var date = new Date(parseInt(tmpArr[0]), parseInt(tmpArr[1]) - 1, parseInt(tmpArr[2]),
                parseInt(tmpArr[3]), parseInt(tmpArr[4]), parseInt(tmpArr[5]), parseInt(tmpArr[6]));
            var gap = dateNow.getTime() - date.getTime();
            var parseDate = $time.substring(5, 16).replace('-', '.');
            if (gap < 60 * 1000) {
                parseDate = "刚刚";
            } else if (gap < 60 * 60 * 1000) {
                parseDate = Math.floor(gap / (60 * 1000)) + " 分钟前";
            } else if (gap < 60 * 60 * 24 * 1000) {
                parseDate = Math.floor(gap / (60 * 60 * 1000)) + " 小时前";
            }
            return parseDate;
        };
    }])
    .service('DownloadService', [function () {
        var QQ_DOWNLOAD = 'http://a.app.qq.com/o/simple.jsp?pkgname=love.cosmo.android';
        var APPSTORE_DOWNLOAD = 'https://itunes.apple.com/cn/app/shi-shang-xin-niang/id1088557167';
        var APK_DOWNLOAD = 'http://cosmolove.file.alimmdn.com/res/apk/Cosmobride-release-1.3.1.apk';

        this.isIOSDevice = function () {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = (sUserAgent.match(/ipad/i) != null);
            var bIsIphoneOs = (sUserAgent.match(/iphone os/i) != null);
            if (bIsIpad || bIsIphoneOs) {
                return true;
            }
            return false;
        };

        this.isAndroidDevice = function () {
            var sUserAgent = navigator.userAgent.toLowerCase();
            if (sUserAgent.match(/android/i) != null) {
                return true;
            }
            return false;
        };

        this.isWeiXin = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.indexOf('windows phone') > -1) {
                return true;
            } else {
                return false;
            }
        };

        this.isQQ = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/mqqbrowser/i) == 'mqqbrowser' || ua.indexOf('qq') > -1) {
                return true;
            } else {
                return false;
            }
        };

        this.isWeibo = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/WeiBo/i) == 'weibo' || ua.indexOf('weibo') > -1) {
                return true;
            } else {
                return false;
            }
        };

        // this.isWeiXin() || this.isQQ() || this.isWeibo()
        this.downloadMobileApp = function () {
            window.location.href = QQ_DOWNLOAD;
        };

        this.isSocial = function () {
            return this.isWeiXin() || this.isQQ() || this.isWeibo();
        };

        this.iOSDownload = function () {
            window.open(APPSTORE_DOWNLOAD);
        };

        this.androidDownload = function () {
            window.open(APK_DOWNLOAD);
        };

        this.download = function () {
            if (this.isWeiXin() || this.isQQ()) {
                this.downloadMobileApp();
            } else {
                if (this.isIOSDevice()) {
                    this.iOSDownload();
                } else {
                    this.androidDownload();
                }
            }
        }
    }]);
