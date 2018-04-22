(function() {
  'use strict';

  angular
    .module('static')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, BookingService) {
    var vm = this;

    getBookings();

    function getBookings() {
      BookingService.getBookings()
        .then(function (bookings) {
          console.log(bookings);
        vm.bookings = bookings;
      })
        .catch(function (err) {
          toastr.info('Error ' + err);
        });
    }
  }
})();
