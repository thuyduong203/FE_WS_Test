window.actorController = function ($rootScope, $http) {
  $rootScope.listActor = [];

  $http.get(ActorAPI + "/get-all").then(function (response) {
    listActor = response.data;
  });
};
