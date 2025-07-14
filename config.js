const creds = require('./creds')
module.exports = {
    indexingToken: '--',
    clientToken: '--',
    globalToken: '--',
    idpClientId: creds.idpClientId,
    idpClientSecret: creds.idpSecret,
    idpHost: creds.idpHost,
    idpRedirectUri: creds.idpRedirectUri,
    host: 'https://support-lab-be.glean.com',
    loggingPath: './logs'
}