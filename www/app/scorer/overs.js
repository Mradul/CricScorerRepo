angular.module('scorer').factory('over', function (aBall) {
    //var over = [];
    var over = function (bowlerId, overNum) {
        this.overNum = overNum;
        this.bowlerId = bowlerId;
        this.balls = [];
        this.runsThisOver = 0;
        console.log("Starting new over - " , this);

    };
    over.prototype.newBall = function (strikerid, nonstrikerid, runsby, runsscored, extrastype, wktid) {
      //  over.battingteamid = battingteamid;
      //  over.inn = inn;
        // over.overNum = overNum;
        var newBall = this.getNewBallNum();
        console.log("Inserting new ball - "+newBall+" to over - "+this.overNum);
        var anotherBall = new aBall(newBall, strikerid, nonstrikerid, runsby, runsscored, extrastype, wktid);
        this.balls.push(anotherBall);
        this.runsThisOver += anotherBall.runsScored;
        //TODO: reball logic      
    };

   
    over.prototype.getNewBallNum = function () {
        var ballNum = 1;
        if (this.balls.length > 0) {
            var prevBall = this.balls[this.balls.length - 1];
            if (prevBall.isToBeRebowled())
                ballNum = prevBall.ballNum;
            else
                ballNum = prevBall.ballNum + 1;
        }

        return ballNum;
    }
    over.prototype.getLastBall = function () {
        var prevBall = {};
        if (this.balls.length > 0) {
             prevBall = this.balls[this.balls.length - 1];
           
        }

        return prevBall;
    }
    over.getRunsOnABall=function(battingteamid,inn,ovr,reball){

    }

    over.getABall = function (battingteamid,inn,ovr,reball) {
        //ba
    }
   
    return over;
});
