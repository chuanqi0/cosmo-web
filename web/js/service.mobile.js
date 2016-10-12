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
    }]);
