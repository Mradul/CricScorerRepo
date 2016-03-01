angular.module('scorer').factory('wicket', function () {

    var wicket = function (batsman, bowler, fielder, howOut, overNum, ballNum, wktid) {
        this.batsman = batsman;
        this.bowler = bowler;
        this.fielder = fielder;
        this.howOut = howOut;
        this.overNum = overNum;
        this.ballNum = ballNum;
        this.wktid = wktid;
    }
    return wicket;
});