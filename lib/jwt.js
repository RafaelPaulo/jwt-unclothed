const crypto = require('crypto')

const base64urlEscape = (str) => {
    return str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

const toBase64 = (data) => {
    const str = (typeof data === 'string')
        ? data 
        : JSON.stringify(data)

    return base64urlEscape(new Buffer(str).toString('base64'))
}

const encrypt = (data, secret, alg = 'sha256') => {
    return crypto
        .createHmac(alg, secret)
        .update(data)
        .digest('base64')
}

const createJWT = (data, secret) => {
    // Header
    const header = {
        typ: 'JWT',
        alg: 'HS256'
    }

    const headerBase64 = toBase64(header)

    // Payload
    const payloadBase64 = toBase64(data)

    // signature
    const signature = encrypt(`${headerBase64}.${payloadBase64}`, secret)

    return `${headerBase64}.${payloadBase64}.${base64urlEscape(signature)}`
}

module.exports = createJWT
