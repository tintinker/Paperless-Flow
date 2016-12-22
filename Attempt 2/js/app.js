var app = angular.module('swift-flow', []);


app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout){
    $scope.c1AcArgs = [
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
            ar:[
              {
                ar:"Bananas are good",
                nr:[
                  {
                    nr:"Bananas are not good",
                    ar:[
                      "Bananas are really good"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ];
  },
]);
