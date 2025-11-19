
const { PATHS, MIME_TYPES } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function sendChat({ body, authToken, res, apiHost }) {
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.CHAT,
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": MIME_TYPES.APPLICATION_JSON
        },
        responseType: 'stream',
        data: body
    }
    let completeResponse = ''
    try {
        const response = await axios(axiosRequest)
        for await (let chunk of response.data) {
            const resp = new String(chunk)
            completeResponse += resp
            res.write(chunk)
        }

        return { statusCode: response.status, data: completeResponse }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}

async function listChats({ authToken,apiHost }) {
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.CHAT_LIST,
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}

async function getChat({ authToken, chatId, apiHost }) {
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.CHAT_GET,
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": MIME_TYPES.APPLICATION_JSON
        },
        data: { id: chatId }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}

async function deleteChat({ authToken, chatId, apiHost }) {
    const axiosRequest = {
        method: 'POST',
        baseURL: apiHost,
        url: PATHS.CHAT_DELETE,
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": MIME_TYPES.APPLICATION_JSON
        },
        data: { ids: [chatId] }
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}



module.exports = { sendChat, listChats, getChat, setConfig, deleteChat }