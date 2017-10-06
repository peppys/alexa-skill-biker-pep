const alexaMock = require('../utils/alexaMock');
const stravaUtils = require('../utils/strava');
const strava = require('strava-v3');

module.exports = function () {
    var self = this,
        lowestTime,
        miles,
        movingTime,
        date,
        month,
        day;

    if (!this.emit) {
        this.emit = alexaMock.emit;
    }

    strava.athlete.listActivities({ id: stravaUtils.PEPPY_STRAVA_ID }, function (err, payload, limits) {
        if (!err) {
            fastestRide = payload[0];

            payload.forEach(function (activity) {
                if (activity.moving_time < fastestRide.moving_time) {
                    fastestRide = activity;
                }
            });

            date = new Date(fastestRide.start_date_local);
            month = (new Intl.DateTimeFormat('en-US', { month: 'long' }).format)(date);
            day = date.getDay();

            miles = (Math.round((fastestRide.distance / stravaUtils.METERS_IN_A_MILE) * 100) / 100);
            movingTime = Math.round(fastestRide.moving_time / stravaUtils.SECONDS_IN_A_MINUTE)

            self.emit(':tell', 'Peppy\'s fastest bike ride was on ' + month + ' ' + day + '. He biked ' + miles + ' miles in ' + movingTime + ' minutes! Amazing!');
        } else {
            self.emit(':tell', 'Something broke. Tell Peppy to fix it!');
        }
    });
};
