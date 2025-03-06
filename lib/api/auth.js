
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function createAuthTokenForEmailId(emailId) {
    const axiosRequest = {
        method: 'POST',
        baseURL: config.host,
        url: PATHS.CREATE_AUTH_TOKEN,
        headers: {
            "Authorization": `Bearer ${config.globalToken}`,
            "X-Scio-Actas": emailId
        }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}



module.exports = { createAuthTokenForEmailId, setConfig }