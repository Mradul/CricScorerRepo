angular.module('scorer').factory('playerService', function () {
    var playerService = {};
    playerService.player;
    playerService = function (playerName) {
        console.log("adding player from player service - ",playerName);
        this.playerName = playerName;
        this.playerId = playerName;
        this.runs = 0;
        this.ballsFaced = 0;
        this.oversBowled = 0;
       
        this.runsConceded = 0;

    }

    playerService.prototype.addPlayerName = function (playerName) {
        playerService.playerName = playerName;
        
    }
    return playerService;
});