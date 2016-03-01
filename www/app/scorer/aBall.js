angular.module('scorer').factory('aBall', function () {
    
    var aBall = function (ballnum, strikerid, nonstrikerid, runsby, runsscored, extrastype, wktid) {
        

        this.ballNum = ballnum;
        this.strikerId = strikerid;
        this.nonstrikerId = nonstrikerid;
        //aBall.bowlerid = bowlerid;
        this.runsBy = runsby;
        console.log("Determining extras type");
        if (extrastype === 'None')
            extraRuns = 0;
        else
            extraRuns = 1;
       
        this.runsScored = runsscored + extraRuns;
        this.extrasType = extrastype;
        this.wktId = wktid;

    };

    aBall.prototype.isToBeRebowled = function () {
        if (this.extrasType === 'None')
            return false;
        else
            return true;
    }
    return aBall;
});