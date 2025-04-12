

function extractAuthStateToRequest(req, res, next) {
    req.auth_state = req.cookies['auth_state']
    next()
}

module.exports = { extractAuthStateToRequest }