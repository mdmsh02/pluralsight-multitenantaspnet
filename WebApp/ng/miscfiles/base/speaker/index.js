function SpeakerService($http, $q) {
    this.fetchAll = function () {
        var defer = $q.defer();
        $http.get('/rest/speaker').success(function (speakers) {
                speakers.map(function (speaker) {
                    speaker.speakerImageUrl =
                        "https://www.siliconvalley-codecamp.com/attendeeimage/" +
                        speaker.id + ".jpg";
                });
                defer.resolve(speakers);
            })
            .error(function (speakers) {
                console.log('rest speaker error');
            });
        return defer.promise;
    }
}
SpeakerService.$inject = ['$http', '$q'];

module.exports = SpeakerService;