let gleanClient = globalThis.gleanClient;

async function chat(req, res, next) {
    const body = req.body
    const authToken = req.authToken
    if (!body || !authToken) (next(new Error("Invalid Input")))

    globalThis.log(`Sending the message to Chat`, body)
    const response = await gleanClient.sendChat({ body, authToken, res })
    if (response.statusCode < 399) {
        globalThis.log(`Got the response back from Chat. Chat ID - ${response.data.chatId}`)
        res.statusCode = response.statusCode
        res.end()
    } else {
        globalThis.log(`Could not search the platform for the query. Below is the response`, response.data)
    }
    next()
}

async function listChats(req, res, next) {
    const chatId = req?.query?.chatId
    if (chatId) return getChat(req, res, next)
    const authToken = req.authToken
    if (!authToken) (next(new Error("Invalid Input")))

    globalThis.log(`Fetching the list of chats.`)
    const response = await gleanClient.listChats({ authToken })
    if (response.statusCode < 399) {
        globalThis.log(`Got the list of Chats - ${JSON.stringify(response.data)}`)
        res.statusCode = response.statusCode
        res.send(response.data)
    } else {
        globalThis.log(`Could not fetch the list of chats. Below is the response`, response.data)
    }
    next()
}

async function getChat(req, res, next) {
    const authToken = req.authToken
    const chatId = req?.query?.chatId
    if (!authToken || !chatId) (next(new Error("Invalid Input")))

    globalThis.log(`Fetching the chat.`)
    const response = await gleanClient.getChat({ authToken, chatId })
    if (response.statusCode < 399) {
        globalThis.log(`Got the chat - ${JSON.stringify(response.data)}`)
        res.statusCode = response.statusCode
        res.send(response.data)
    } else {
        globalThis.log(`Could not fetch the list of chats. Below is the response`, response.data)
    }
    next()
}

module.exports = { chat, listChats }