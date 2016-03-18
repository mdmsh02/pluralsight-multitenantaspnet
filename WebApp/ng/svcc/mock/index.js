require('angular-mocks');
console.log('top1 svcc/mock/index.js');
var app = require('angular').module('MTApp');
app.requires.push('ngMockE2E');
app.run(provideMocks);

console.log('top2 svcc/mock/index.js');

function provideMocks($httpBackend) {

    $httpBackend.whenGET('/rest/speaker').respond(function (method, url, data) {
        console.log("Getting speakers");
        var speakers = require('../mock/data/speakers.json');
        return [200, speakers, {}];
    });

    // Pass any requests for the files
    $httpBackend.whenGET(/templates/).passThrough();
}

provideMocks.$inject = ['$httpBackend'];