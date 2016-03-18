module.exports = angular.module('multiTenantBase', [])
    .service('Speaker', require('./speaker'))
    .name;