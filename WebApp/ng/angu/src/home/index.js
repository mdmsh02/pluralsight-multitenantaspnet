'use strict';

console.log('home index.js');

module.exports = require('angular')
    .module('home', [])
    .controller('HomeController', require('./controller'))
    .config(require('./states'))
    .name;