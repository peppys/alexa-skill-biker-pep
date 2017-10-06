const alexaMock = require('../utils/alexaMock');
const stravaUtils = require('../utils/strava');
const strava = require('strava-v3');

module.exports = function () {
    var self = this,
        miles,
        movingTime;

    if (!this.emit) {
        this.emit = alexaMock.emit;
    }

    strava.athlete.listActivities({ id: stravaUtils.PEPPY_STRAVA_ID }, function (err, payload, limits) {
        if (!err) {
            miles = (Math.round((payload[0].distance / stravaUtils.METERS_IN_A_MILE) * 100) / 100);
            movingTime = Math.round(payload[0].moving_time / stravaUtils.SECONDS_IN_A_MINUTE)

            self.emit(':tell', 'In Peppy\'s most recent ride, he biked a total of ' + miles + ' miles in ' + movingTime + ' minutes!');
        } else {
            self.emit(':tell', 'Something broke. Tell Peppy to fix it!');
        }
    });
};
