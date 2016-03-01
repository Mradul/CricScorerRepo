

angular.module('scorer').controller('EnterPlayersCtrl', function ($scope, $stateParams,$location, matchService) {
        var self = this;

        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.players = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
        var teamId = $stateParams.teamId;
    //console.log($stateParams);
        console.log(matchService.teamManagement.getTeam(teamId));
        var team = null;
    try{
        team = matchService.teamManagement.getTeam(teamId);
        $scope.teamName =team.teamName;
      
    }catch(Exception ){
        console.log("team not found " + Exception);
        $location.path("#/");
    }
        //teamManagement.addTeam($scope.teamName, $scope.teamName, 'home');
    console.log(matchService.teamManagement);
        this.addPlayers = function () {
            var players = $scope.players;
            console.log("Players Adding - " + players[0].name);
            matchService.teamManagement.addPlayers(teamId, players);
            console.log("Players Added - " + players);
            if (team.teamType === 'home') {
                console.log("Away " + matchService.teamManagement.awayTeam().teamId);
                $location.path("/enterplayernames/" + matchService.teamManagement.awayTeam().teamId);
            }
            else {
                console.log("moving on with scoring" + matchService.teamManagement.awayTeam().teamId + " " + team.teamType);
                $location.path("/scorer");
            }
        }
    });
