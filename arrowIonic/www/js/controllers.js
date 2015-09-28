angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  // do we actually need $state here?
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('CompassCtrl', function($scope, $state, $cordovaDeviceOrientation) {
  // see http://ngcordova.com/docs/plugins/deviceOrientation


  document.addEventListener("deviceready", function () {

    $scope.heading;

    var options = {
      frequency: 20,   // if frequency is set, filter is ignored
      // filter: 3         // degrees of change before refresh
    };

    $scope.watch = $cordovaDeviceOrientation.watchHeading(options).then(
      null,
      function(error) {
        $scope.heading = err;
      },
      function(result) {  // updates constantly (depending on frequency value)
        $scope.heading = 'transform: rotate(-'+ result.trueHeading +'deg)';
        //  try result.magneticHeading?
      });


    // watch.clearWatch();
    // // OR
    // $cordovaDeviceOrientation.clearWatch(watch)
    //   .then(function(result) {Success!}, function(err) {error});

    }, false);
});