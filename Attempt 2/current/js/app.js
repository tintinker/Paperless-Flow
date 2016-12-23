var app = angular.module('swift-flow', ['ngSanitize', 'monospaced.elastic']);


app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  '$sce',
  function($scope, $timeout,$sce){
    $scope.ac = [
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

    $scope.selection = "ac";

    $scope.tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    $scope.fillertext ="";
    $scope.comboIndex = 0;
    $scope.combos = [];

    $scope.increment = function(){
      $scope.comboIndex = ($scope.comboIndex + 1 < $scope.combos.length) ? ($scope.comboIndex + 1) : 0;
      $("p").removeClass("responding-to");
    //  alert($scope.combos[$scope.comboIndex]);
      $("#"+$scope.combos[$scope.comboIndex]+">div>p").addClass("responding-to");
    }

    $scope.select = function(s){
      $(".nav-pills > li").removeClass("active");
      switch(s) {
        case 1:
          $scope.selection = "nc";
          $("#selectNC").addClass("active");
          break;
        case 2:
          $scope.selection = "ar";
          $("#selectAR").addClass("active");
          break;
        case 3:
          $scope.selection = "nr";
          $("#selectNR").addClass("active");
          break;
        default:
          $scope.selection =  "ac";
          $("#selectAC").addClass("active");
      }
    }

    $scope.loop = function(){
      for(var i = 0; i < $scope.ac.length; i++) {
        $scope.fillertext += $scope.ac[i].ac + "<br>";
        $scope.combos.push("ac"+i);
        if($scope.ac[i].nc) for(var j = 0; j < $scope.ac[i].nc.length; j++) {
          $scope.fillertext += $scope.tab + $scope.ac[i].nc[j].nc + "<br>";
          $scope.combos.push("ac"+i+"nc"+j);
          if($scope.ac[i].nc[j].ar) for(var k = 0; k < $scope.ac[i].nc[j].ar.length; k++) {
            $scope.fillertext += $scope.tab + $scope.tab + $scope.ac[i].nc[j].ar[k].ar + "<br>";
            $scope.combos.push("ac"+i+"nc"+j+"ar"+k);
            if($scope.ac[i].nc[j].ar[k].nr) for(var l = 0; l < $scope.ac[i].nc[j].ar[k].nr.length; l++) {
              $scope.fillertext += $scope.tab + $scope.tab +  $scope.tab + $scope.ac[i].nc[j].ar[k].nr[l].nr + "<br>";
              $scope.combos.push("ac"+i+"nc"+j+"ar"+k+"nr"+l);
            }
          }
        }
      }
    };


    $scope.addAcArg = function(tag) {
      $scope.ac.push({ac:tag});
    };

    $scope.addNcArg = function(tag, acArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [];
      $scope.ac[acArgRef].nc.push({nc:tag});
    };

    $scope.addArArg = function(tag, acArgRef, ncArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [{nc:"drop", ar:[]}];
      else if(!$scope.ac[acArgRef].nc[ncArgRef].ar)
        $scope.ac[acArgRef].nc[ncArgRef].ar = [];
      $scope.ac[acArgRef].nc[ncArgRef].ar.push({ar:tag});
    };

    $scope.addNrArg = function(tag, acArgRef, ncArgRef, arArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [
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
      else if(!$scope.ac[acArgRef].nc[ncArgRef].ar)
        $scope.ac[acArgRef].nc[ncArgRef].ar = [
          {
            ar:"drop",
            nr:[]
          }
        ];
      else if(!$scope.ac[acArgRef].nc[ncArgRef].ar[arArgRef].nr)
        $scope.ac[acArgRef].nc[ncArgRef].ar[arArgRef].nr = [];
      $scope.ac[acArgRef].nc[ncArgRef].ar[arArgRef].nr.push({nr:tag});
    };
  },
]);
