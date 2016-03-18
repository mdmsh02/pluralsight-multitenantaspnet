var billGatesBirthday = '10-28-1955';

exports.gatesAge = function () {
    return (new Date() - new Date(billGatesBirthday)) / 1000 / 60 / 60 / 24 / 365.25
};


exports.gatesAgeOnDate = function (date1) {
    return (new Date(date1) - new Date(billGatesBirthday)) / 1000 / 60 / 60 / 24 / 365;
};
