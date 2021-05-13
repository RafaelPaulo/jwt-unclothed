const { encrypt } = require('./cryptoHelper')

const base64urlEscape = (str) => {
    return str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

const toBase64 = (data = '') => {
    const str = (typeof data === 'string')
        ? data 
        : JSON.stringify(data)

    return base64urlEscape(new Buffer(str).toString('base64'))
}

const createJwt = (data, secret) => {
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

const openJwt = (token, secret) => {
    const tokenSplited = token.split('.')
    const header = Buffer.from(tokenSplited[0], 'base64').toString('utf8')
    //  const payload = 
    //  const signature = 
    console.log(header)
}

module.exports = {
    createJwt,
    openJwt
}
