var app = angular.module('swift-flow', ['ngSanitize', 'monospaced.elastic']);


app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  '$sce',
  function($scope, $timeout,$sce){
    $scope.ac = [
      {
        ac:"Apples",
        emphasize:true,
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
        emphasize:true,
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
        emphasize:false,
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

    $scope.addArgBySelection = function(emphasize){
      var refs = [0,0,0,0];
      for(var i = 0; i < $scope.combos[$scope.comboIndex].refs.length; i++)
        refs[i] = $scope.combos[$scope.comboIndex].refs[i];
      alert(refs[0]+" "+refs[1]+" "+refs[2]+" "+refs[3]+" ");
      switch($scope.selection) {
        case "ac":
            $scope.addAcArg("", refs[0], emphasize);
          break;
        case "nc":
          $scope.addNcArg("", refs[0])
          break;
        case "ar":
          $scope.addArArg("", refs[0], refs[1])
          break;
        case "nr":
          $scope.addNrArg("", refs[0], refs[1], refs[2])
      }
      $scope.refresh();
    };

    $scope.increment = function(){
      var refs = 0;
      switch($scope.selection) {
        case "ac":
          refs = 2; //would be 1, but this is the only time (for now) we actually want to loop through elements with text areas (selected elements)
          break;
        case "nc":
          refs = 2;
          break;
        case "ar":
          refs = 3;
          break;
        case "nr":
          refs = 4;
      }
      do {
        $scope.comboIndex = ($scope.comboIndex + 1 < $scope.combos.length) ? ($scope.comboIndex + 1) : 0;
      } while($scope.combos[$scope.comboIndex].refs.length >= refs);

      $("p").removeClass("responding-to");
    //  alert($scope.combos[$scope.comboIndex]);
      $("#"+$scope.combos[$scope.comboIndex].id+">div>p").addClass("responding-to");
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

    $scope.refresh = function(){
      $scope.updateBold();
      for(var i = 0; i < $scope.ac.length; i++) {
        $scope.fillertext += $scope.ac[i].ac + "<br>";
        $scope.combos.push({id:("ac"+i),refs:[i]});
        if($scope.ac[i].nc) for(var j = 0; j < $scope.ac[i].nc.length; j++) {
          $scope.fillertext += $scope.tab + $scope.ac[i].nc[j].nc + "<br>";
          $scope.combos.push({id:("ac"+i+"nc"+j),refs:[i,j]});
          if($scope.ac[i].nc[j].ar) for(var k = 0; k < $scope.ac[i].nc[j].ar.length; k++) {
            $scope.fillertext += $scope.tab + $scope.tab + $scope.ac[i].nc[j].ar[k].ar + "<br>";
            $scope.combos.push({id:("ac"+i+"nc"+j+"ar"+k),refs:[i,j,k]});
            if($scope.ac[i].nc[j].ar[k].nr) for(var l = 0; l < $scope.ac[i].nc[j].ar[k].nr.length; l++) {
              $scope.fillertext += $scope.tab + $scope.tab +  $scope.tab + $scope.ac[i].nc[j].ar[k].nr[l].nr + "<br>";
              $scope.combos.push({id:("ac"+i+"nc"+j+"ar"+k+"nr"+l),refs:[i,j,k,l]});
            }
          }
        }
      }
    };

    $scope.updateBold = function(){
      for(var i = 0; i < $scope.ac.length; i++) {
        if($scope.ac[i].emphasize)
          $("#ac"+i+"text").addClass("emphasized");
        else
          $("#ac"+i+"text").addClass("not-emphasized");
      }
    };

    $scope.changeFocus = function(event){
      alert(event.id);
    };

    $scope.addAcArg = function(tag, afterIndex, _emphasize) {
      $scope.ac.splice(afterIndex+1,0,{ac:tag, emphasize:_emphasize});
      $scope.updateBold();
      $timeout(function () {
            $("#ac"+(afterIndex+1)+" textarea").focus();
      }, 10);
    };

    $scope.addNcArg = function(tag, acArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [];
      $scope.ac[acArgRef].nc.push({nc:tag});
      $timeout(function () {
            $("#ac"+(acArgRef)+"nc"+($scope.ac[acArgRef].nc.length-1)+" textarea").focus();
      }, 10);
    };

    $scope.addArArg = function(tag, acArgRef, ncArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [{nc:"drop", ar:[]}];
      else if(!$scope.ac[acArgRef].nc[ncArgRef].ar)
        $scope.ac[acArgRef].nc[ncArgRef].ar = [];
      $scope.ac[acArgRef].nc[ncArgRef].ar.push({ar:tag});
      $timeout(function () {
            $("#ac"+(acArgRef)+"nc"+(ncArgRef)+"ar"+($scope.ac[acArgRef].nc[ncArgRef].ar.length-1)+" textarea").focus();
      }, 10);
    };

    $scope.addNrArg = function(tag, acArgRef, ncArgRef, arArgRef) {
      if(!$scope.ac[acArgRef].nc)
        $scope.ac[acArgRef].nc = [
          {
            nc:"Drop",
            ar:[
              {
                ar:"Drop",
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
      $timeout(function () {
            $("#ac"+(acArgRef)+"nc"+(ncArgRef)+"ar"+(arArgRef)+"nr"+($scope.ac[acArgRef].nc[ncArgRef].ar[arArgRef].nr.length-1)+" textarea").focus();
      }, 10);
    };
  },
]);
