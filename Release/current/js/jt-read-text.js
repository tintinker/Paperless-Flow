var app = angular.module('jt-time-to-read',[]);

app.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.wpm = 60;
    $scope.t = "apples are very good i like apples so much";
  }
]);


app.directive('timeToRead',function(){
  return {
    restrict: 'E',
    scope: {
      text: '=',
      wpm: '='
    },
    link: function(scope,elem,attrs){
      var wpm = +scope.wpm;
      var length = scope.text.split(" ").length;
      var estimated_time = length / wpm * 60;
      var pretty = Math.round(estimated_time * 100)/100;
      $(elem).html(pretty + " sec");
    }
  }
});
