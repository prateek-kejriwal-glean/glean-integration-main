
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function createAuthTokenForGlean(idpAuthToken) {
    const axiosRequest = {
        method: 'POST',
        baseURL: globalThis.config.host,
        url: PATHS.CREATE_AUTH_TOKEN,
        headers: {
            "Authorization": `Bearer ${idpAuthToken}`,
            "X-Glean-Auth-Type": 'OAUTH'
        }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}

async function createAuthenticationToken(authorizationCode, state) {
    const axiosRequest = {
        method: 'POST',
        baseURL: globalThis.config.idpHost,
        url: '/oauth2/v1/token'
    }
    const data = new URLSearchParams()
    data.set('client_id', globalThis.config.idpClientId)
    data.set('client_secret', globalThis.config.idpClientSecret)
    data.set('grant_type', 'authorization_code')
    data.set('redirect_uri', globalThis.config.idpRedirectUri)
    data.set('code', authorizationCode)

    axiosRequest.data = data
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}


async function whoAmI(idpToken) {
    const axiosRequest = {
        method: 'GET',
        baseURL: globalThis.config.idpHost,
        url: '/oauth2/v1/userinfo',
        headers: { 'Authorization': 'Bearer ' + idpToken }
    }

    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}



module.exports = { createAuthenticationToken, createAuthTokenForGlean,whoAmI, setConfig }