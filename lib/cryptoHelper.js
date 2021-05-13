const crypto = require('crypto')

const encrypt = (data, secret, alg = 'sha256') => {
    return crypto
        .createHmac(alg, secret)
        .update(data)
        .digest('base64')
}

module.exports = {
    encrypt
}
