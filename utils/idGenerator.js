const crypto = require('crypto');

/**
 * Generates a random alphanumeric string of a given length.
 * @param {number} length 
 * @returns {string}
 */
const generateUniqueId = (length = 10) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
        .toUpperCase();
};

module.exports = {
    generateUniqueId
};
