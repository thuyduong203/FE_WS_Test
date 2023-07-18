var app = angular.module("myApp", ["ngRoute", "ngWebSocket"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    // .when("/home", {
    //   templateUrl: "../src/pages/home.html",
    // })
    .when("/statistical", {
      templateUrl: "../src/pages/dashboard.html",
    })
    .when("/movie", {
      templateUrl: "../src/pages/films/movie/movie.html",
    })
    .when("/show-time", {
      templateUrl: "../src/pages/films/show-Time.html",
    })
    .when("/producer", {
      templateUrl: "../src/pages/films/producer.html",
    })
    .when("/genre", {
      templateUrl: "../src/pages/films/genre.html",
    })
    .when("/main-actor", {
      templateUrl: "../src/pages/films/main-actor.html",
      controller: actorController,
    })
    .when("/directors", {
      templateUrl: "../src/pages/films/directors.html",
    })
    .when("/trailer", {
      templateUrl: "../src/pages/films/trailers.html",
    })
    .when("/image", {
      templateUrl: "../src/pages/films/image.html",
    })
    .when("/ticket", {
      templateUrl: "../src/pages/products/ticket.html",
      controller: ticketController,
    })
    .when("/chair", {
      templateUrl: "../src/pages/products/chair.html",
      controller: chairController,
    })
    .when("/room", {
      templateUrl: "../src/pages/products/room.html",
    })
    .when("/food", {
      templateUrl: "../src/pages/foodCombo/food.html",
      controller: foodController,
    })
    .when("/combo", {
      templateUrl: "../src/pages/foodCombo/combo.html",
      controller: comboController,
    })
    .when("/sell", {
      templateUrl: "../src/pages/sell.html",
    })
    .when("/order", {
      templateUrl: "../src/pages/order.html",
    })
    .when("/staff", {
      templateUrl: "../src/pages/account/staff.html",
    })
    .when("/client", {
      templateUrl: "../src/pages/account/client.html",
    })
    .when("/addMovie", {
      templateUrl: "../src/pages/films/movie/addMovie.html",
    })
    .otherwise("/sell");
});
