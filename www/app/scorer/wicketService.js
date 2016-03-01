angular.module('scorer').factory('wicketService', function () {
    var wicketService = {};
    wicketService.

    wicketService.isOutByFielder = function (selectedOutType) {
        for (i = 0; i < wicketService.outTypes.length; i++) {

            if (wicketService.outTypes[i].how === selectedOutType) {

                return wicketService.outTypes[i].byFielder;
            }
        }
    };
    wicketService.isOutByBowler = function (selectedOutType) {
        for (i = 0; i < wicketService.outTypes.length; i++) {

            if (wicketService.outTypes[i].how === selectedOutType) {

                return wicketService.outTypes[i].byBowler;
            }
        }
    };

    wicketService.setStrikerOnly = function (toSet) {
        wicketService.isStrikerOnly = toSet;
    }
    return wicketService;
});