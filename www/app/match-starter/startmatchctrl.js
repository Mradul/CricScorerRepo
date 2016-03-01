angular.module('scorer').controller('StartMatchController', function ($scope, matchService) {
    $scope.teams = {home:"",away:""};
   // var home = $scope.teams.home;
    
    this.Start = function (home,away) {
        console.log(home);

       // teamManagement.addTeam(home, home, "home");
        //teamManagement.addTeam(away, away, "away");
        matchService.startMatch(home,away);
        console.log("From start match controller start - ",matchService);
       // $location.path("#/enterplayernames/{{sm.teams.home}}");
    }
});
