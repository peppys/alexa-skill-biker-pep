const alexaMock = require('../utils/alexaMock');
const stravaUtils = require('../utils/strava');
const strava = require('strava-v3');

module.exports = function () {
    var self = this,
        miles;

    if (!this.emit) {
        this.emit = alexaMock.emit;
    }

    strava.athletes.stats({ id: stravaUtils.PEPPY_STRAVA_ID }, function (err, payload, limits) {
        if (!err) {
            miles = Math.round(payload.all_ride_totals.distance / stravaUtils.METERS_IN_A_MILE);

            self.emit(':tell', 'Peppy has biked a total of ' + miles + ' miles!');
        } else {
            self.emit(':tell', 'Something broke. Tell Peppy to fix it!');
        }
    });
};
