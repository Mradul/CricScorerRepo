angular.module('scorer').factory('matchService', function (teamManagement,innings) {
    var matchService = {};
    matchService.innings = [];
    matchService.teamManagement;
    matchService.startMatch = function (homeTeam, awayTeam) {
        teamManagement.reset();
        teamManagement.addTeam(homeTeam, homeTeam, "home");
        teamManagement.addTeam(awayTeam, awayTeam, "away");
        matchService.teamManagement = teamManagement;
        matchService.innings = [];
    };

    matchService.startInnings = function ( battingTeam, bowlingTeam) {
        var inningsId = 1;
        if (matchService.innings.length>0) {
            inningsId=matchService.innings[matchService.innings.length - 1].getId() + 1;
        }
        
        matchService.innings.push(new innings(inningsId, battingTeam, bowlingTeam));
        console.log(" matchService.startInnings ",matchService);
    };

    matchService.getCurrInnings = function () {
        return matchService.innings[matchService.innings.length - 1];
    }
    return matchService;
});