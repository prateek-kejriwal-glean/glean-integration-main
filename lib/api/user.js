
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function indexUsers(dataSource, users) {
    const responses = {}
    for (const user of users) {
        const response = await indexUser(dataSource, user)
        responses[user.userId] = response
    }
    return responses

}

async function indexUser(dataSource, user) {
    const request = { datasource: dataSource, user: user.getJSON() };
    const axiosRequest = {
        method: 'POST',
        baseURL: config.host,
        url: PATHS.INDEX_USER,
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

module.exports = { indexUsers, indexUser, setConfig }