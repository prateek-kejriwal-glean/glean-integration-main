const creds = require('./creds')
module.exports = {
    indexingToken: '--',
    clientToken: '--',
    globalToken: '--',
    idpClientId: creds.idpClientId,
    idpClientSecret: creds.idpSecret,
    idpHost: creds.idpHost,
    idpRedirectUri: creds.idpRedirectUri,
    dataSourceId: 'prateektest',
    host: 'https://support-lab-be.glean.com',
    docCSV: './input/documents.csv',
    loggingPath: './logs'
}