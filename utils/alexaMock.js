/**
 * Mocks native alexa functions for CLI usage
 */
module.exports = {
    emit: function (type, message) {
        console.log(type + ' - ' + message);
    }
}