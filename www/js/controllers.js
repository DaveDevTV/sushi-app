angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $rootScope, $http, $state, Places) {


  console.log('hi');

  $http.get('https://api.foursquare.com/v2/venues/search?client_id=QR2E043U0DPTJSIWDIBHVMXE0T4FK4XPA522JBB1PUKQEYMX&client_secret=V0UVTIG1QMRFNDGDTV32GAFHA45KMI4NPMSJMD4C2TVUSP4U&v=20130815&ll=40.7,-74&query=sushi').then(function(response) {

    console.log(response);

    $scope.places = response.data.response.venues;
    Places.places = response.data.response.venues;
  }, function(err) {
    console.log(err);
  });

  $scope.goToPlace = function(placeId) {

    var place = null;
    for (var i = 0; i < $scope.places.length; i++) {
      if ($scope.places[i].id == placeId) {
        place = $scope.places[i];
        break;
      }
    }

    Places.selectedPlace = place;

    console.log(place);
    $state.go('tab.chat-detail');
  };
})

.controller('ChatDetailCtrl', function($scope, Places) {

  $scope.$on("$ionicView.enter", function(event, data){
     // handle event
     $scope.place = Places.selectedPlace;
  });

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
