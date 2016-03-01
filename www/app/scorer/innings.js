angular.module('scorer').factory('innings', function (over,wicket) {
    var innings = function (inningsId, battingTeam, bowlingTeam) {
        console.log("starting a new innings - ");
        this.overs = [];
        this.id = inningsId;
        this.battingTeamId = battingTeam;
        this.bowlingTeamID = bowlingTeam;
        this.totalScore = 0;
        this.fallenWkts = 0;
        this.wickets = [];
       // console.log("Started ", innings);

    };
    innings.prototype.addNewOver = function (bowlerId) {
        console.log("Getting new over...");
        overNum = 1;
        if (this.overs.length > 0)
            overNum = this.overs.length;
        anOver = new over(bowlerId, overNum);
        //over.startNewOver(bowlerId, overNum);
       // console.log("Got new over -", anOver);
        this.overs.push(anOver);
        console.log("New over started for innings ", innings);
    };

   
    innings.prototype.getId = function () {
        return innings.id;
    }
    innings.prototype.getCurrentOver = function () {
        return this.overs[this.overs.length - 1];
    }

    innings.prototype.addWicket = function (batsman, bowler, fielder, howOut, overNum, ballNum, wktid) {
        this.wickets.push(new wicket(batsman, bowler, fielder, howOut, overNum, ballNum, wktid));
    }
    return innings;
});