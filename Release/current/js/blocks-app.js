var app = angular.module('blocks-manager',['ui.bootstrap', 'jt-time-to-read']);

app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  '$http',
  function($scope, $timeout,$http){

    $scope.name = 'Blank Block File';

    $scope.blocks = [];

    $scope.argument = "";
    $scope.response = "";

    $scope.filter = "";

    $scope.trash = false;

    $scope.closeNameChangeForm = function(){
      $("#modalNameCloseButton").click();
    }

    $scope.addBlock = function(){
      if($scope.argument == "") {
        alert("Please fill out argument field");
        return;
      }
      else if($scope.response == "") {
        alert("Please fill out response field");
        return;
      }
      $scope.blocks.push({
        argument: $scope.argument,
        response: $scope.response
      });
      $scope.argument = "";
      $scope.response = "";
    }

    $scope.passFilter = function(index){
      let substrRegex = new RegExp($scope.filter, 'i');
      return (substrRegex.test($scope.blocks[index].argument) || substrRegex.test($scope.blocks[index].response));
    }

    $scope.download = function(){

    }
  }
]);

app.directive('plfUpload',function(){
  return {
    restrict: 'A',
    link: function(scope,element,attributes) {
      element.change(function(){
        let file = this.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
          let content = JSON.parse(e.target.result);
          scope.name = content.name;
          scope.blocks = content.blocks;
          scope.$apply();
        };
        reader.readAsText(file);
      });
    }
  }
});

app.directive('plfDownload',function(){
  return {
    restrict: 'A',
    link: function(scope,element,attributes) {
        element.on('click',function(){

          let file = {
            name: scope.name,
            blocks: scope.blocks,
          };

          let dataStr = JSON.stringify(file);
          let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

          let exportName = scope.name+".bloc";

          element.attr({
            "href": dataUri,
            "download": exportName
          });
        });
    }
  }
});

app.directive('deleteArg',function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).on('click',function(e){
        scope.blocks.splice(JSON.parse(attrs.i), 1);
        scope.$apply();
      });
    }
  };
});
