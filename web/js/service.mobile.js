angular.module('app')
    .service('UtilService', [function () {
        this.checkTelephone = function ($telephone) {
            var reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
            return reg.test($telephone);
        };
    }]);
