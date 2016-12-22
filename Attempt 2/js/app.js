var app = angular.module('swift-flow', []);


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
