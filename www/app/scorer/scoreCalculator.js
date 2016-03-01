angular.module('scorer').factory('scoreCalculator', function ($scope, matchService) {
    var innings = matchService.getCurrInnings();
    
});