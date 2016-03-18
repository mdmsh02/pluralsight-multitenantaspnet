'use strict';

var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('author', {
        url: '/author',
        templateUrl: '/templates/author/author.html',
        controller: 'AuthorController',
        controllerAs: 'author'
    });
};
exports.$inject = ['$stateProvider'];
