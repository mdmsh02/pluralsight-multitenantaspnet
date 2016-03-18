'use strict';

function HomeController ($scope,speakers,ConfigData) {
   this.speakers = speakers;
   this.ShowSpeakerPage = ConfigData.ShowSpeakerPage == "True"
}

HomeController.$inject = ['$scope','speakers','ConfigData'];

module.exports = HomeController;