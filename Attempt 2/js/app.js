var app = angular.module('swift-flow', ['monospaced.elastic','ngSanitize']);


app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout){
    $scope.acArgs = [
      {
        ac:"Apples",
        nc:[
          {
            nc:"Apples are bad",
            ar:[
              {
                ar:"Apples are good",
                nr:[
                  {
                    nr:"Apples are not good",
                    ar:[
                      "Apples are really good"
                    ]
                  }
                ]
              }
            ]
          },
          {
            nc:"Apples are bad again",
            ar:[
              {
                ar:"Apples are good again",
                nr:[
                  {
                    nr:"Apples are not good again",
                    ar:[
                      "Apples are really good again"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        ac:"Oranges",
        nc:[
          {
            nc:"Oranges are bad",
            ar:[
              {
                ar:"Oranges are good",
                nr:[
                  {
                    nr:"Oranges are not good",
                    ar:[
                      "Oranges are really good"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        ac:"Bananas",
        nc:[
          {
            nc:"Bananas are bad",
          }
        ]
      },
    ];

    $scope.selection = "ar"

    $scope.processNcKeyUp = function(e, acIndex){
      if(e.keyCode == 13) {
        e.preventDefault();
        if(e.shiftKey && acIndex+1 < $scope.acArgs.length) {
          $scope.addNcArg("",acIndex+1);
          $timeout(function () {
            $("#acArg"+(acIndex+2)+"ncArg"+$scope.acArgs[acIndex+1].nc.length+" textarea").focus();
          }, 10);
        }
        else {
          $scope.addNcArg("",acIndex);
          $timeout(function () {
            $("#acArg"+(acIndex+1)+"ncArg"+$scope.acArgs[acIndex].nc.length+" textarea").focus();
          }, 10);
        }
      }
    };

    $scope.processArKeyUp = function(e, acIndex, ncIndex){
      if(e.keyCode == 13) {
        e.preventDefault();
        if(e.shiftKey && ncIndex+1 < $scope.acArgs[acIndex].nc.length) {
          $scope.addArArg("",acIndex, ncIndex+1);
          $timeout(function () {
            $("#acArg"+(acIndex+1)+"ncArg"+(ncIndex+2)+"arArg"+$scope.acArgs[acIndex].nc[ncIndex+1].length+" textarea").focus();
          }, 10);
        }
        else if(e.shiftKey && acIndex+1 < $scope.acArgs.length) {
          $scope.addArArg("",acIndex+1, 0);
          $timeout(function () {
            $("#acArg"+(acIndex+2)+"ncArg"+(0+1)+"arArg"+$scope.acArgs[acIndex+1].nc[0].length+" textarea").focus();
          }, 10);
        }
        else {
          $scope.addArArg("",acIndex, ncIndex);
          $timeout(function () {
            $("#acArg"+(acIndex+1)+"ncArg"+(ncIndex+1)+"arArg"+$scope.acArgs[acIndex].nc[ncIndex].length+" textarea").focus();
          }, 10);
        }
      }
    };

    $scope.addAcArg = function(tag) {
      $scope.acArgs.push({ac:tag});
    };

    $scope.addNcArg = function(tag, acArgRef) {
      if(!$scope.acArgs[acArgRef].nc)
        $scope.acArgs[acArgRef].nc = [];
      $scope.acArgs[acArgRef].nc.push({nc:tag});
    };

    $scope.addArArg = function(tag, acArgRef, ncArgRef) {
      if(!$scope.acArgs[acArgRef].nc)
        $scope.acArgs[acArgRef].nc = [{nc:"drop", ar:[]}];
      else if(!$scope.acArgs[acArgRef].nc[ncArgRef].ar)
        $scope.acArgs[acArgRef].nc[ncArgRef].ar = [];
      $scope.acArgs[acArgRef].nc[ncArgRef].ar.push({ar:tag});
    };

    $scope.addNrArg = function(tag, acArgRef, ncArgRef, arArgRef) {
      if(!$scope.acArgs[acArgRef].nc)
        $scope.acArgs[acArgRef].nc = [
          {
            nc:"extend",
            ar:[
              {
                ar:"drop",
                nr:[]
              }
            ]
          }
        ];
      else if(!$scope.acArgs[acArgRef].nc[ncArgRef].ar)
        $scope.acArgs[acArgRef].nc[ncArgRef].ar = [
          {
            ar:"drop",
            nr:[]
          }
        ];
      else if(!$scope.acArgs[acArgRef].nc[ncArgRef].ar[arArgRef].nr)
        $scope.acArgs[acArgRef].nc[ncArgRef].ar[arArgRef].nr = [];
      $scope.acArgs[acArgRef].nc[ncArgRef].ar[arArgRef].nr.push({nr:tag});
    };
  },
]);
