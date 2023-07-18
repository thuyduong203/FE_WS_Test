window.chairController = function ($scope, $http) {
  var socket = new SockJS("http://localhost:8080/ws-ticket-booking");

  var stompClient = Stomp.over(socket);
  $scope.listChairType = [];

  $http
    .get("http://localhost:8080/get-all-chair-type")
    .then(function (response) {
      $scope.listChairType = response.data;
    });

  stompClient.connect({}, function (frame) {
    stompClient.subscribe("/result/save-chair-type", function (message) {
      console.log("aaa" + message.body);
      $scope.listChairType.push(JSON.parse(message.body));
      $scope.$apply();
    });
  });

  $scope.addChairType = function () {
    var chairType = {
      name: $scope.name,
      status: 1,
      createdBy: "NV001",
    };
    $scope.name = "";
    stompClient.send(
      "/ticket-booking/save-chair-type",
      {},
      JSON.stringify(chairType)
    );
  };
};
