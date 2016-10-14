angular.module('app')
    .service('UtilService', [function () {
        this.checkTelephone = function ($telephone) {
            var reg = new RegExp("^[1][0,3,4,5,7,8][0-9]{9}$");
            return reg.test($telephone);
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
        this.generateUuid = function (len, radix) {
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var chars = CHARS, uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        };
    }]);
