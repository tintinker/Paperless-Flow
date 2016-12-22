var app = angular.module('swift-flow', ['tw.directives.clickOutside']);

/*app.directive('alertOnLoad', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
        return scope.$watch(
          $("#c4").focus(),
          function(){
            alert("hi");
          }
        );
    }
  };
});*/

angular.module('swift-flow').controller('MainCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout){
    $scope.contentions = [
      {tag: "Contention 1", subpoints: []}
    ];

    $scope.addContention = function(index){
      $scope.contentions[index].tag = $("#c"+(index)).val();
      $scope.contentions.push({
        tag: "Contention "+($scope.contentions.length+1),
        subpoints: []
      });
    };

    $scope.newSubpoint = function(event, c) {
      if(event.keyCode == 187) {
        $scope.contentions[c].subpoints.push("Subpoint "+($scope.contentions[c].subpoints.length+1));
      }
    };

    $scope.newContention = function(event) {
      if(event.keyCode == 189) {
        $scope.contentions.push({
          tag: "Contention "+($scope.contentions.length+1),
          subpoints: []
        });
      }
    };

    $scope.addSubpoint = function(c,s){
      $scope.contentions[c].subpoints[s] = $("#c"+c+"s"+s).val();
      $scope.contentions[c].subpoints.push(
      "subpoint "+($scope.contentions[c].subpoints.length+1)
      );
    };

    $scope.focus = function(c) {
      $timeout(function () {
        $("#c"+c).focus();
      }, 10);
    };

    $scope.focusS = function(c,s) {
      $timeout(function () {
        $("#c"+c+"s"+s).focus();
      }, 10);
    };


  },
]);
