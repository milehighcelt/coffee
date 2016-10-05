(function () {
    var cupOfExcellenceApp = angular.module('cupOfExcellenceApp', ['ngRoute',
        'TableResultsHeader','dropDownDataService', 'capitalizeFilter',
        'GetScoresCtrl','calcScoreService', 'ordinalSuffixFilter','tableResultsKeyFilter',
        'camelCaseFilter', 'utilitiesService']);

    //Handles viewing of pages for single page app//
    cupOfExcellenceApp.config(function ($routeProvider) {
        $routeProvider

        //// register googleMaps api
        //    singlePageApp.registerCtrl

        // route for the home page
            .when('/', {
                templateUrl: './htmlPartials/home.html'
            })

            // route for the about page
            .when('/results', {
                templateUrl: './htmlPartials/results.html'
            })

            // route for the contact page
            .when('/map', {
                templateUrl: './htmlPartials/map.html'
            });
    });

})();
