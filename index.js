'use strict';

const Alexa = require('alexa-sdk');
const intents = require('./intents');

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    
    alexa.registerHandlers(intents);
    alexa.execute();
};
