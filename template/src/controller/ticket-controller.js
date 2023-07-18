window.ticketController = function ($scope, $http, $rootScope) {
  $scope.tickets = [];
  $scope.currentPage = 0;
  $rootScope.maxPage = 0;
  $scope.pages = [];
  $scope.currentPage = 0;
  $scope.inputSearch = "";

  // get all ticket
  $scope.getTickets = function (pageNo) {
    $http
      .get("http://localhost:8080/ticket/get-all?pageNo=" + pageNo)
      .then(function (response) {
        $scope.tickets = response.data.content; // Lưu trữ danh sách vé
        $rootScope.maxPage = response.data.totalPages; // Tổng số trang
        $scope.getTotalPages(); // Gọi hàm getTotalPages() sau khi cập nhật giá trị maxPage
      });
  };
  $scope.getTicketsByStatus = function (pageNo, status) {
    $http
      .get(
        "http://localhost:8080/ticket/get-ticket-by-status?pageNo=" +
          pageNo +
          "&status=" +
          status
      )
      .then(function (response) {
        $scope.tickets = response.data.content; // Lưu trữ danh sách vé
        $rootScope.maxPage = response.data.totalPages; // Tổng số trang
        $scope.getTotalPages(); // Gọi hàm getTotalPages() sau khi cập nhật giá trị maxPage
      });
  };
  $scope.getTotalPages = function () {
    $scope.pages = Array.from({ length: $rootScope.maxPage }, (_, i) => i);
  };

  $scope.goToPage = function (page) {
    if (page >= 0 && page <= $scope.maxPage) {
      $scope.currentPage = page;
      if (parseInt($scope.cbbStatusTicketFilter) === 3) {
        $scope.getTickets(page);
      }
      // $scope.getTickets(page);
      $scope.getTicketsByStatus(page, $scope.cbbStatusTicketFilter);
    }
  };

  $scope.getTotalPages();
  $scope.getTickets(0);
  $scope.filterTicketByStatus = function (status) {
    //cbb chojn all => value = 3 => getAll, chon printed => 1, unprinted => 2, khac => 4 => tam thoi cu set la get all tai chua nghi ra
    $scope.currentPage = 0;
    if (parseInt(status) === 3) {
      console.log("ua alo");
      $scope.getTickets(0);
    }
    $scope.getTicketsByStatus(0, status);
    console.log("Selected status:", status);
  };

  // tìm kiếm
  $scope.$watch("inputSearch", function (newVal, oldVal) {
    if ($scope.inputSearch != "") {
      $http
        .get(
          "http://localhost:8080/ticket/search-ticket?inputSearch=" +
            $scope.inputSearch +
            "&pageNo=" +
            0
        )
        .then(function (response) {
          $scope.tickets = response.data.content; // Lưu trữ danh sách vé
          $rootScope.maxPage = response.data.totalPages; // Tổng số trang
          $scope.getTotalPages(); // Gọi hàm getTotalPages() sau khi cập nhật giá trị maxPage
        });
    } else {
      $scope.currentPage = 0;
      $scope.getTickets(0);
    }
  });

  var socket = new SockJS("http://localhost:8080/ws-ticket-booking");
  var stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log("Connected to WebSocket");
    stompClient.subscribe("/result/update-status-ticket", function (response) {
      var responseData = JSON.parse(response.body);
      if (responseData.id != null || responseData.id != undefined) {
        for (var i = 0; i < $scope.tickets.length; i++) {
          if ($scope.tickets[i].id === responseData.id) {
            $scope.tickets[i].status = responseData.status;
            break;
          }
        }
        $scope.$apply();
      }
    });
  });

  $scope.updateStatusTicket = function (id) {
    var status = 1;
    var url = "/ticket-booking/update-status-ticket/" + id;
    stompClient.send(url, {}, status.toString());
  };
  $scope.confirmUpdate = function (id) {
    var confirmation = confirm(
      "Bạn có chắc chắn muốn cập nhật trạng thái vé không?"
    );
    if (confirmation) {
      $scope.updateStatusTicket(id);
    }
  };
};
