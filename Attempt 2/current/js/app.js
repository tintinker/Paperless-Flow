var app = angular.module('swift-flow', ['ngSanitize', 'monospaced.elastic', 'timer']);

app.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
  ]);

app.controller('MainCtrl', [
  '$scope',
  '$timeout',
  '$http',
  function($scope, $timeout,$http){

    $scope.ac = [{ac:"",emphasize:true}];
    $scope.selection = "ac";

    $scope.extranotes="";

    $scope.flowName = "Blank Flow";

    $scope.trash = false;

    $scope.comboIndex = 0;
    $scope.combos = [];

    $scope.baseAffirmativeConstructive = "{\"name\":\"Base Affirmative Constructive\",\"extranotes\":\"No Extra Notes\",\"flow\":[{\"ac\":\"Value\",\"emphasize\":true,\"$$hashKey\":\"object:4\",\"nc\":[]},{\"ac\":\"\",\"emphasize\":false,\"$$hashKey\":\"object:12\"},{\"ac\":\"Value Criterion\",\"emphasize\":true,\"$$hashKey\":\"object:17\"},{\"ac\":\"\",\"emphasize\":false,\"$$hashKey\":\"object:23\"},{\"ac\":\"Contention 1\",\"emphasize\":true,\"$$hashKey\":\"object:28\"},{\"ac\":\"\",\"emphasize\":false,\"$$hashKey\":\"object:34\"},{\"ac\":\"Contention 2\",\"emphasize\":true,\"$$hashKey\":\"object:39\"}]}";

    $scope.whichView = "flowView";

    $scope.selectView = function(view){
      $("#select-view > li").removeClass("active");
      if(view == 0) {
        $scope.whichView = "readView";
        $("#read-view").addClass("active");
      }
      else if(view == 2) {

      }
      else {
        $scope.whichView = "flowView";
        $("#affFlow").addClass("active");
      }
      $timeout(function () {
        $scope.refreshSelection();

      }, 10);
    }

    $scope.loadFile = function(fileData){
      let file = JSON.parse(fileData);
      $scope.ac = file.flow;
      $scope.flowName = file.name;
      $scope.extranotes = file.extranotes;
      $scope.$apply();
      $scope.refresh();
    }

    $scope.downloadCase = function(){
      let file = {
        name: $scope.flowName,
        flow: $scope.ac,
        extranotes: $scope.extranotes
      };
      let dataStr = JSON.stringify(file);
      let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

      let exportFileDefaultName = $scope.flowName+".flow";

      let ll = $("#todownload");
      ll.attr({
        "href": dataUri,
        "download": exportFileDefaultName
      });

    }

    $scope.addArgBySelection = function(emphasize){
      var refs = [0,0,0,0];
      for(var i = 0; i < $scope.combos[$scope.comboIndex].refs.length; i++)
        refs[i] = $scope.combos[$scope.comboIndex].refs[i];
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

    $scope.deleteArg = function(index) {
      switch(index.length) {
        case 1:
          $scope.ac.splice(index[0],1);
          break;
        case 2:
          $scope.ac[index[0]].nc.splice(index[1],1);
          break;
        case 3:
          $scope.ac[index[0]].nc[index[1]].ar.splice(index[2],1);
          break;
        case 4:
          $scope.ac[index[0]].nc[index[1]].ar[index[2]].nr.splice(index[3],1);
        }
      $scope.$apply();
      $scope.refresh();
    }

    $scope.validateBefore = function(){
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
      return $scope.combos[$scope.comboIndex].refs.length < refs;
    }

    $scope.updateRespondingTo = function(){
      $("p").removeClass("responding-to");
      $("#"+$scope.combos[$scope.comboIndex].id+">div>p").addClass("responding-to");
    };

    $scope.onArgClick = function(id){
      var beforeIndex = $scope.comboIndex;
      do {
        $scope.comboIndex = ($scope.comboIndex + 1 < $scope.combos.length) ? ($scope.comboIndex + 1) : 0;
      } while($scope.combos[$scope.comboIndex].id != id);
      if(!$scope.validateBefore()) {
        $scope.comboIndex = beforeIndex;
      } else {
        $scope.updateRespondingTo();
      //  alert($scope.combos[$scope.comboIndex].refs);
      }
    }

    $scope.increment = function(){

      do {
        $scope.comboIndex = ($scope.comboIndex + 1 < $scope.combos.length) ? ($scope.comboIndex + 1) : 0;
      } while(!$scope.validateBefore());

      $scope.updateRespondingTo();
    }

    $scope.decrement = function(){

      do {
        $scope.comboIndex = ($scope.comboIndex - 1 >= 0) ? ($scope.comboIndex - 1) : $scope.combos.length - 1;
      } while(!$scope.validateBefore());

      $scope.updateRespondingTo();
    }

    $scope.refreshSelection = function(){
      $(".nav-pills > li").removeClass("active");
      switch($scope.selection) {
        case "ac":
          $(".selectAC").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                $scope.refresh();
                $("#ac0 textarea").focus();
                $("#ac0 textarea").click();
          }, 10);
          break;
        case "nc":
          $(".selectNC").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                $scope.refresh();
                $("#ac0nc0 textarea").focus();
                $("#ac0nc0 textarea").click();
          }, 10);
          break;
        case "ar":
          $(".selectAR").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                if(!$scope.ac[0].nc[0].ar || !$scope.ac[0].nc[0].ar.length)
                  $scope.addArArg("",0,0);
                $scope.refresh();
                $("#ac0nc0ar0 textarea").focus();
                $("#ac0nc0ar0 textarea").click();
          }, 10);
          break;
        case "nr":
          $(".selectNR").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                if(!$scope.ac[0].nc[0].ar || !$scope.ac[0].nc[0].ar.length)
                  $scope.addArArg("",0,0);
                if(!$scope.ac[0].nc[0].ar[0].nr || !$scope.ac[0].nc[0].ar[0].nr.length)
                  $scope.addNrArg("",0,0,0);
                $scope.refresh();
                $("#ac0nc0ar0nr0 textarea").focus();
                $("#ac0nc0ar0nr0 textarea").click();
          }, 10);
          break;
        default:
          $("#selectNONE").addClass("active");
      }
      $scope.refresh();
    }

    $scope.select = function(s){
      $(".nav-pills > li").removeClass("active");
      switch(s) {
        case 0:
          $scope.selection = "ac";
          $(".selectAC").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                $scope.refresh();
                $("#ac0 textarea").focus();
                $("#ac0 textarea").click();
          }, 10);
          break;
        case 1:
          $scope.selection = "nc";
          $(".selectNC").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                $scope.refresh();
                $("#ac0nc0 textarea").focus();
                $("#ac0nc0 textarea").click();
          }, 10);
          break;
        case 2:
          $scope.selection = "ar";
          $(".selectAR").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                if(!$scope.ac[0].nc[0].ar || !$scope.ac[0].nc[0].ar.length)
                  $scope.addArArg("",0,0);
                $scope.refresh();
                $("#ac0nc0ar0 textarea").focus();
                $("#ac0nc0ar0 textarea").click();
          }, 10);
          break;
        case 3:
          $scope.selection = "nr";
          $(".selectNR").addClass("active");
          $timeout(function () {
                if(!$scope.ac || !$scope.ac.length)
                  $scope.addAcArg("");
                if(!$scope.ac[0].nc || !$scope.ac[0].nc.length)
                  $scope.addNcArg("",0);
                if(!$scope.ac[0].nc[0].ar || !$scope.ac[0].nc[0].ar.length)
                  $scope.addArArg("",0,0);
                if(!$scope.ac[0].nc[0].ar[0].nr || !$scope.ac[0].nc[0].ar[0].nr.length)
                  $scope.addNrArg("",0,0,0);
                $scope.refresh();
                $("#ac0nc0ar0nr0 textarea").focus();
                $("#ac0nc0ar0nr0 textarea").click();
          }, 10);
          break;
        default:
          $scope.selection =  "none";
          $("#selectNONE").addClass("active");
      }
      $scope.refresh();
    }

    $scope.refresh = function(){
      $scope.combos = [];
      for(var i = 0; i < $scope.ac.length; i++) {
        $scope.combos.push({id:("ac"+i),refs:[i]});
        if($scope.ac[i].nc) for(var j = 0; j < $scope.ac[i].nc.length; j++) {
          $scope.combos.push({id:("ac"+i+"nc"+j),refs:[i,j]});
          if($scope.ac[i].nc[j].ar) for(var k = 0; k < $scope.ac[i].nc[j].ar.length; k++) {
            $scope.combos.push({id:("ac"+i+"nc"+j+"ar"+k),refs:[i,j,k]});
            if($scope.ac[i].nc[j].ar[k].nr) for(var l = 0; l < $scope.ac[i].nc[j].ar[k].nr.length; l++) {
              $scope.combos.push({id:("ac"+i+"nc"+j+"ar"+k+"nr"+l),refs:[i,j,k,l]});
            }
          }
        }
      }
      $scope.updateBold();
      $scope.checkForDrops();
    };

    $scope.checkForDrops = function(){
      $("div").removeClass("dropped");
      switch($scope.selection) {
        case "nc":
          for(var i = 0; i < $scope.ac.length; i++) {
            if(!$scope.ac[i].nc || $scope.ac[i].nc == undefined) {
              $("#ac"+i+">div").addClass("dropped");
            }
          }
          break;
        case "ar":
          for(var i = 0; i < $scope.ac.length; i++) {
            if($scope.ac[i].nc) for(var j = 0; j < $scope.ac[i].nc.length; j++) {
              if(!$scope.ac[i].nc[j].ar|| $scope.ac[i].nc[j].ar == undefined) {
                $("#ac"+i+"nc"+j+">div").addClass("dropped");
              }
            }
          }
          break;
        case "nr":
          for(var i = 0; i < $scope.ac.length; i++) {
            if($scope.ac[i].nc) for(var j = 0; j < $scope.ac[i].nc.length; j++) {
              if($scope.ac[i].nc[j].ar) {for(var k = 0; k < $scope.ac[i].nc[j].ar.length; k++) {
                  if(!$scope.ac[i].nc[j].ar[k].nr || $scope.ac[i].nc[j].ar[k].nr == undefined) {
                    $("#ac"+i+"nc"+j+"ar"+k+">div").addClass("dropped");
                  }
                }
              }
            }
          }
        }
      }

    $scope.updateBold = function(){
      for(var i = 0; i < $scope.ac.length; i++) {
        if($scope.ac[i].emphasize)
          $(".ac"+i+"text").addClass("emphasized");
      }
    };

    $scope.addAcArg = function(tag, afterIndex, _emphasize) {
      $scope.ac.splice(afterIndex+1,0,{ac:tag, emphasize:_emphasize});
      $scope.updateBold();
      $timeout(function () {
            $scope.refresh();
            $("#ac"+(afterIndex+1)+" textarea").focus();
            $("#ac"+(afterIndex+1)+" textarea").click();
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

    $scope.processKeyGeneric = function(e) {
      if(e.keyCode == 40)
        $scope.increment();
      if(e.keyCode == 38)
        $scope.decrement();
      else if(e.keyCode == 13) {
        if(e.shiftKey)
          $scope.addArgBySelection(true);
        else
          $scope.addArgBySelection(false);
      }
    }

    $scope.closeNameChangeForm = function(){
      $("#modalNameCloseButton").click();
    }

    $scope.doLoadTemplate = function(){
      $scope.loadFile($scope.baseAffirmativeConstructive);
      $scope.refresh();
    };

    $scope.initUpload = function() {
      $("#caseUploadSelect").change(function(){
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          $scope.loadFile(e.target.result);
        };
        reader.readAsText(file);
      });
    }

    $scope.setup = function(){
      $(document).ready(function(){
        $scope.refresh();
      });
    };

    $scope.timerpaused = true;
    $scope.timerstopped = true;

    $scope.pauseResume = function(){
      $scope.timerpaused = !$scope.timerpaused;
      $("#timerOptions > #pauseButton").html(($scope.timerpaused ? "Pause" : "Resume"));
      if($scope.timerpaused) {
        $scope.$broadcast('timer-resume');
      } else {
        $scope.$broadcast('timer-stop');
      }
    }

    $scope.startStop = function(){
      $scope.timerstopped = !$scope.timerstopped;
      $("#timerOptions > #startButton").html(($scope.timerstopped ? "Start" : "Reset"));
      if(!$scope.timerstopped) {
        $scope.$broadcast('timer-start');
      } else {
        $scope.$broadcast('timer-reset');
      }
    }

    $scope.setup();
  },


]);



app.directive('plfPClick',function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).on('click',function(e){
        var id = elem.parent().parent().attr('id');
        scope.onArgClick(id);
      });
    }
  };
});

app.directive('plfTaClick',function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).on('click',function(e){
        var id = elem.parent().parent().parent()
        .parent().parent().parent().attr('id');
        scope.onArgClick(id);
      });
    }
  };
});

app.directive('plfTaAcClick',function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).on('click',function(e){
        var id = elem.parent().parent()
        .parent().parent().attr('id');
        scope.onArgClick(id);
      });
    }
  };
});

app.directive('deleteArg',function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).on('click',function(e){
        scope.deleteArg(JSON.parse(attrs.i));
      });
    }
  };
});
