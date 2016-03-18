var exports = module.exports = function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        //template: '<b>THIS IS HTML FOR HOME STATE TEMPLATE</b>',
        templateUrl: '/templates/home/home.html',
        controller: 'HomeController',
    });
};
exports.$inject = ['$stateProvider'];