window.foodController = function ($scope, $http) {
  $scope.lstFood = [];
  $http.get(snackApi).then(function (response) {
    if (response.data.statusCode === "OK") {
      $scope.lstFood = response.data.data;
      console.log($scope.lstFood);
    }
  });
  
  $scope.test = function (id) {
    $http
      .get("http://localhost:8080/snack/test" + "?id=" + id)
      .then(function (response) {
        console.log(id);
      });
  };
};
