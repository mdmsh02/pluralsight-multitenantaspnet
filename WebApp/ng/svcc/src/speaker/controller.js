function SpeakerController($scope,speakers,ConfigData) {
    $scope.speakers = speakers;
}
SpeakerController.$inject = ['$scope','speakers','ConfigData'];

module.exports = SpeakerController;