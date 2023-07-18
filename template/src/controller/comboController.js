
window.comboController = function ($scope, $http) {
  $scope.lstCB = [];
  $http.get("http://localhost:8080/combo").then(function (response) {
    if (response.data.statusCode === "OK") {
      $scope.lstCB = response.data.data;
      console.log($scope.lstCB);
    }
  });
};
