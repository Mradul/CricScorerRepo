angular.module('scorer').controller('scoringController', function ($scope, matchService, $ionicModal) {
    
    console.log("scoring controller - ", matchService);
    matchService.startInnings("ateam", "bteam");
    $scope.batsman1 = {};
    $scope.batsman2 = {};
    $scope.onStrike = $scope.batsman1;
    $scope.out = null;
    $scope.outTypes = [
 { "how": "Caught", "byFielder": true, "byBowler": true, "strikerOnly": true },
 { "how": "Bowled", "byFielder": false, "byBowler": true, "strikerOnly": true },
 { "how": "LBW", "byFielder": false, "byBowler": true, "strikerOnly": true },
 { "how": "Stump", "byFielder": true, "byBowler": true, "strikerOnly": true },
 { "how": "HitWkt", "byFielder": false, "byBowler": true, "strikerOnly": true },
 { "how": "RunOut", "byFielder": true, "byBowler": false, "strikerOnly": false },
 { "how": "Other", "byFielder": false, "byBowler": false, "strikerOnly": false }
    ];
    //$scope.bowler = {};
    $scope.overBallNum = 0;
    $scope.overNum = 0;
    $scope.runs = {};
    $scope.runButtons = [{ runs: 0 }, { runs: 1 }, { runs: 2 }, { runs: 3 }, { runs: 4 }, { runs: 5 }, { runs: 6 }];
    $scope.innings = matchService.getCurrInnings();
    $scope.over = {};
    $scope.runsBy = "Bat";
    $scope.extraType = "None";
    $scope.thisOver = " ";
    $scope.fow = " ";

    $scope.isStrikerOnly = "";
    var lastBallBy = {};
    $scope.$watch('bowler', function () {
        // $scope.counter++;
        console.log("adding an over",$scope);
        //TODO Add over to correct innings'
        if ($scope.bowler != null) {
            $scope.innings.addNewOver($scope.bowler.playerId);

            $scope.over = $scope.innings.getCurrentOver();
            $scope.overNum = $scope.over.overNum - 1;
            $scope.thisOver = "";
        }
    });
  
  //  var battingTeam = matchService.teamManagement.getTeam(innings.battingTeamId);
  //  var bowlingTeam = matchService.teamManagement.getTeam(innings.bowlingTeamId);
    //$scope.striker = {};
   
    
    // var home = $scope.teams.home;
    //console.log(home);      
    
   
   // console.log("From scoring controller start - ", matchService);

    $scope.getPlayerList = function (playerFor) {
       // console.log("getting player list ", playerFor);
       // console.log("match ",matchService);
        if (playerFor === 'bowler') {
            var allPlayers = matchService.teamManagement.getTeam($scope.innings.bowlingTeamID).players;
            position = allPlayers.indexOf(lastBallBy);

            if (~position) allPlayers.splice(position, 1);
            return allPlayers;
        } else if (playerFor === 'fielder') {
            return matchService.teamManagement.getTeam($scope.innings.bowlingTeamID).players;
        }
        else {

            var allPlayers = matchService.teamManagement.getTeam($scope.innings.battingTeamId).players;
            var toRemove = $scope.innings.wickets;
            for (var i = allPlayers.length - 1; i >= 0; i--) {
                for (var j = 0; j < toRemove.length; j++) {
                    if (allPlayers[i] && (allPlayers[i] === toRemove[j])) {
                        allPlayers.splice(i, 1);
                    }
                }
            }
            position = allPlayers.indexOf($scope.batsman1);
            if (~position) allPlayers.splice(position, 1);
            position = allPlayers.indexOf($scope.batsman2);
            if (~position) allPlayers.splice(position, 1);
            return allPlayers;
        }
        /*
        return {
            "players": [
      "Mradul",
      "JAin",
      "Phunsuk Wangdu",
      "Suranjana Mradul Jain"
            ]
        };*/
    };
  
    $ionicModal.fromTemplateUrl('select-player.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openModal = function (playerType) {
        $scope.modal.playerType = playerType;
        console.log("Setting model open ", playerType);
        $scope.modal.show()
    }

    $scope.closeModal = function (aPlayer) {
        console.log("Closing modal ", aPlayer);
       // $scope[$scope.modal.playerType].playerName = aPlayer.playerName;
        $scope[$scope.modal.playerType] = aPlayer;
        if ($scope.modal.playerType != 'bowler')
            $scope.onStrike = $scope[$scope.modal.playerType];
        
        //$scope.activePlayers[0] = playerName;
        //console.log("Player Chosen ", $scope);
       
        $scope.modal.hide();
        
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    $scope.startNewOver = function (newOverNum) {
       // $scope.counter++;
        console.log("adding an over", $scope.counter);
        //TODO Add over to correct innings
        $scope.innings.addNewOver($scope.bowler.playerId, newOverNum);

        $scope.over = $scope.innings.getCurrentOver();
    }

    $scope.submitBall = function(extraType,runsBy){
        console.log(" Runs - ", $scope.runs);
        if ($scope.batsman1 == $scope.onStrike) {
            strikerid = $scope.batsman1.playerId;
            nonstrikerid = $scope.batsman2.playerId;
        }
        else {
            strikerid = $scope.batsman2.playerId;
            nonstrikerid = $scope.batsman1.playerId;
        }
       
        wktid = -1;
        if ($scope.out.player != null) {
            wktid = $scope.innings.fallenWkts + 1;
            $scope.innings.fallenWkts++;
            
        }
        $scope.over.newBall(strikerid, nonstrikerid, runsBy, $scope.runs, extraType, wktid);
        var lastBall = $scope.over.getLastBall();
        if ($scope.out.player != null)
        {
            var outType = $scope.out.type;
            var bowler = "";
            $scope.fow += wktid + "-" + $scope.innings.totalScore + ", ";

            if ($scope.isOutByBowler(outType))
                bowler = $scope.bowler;
                $scope.innings.addWicket($scope.out.player, bowler, $scope.out.fielder, outType, $scope.overNum, lastBall, wktid);
            if ($scope.out.player === $scope.batsman1.playerName) {
                $scope.batsman1 = null;
            } else {
                $scope.batsman2= null;
            }
            $scope.out == null;
        }
        $scope.innings.totalScore += lastBall.runsScored;
        $scope.bowler.runsConceded += lastBall.runsScored;
        if (runsBy === "Bat")
            $scope.onStrike.runs += $scope.runs;
        if (extraType != "Wide")
            $scope.onStrike.ballsFaced++;
                
        if ($scope.runs % 2 != 0)
            $scope.changeStrike();
        if (lastBall.isToBeRebowled()) {
            $scope.overBallNum = lastBall.ballNum - 1;
            //Identify end of over
        } else if (lastBall.ballNum > 5) {
            $scope.bowler.oversBowled++;
            lastBallBy = $scope.bowler;
            $scope.bowler =null;
            $scope.overBallNum = 0;
            $scope.overNum++;
            $scope.changeStrike();
        }
        else
            $scope.overBallNum = lastBall.ballNum;

        $scope.thisOver += lastBall.runsScored;
        if (lastBall.extrasType === "No Ball") {
            $scope.thisOver += " NB";
        } else if (lastBall.extrasType === "Wide") {
            $scope.thisOver += " WD";
        }
        if (lastBall.wktId != -1) {
            $scope.thisOver += " WK";
        }

        if (lastBall.length - 1 != i) {
            $scope.thisOver += ", ";
        }
   };

    $scope.setRuns = function (runs) {
        $scope.runs = runs;
        $scope.isActive = !$scope.isActive;
    }
    $scope.changeStrike =function(){
        if ($scope.batsman1 === $scope.onStrike)
            $scope.onStrike = $scope.batsman2;
        else
            $scope.onStrike = $scope.batsman1;
    }
    $scope.getNonStriker = function () {
        if ($scope.batsman1 === $scope.onStrike)
            return $scope.batsman2;
        else
            return $scope.batsman1;
    }

    $scope.isOutByFielder=function(selectedOutType){
        for (i = 0; i < $scope.outTypes.length; i++) {
 
            if ($scope.outTypes[i].how === selectedOutType)
            { 
        
                return $scope.outTypes[i].byFielder;
            }
        }
    };
    $scope.isOutByBowler=function(selectedOutType){
        for (i = 0; i < $scope.outTypes.length; i++) {
 
            if ($scope.outTypes[i].how === selectedOutType)
            { 
        
                return $scope.outTypes[i].byBowler;
            }
        }
    };
  
    $scope.setStrikerOnly=function(toSet){
        $scope.isStrikerOnly=toSet;
    }
    $scope.confirmOut=function(outPlayer,selectedOutType,selectedFielder){
        $scope.out = {};
        $scope.out.player = outPlayer;
        $scope.out.type = selectedOutType;
        $scope.out.fielder = selectedFielder;
        console.log("Out - ",$scope.out);
        $scope.closeOutModal();
    }    
    $scope.cancelOut=function(){
        console.log("Cancel out");
        $scope.out = null;
        $scope.closeOutModal();
    }

    $ionicModal.fromTemplateUrl('select-out-method.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal2 = modal
    })

    $scope.openOutModal = function() {
       
        $scope.modal2.show()
    }

    $scope.closeOutModal = function () {
        console.log("Closing out modal ");

        $scope.modal2.hide();
        
    }; 
    
    $scope.$on('$destroy', function () {
        $scope.modal2.remove();
    });   
});

