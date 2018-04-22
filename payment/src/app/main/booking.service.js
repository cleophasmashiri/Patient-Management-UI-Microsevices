/**
 * Created by cleophas on 2018/04/22.
 */
(function () {
  angular
    .module('static')
    .factory('BookingService', service);
  function service($http, $q) {
    return {getBookings: getBookings}
    function getBookings() {
      return $http.get('./assets/api/bookings')
        .then(function (bookings) {
          console.log(bookings.data);
          return $q.resolve(bookings.data);
        }).catch(function (err) {
          console.log(err);
          $q.reject(err);
        });
    }
  }
}());
