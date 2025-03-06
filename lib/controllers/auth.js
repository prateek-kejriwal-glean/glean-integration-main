let gleanClient = globalThis.gleanClient;

async function createAuthToken(req, res, next) {
    const emailId = req.body?.emailId
    if (!emailId) (next(new Error("Email ID not passed to get the token for.")))

    globalThis.log(`Creating Auth Token for Email ID -`, emailId)
    const response = await gleanClient.createAuthTokenForEmailId(emailId)
    if (response.statusCode < 400) {
        globalThis.log(`Created Auth Token for Email ID -`, `${emailId} - ${response.data}`)
        response.data.backend = gleanClient.host
        res.statusCode = response.statusCode
        res.send(response.data)
    } else {
        globalThis.log(`Could not generate the auth token for ${emailId}`, response.data)
    }
    next()
}



module.exports = { createAuthToken }