'use strict';


var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        //parent: 'base',
        templateUrl: '/templates/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home',
        resolve: {
            speakers: getSpeakers
        }
    });
};
exports.$inject = ['$stateProvider'];

function getSpeakers (Speaker) {
    return Speaker.fetchAll();
}

getSpeakers.$inject = ['Speaker'];