
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function getAnswers(authToken,apiHost) {
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.GET_ANSWERS,
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "content-type": 'application/json'
        },
        data: { withAudience: true, withRoles: true }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data?.answerResults }
    } catch (exc) {
        const response = exc.response
        return { statusCode: response.status, data: response.data }
    }

}


module.exports = { getAnswers, setConfig }