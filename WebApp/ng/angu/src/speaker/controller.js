function SpeakerController($scope,speakers,ConfigData) {
   this.speakers = speakers;
}
SpeakerController.$inject = ['$scope','speakers','ConfigData'];

module.exports = SpeakerController;