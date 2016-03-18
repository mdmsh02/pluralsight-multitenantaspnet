'use strict';

var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('speaker', {
        url: '/speaker',
        //url: '/',
        templateUrl: '/templates/speaker/speaker.html',
        controller: 'SpeakerController',
        controllerAs: 'speaker',
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
