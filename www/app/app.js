// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('scorer', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl:"app/home/home.html"
    })
    .state('enterplayernames', {
        url: "/enterplayernames/:teamId",
        templateUrl:"app/team/enterplayernames.html"
    })
     .state('scorer', {
         //cache: false,
         url: "/scorer",
         templateUrl: "app/scorer/scorer-main.html"
     })
        .state('startmatch', {
            url: "/startmatch",
            templateUrl: "app/match-starter/startmatch.html"
        })


    $urlRouterProvider.otherwise("/startmatch");
});
