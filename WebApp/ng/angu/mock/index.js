'use strict';

console.log('mock\index.js');

require('angular-mocks');

var app = require('angular').module('MTApp');
app.requires.push('ngMockE2E');
app.run(provideMocks);

function provideMocks($httpBackend){

    $httpBackend.whenGET('/rest/speaker').respond(function(method,url,data) {
        console.log("Getting speakers");
        var speakers = require('../mock/data/speakers.json');
        return [200, speakers, {}];
    });

    // Pass any requests for the files
    $httpBackend.whenGET(/templates/).passThrough();
}

provideMocks.$inject = ['$httpBackend'];




//var speakers = [
//    {
//        "id": 12591,
//        "firstName": "Tobiah",
//        "lastName": "Zarlez",
//        "speakerUrl": "tobiah-zarlez-12591",
//        "imageUrl": "",
//        "webSite": "http://www.tobiahmarks.com/",
//        "bio": "Hi, I’m Tobiah. I’m an independent game developer from the SF Bay Area.\n\nRight after college, I started a company called “Yobonja” with a couple of friends. We made dozens of games, and eventually had a hit with “Blast Monkeys”. We were the number one app on Android for 6+ months. I stopped tracking downloads in 2012 after we passed 12 million, and people still play it and its sequel today.\n\nIn 2013 I started working for Microsoft as a Game Evangelist. My job is to talk to developers, teach them what I know, and help them make better games and successful companies succeed.",
//        "allowHtml": false
//    }
//];
