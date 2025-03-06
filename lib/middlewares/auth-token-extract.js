

function extractAuthTokenToBody(req, res, next) {
    req.authToken = req.headers['authorization']
    next()
}

module.exports = { extractAuthTokenToBody }