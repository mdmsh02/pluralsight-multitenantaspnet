'use strict';

module.exports = require('angular')
    .module('speaker', [])
    .controller('SpeakerController', require('./controller'))
    .config(require('./states'))
    .name;