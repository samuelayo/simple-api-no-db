const _ = require('lodash');

module.exports = function(params, requiredFields) {
    errors = {};

    for (let i = 0; i < requiredFields.length; i++) {
        if (!params[requiredFields[i]]) { errors[requiredFields[i]] = 'is required'; }
    }
    if (_.isEmpty(errors)) {
        return null;
    }

    return errors;
}