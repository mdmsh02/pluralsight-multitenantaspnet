module.exports = require('angular').module('MTApp', [
        require('angular-ui-router'),
        require('../../base'),
        require('./speaker'),
        require('./home')
    ])
    .config(enableHtml5Mode)
    .name;

enableHtml5Mode.$inject = ['$locationProvider'];
function enableHtml5Mode($locationProvider) {
    console.log('enableHtml5Mode');
    $locationProvider.html5Mode(true);
}


