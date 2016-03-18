'use strict';

module.exports = require('angular')
    .module('author', [])
    .controller('AuthorController', require('./controller'))
    .config(require('./states'))
    .name;