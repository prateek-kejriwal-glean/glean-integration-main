

function extractAPIHost(req, res, next) {
    req.apiHost = req.headers['x-api-host']
    next()
}

module.exports = { extractAPIHost }