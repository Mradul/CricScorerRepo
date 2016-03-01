angular.module('scorer').factory('teamManagement', function (playerService) {
    var teamManagement = {};
    teamManagement.teams = [];
    //teamManagement.teams.teamId = {};
    //teamManagement.teams.teamName = {};
    //teamManagement.teams.teamType = {};
    //teamManagement.teams.teamId.players = [];
    teamManagement.addTeam = function (teamId, teamName, teamType) {
        teamManagement.teams.push({ teamId: teamId, teamName: teamName, teamType: teamType });
    };
    teamManagement.getTeam = function (teamId) {
        if (teamManagement.teams[0].teamId === teamId)
            return teamManagement.teams[0];
        else return teamManagement.teams[1];
    };
    teamManagement.homeTeam = function () {
        if (teamManagement.teams[0].teamType === 'home')
            return teamManagement.teams[0];
        else return teamManagement.teams[1];
    };
    teamManagement.awayTeam = function () {
        if (teamManagement.teams[0].teamType === 'away')
            return teamManagement.teams[0];
        else return teamManagement.teams[1];
    };
    teamManagement.resetMatch = function () {
        teamManagement.teams = [];
    };

    teamManagement.addPlayers = function (teamId, players) {
        console.log(" Adding players [teamManagement]" , players);
        var listOfPlayers =[];
        for (var i = 0; i < players.length;i++) {
            listOfPlayers.push(new playerService(players[i].name));
        }
        console.log(listOfPlayers);
        teamManagement.getTeam(teamId).players =listOfPlayers;
    }
    teamManagement.getPlayers = function (teamId) {
        return teamManagement.getTeam(teamId).players;
    }
    teamManagement.reset = function () {
        teamManagement.teams = [];
    }
    return teamManagement;
});
