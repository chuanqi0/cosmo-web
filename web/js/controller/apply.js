// 实例化编辑器
var um = UM.getEditor('fe-editor');

app.controller('ApplyController', ['$scope', '$cookieStore', function($scope, $cookieStore) {
    // 申请步骤
    $scope.applyStep = $cookieStore.get('applyStep');
    // 价格
    $scope.priceList = ['5万以下', '5~10万', '10~20万', '20~50万', '50万以上'];
    $scope.price = '5万以下';
    // 地区
    $scope.provinceList = ['北京', '上海'];
    $scope.province = '北京';
    $scope.cityList = ['朝阳', '海淀'];
    $scope.city = '朝阳';

}]);
