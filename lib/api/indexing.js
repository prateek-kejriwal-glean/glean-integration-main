
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function indexDocuments(apiHost, authToken, dataSource, documents) {
    const uploadId = parseInt(Math.random() * 100000000000)
    const request = { uploadId, documents, datasource: dataSource }
    globalThis.log(`Uploading documents for indexing the data source -  ${dataSource}`, { uploadId, dataSource })
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.INDEX_DOCUMENTS,
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "content-type": 'application/json'
        },
        data: JSON.stringify(request)
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        const response = exc.response
        return { statusCode: response.status, data: response.data }
    }

}

async function indexDocument(document) {
    const request = { document };
    const axiosRequest = {
        method: 'POST',
        baseURL: config.host,
        url: PATHS.INDEX_DOCUMENT,
        headers: {
            "Authorization": `Bearer ${config.bearerToken}`,
            "content-type": 'application/json'
        },
        data: JSON.stringify(request)
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        const response = exc.response
        return { statusCode: response.status, data: response.data }
    }

}

module.exports = { indexDocuments, indexDocument, setConfig }