let gleanClient = globalThis.gleanClient;


async function createAuthToken(req, res, next) {
    const authorizationCode = req.query?.code
    const state = req.query?.state
    const authState = await globalThis.cache.get(`auth:${state}`)
    if (!authState) { next(new Error("Invalid Auth")) }
    if (!authorizationCode) (next(new Error("AuthCode not passed to get the token for.")))

    globalThis.log(`Creating Auth Token for Authorization Code -`, authorizationCode)
    const response = await gleanClient.createAuthenticationToken(authorizationCode, state)
    if (response.statusCode < 400) {
        globalThis.log(`Created Auth Token for Authorization Code -`, `${authorizationCode}`)
        globalThis.log(`Creating Auth Token for Glean with IDP -`, `${authorizationCode}`)
        const gleanAuthResponse = await gleanClient.createAuthTokenForGlean(response.data.access_token)
        if (gleanAuthResponse.statusCode < 400) {
            await globalThis.cache.set(`auth:${state}`, { ...authState, idpAuth: extractIdpToken(response.data), gleanAuth: extractGleanToken(gleanAuthResponse.data) })
            res.cookie('auth_state', state, { maxAge: response.data.expires_in * 1000 })
            res.redirect(`${authState.finalLocation}`)
            res.send()
        } else {
            next(new Error("Could not fetch a glean token with IDP." + gleanAuthResponse.data))
        }
    } else {
        globalThis.log(`Could not generate the auth token for ${authorizationCode}`, response.data)
        res.redirect('/')
    }
    next()
}

async function redirectToIDP(req, res, next) {
    const idpEndpoints = await getIDPEndpoints(globalThis.config.idpHost);
    if (idpEndpoints.statusCode !== 200) {
        return { statusCode: idpEndpoints.statusCode, data: idpEndpoints.data };
    }
    const finalLocation = req.query.finalLocation
    const clientId = globalThis.config.idpClientId
    const redirectUri = globalThis.config.idpRedirectUri
    const scope = 'openid email profile'
    const state = parseInt(Math.random() * 10000000000000)
    await globalThis.cache.set(`auth:${state}`, { finalLocation })
    res.redirect(`${idpEndpoints.data.authorization_endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`)
}

async function getGleanToken(req, res, next) {
    const state = req.auth_state
    if (state) {
        const authState = await globalThis.cache.get(`auth:${state}`)
        if (authState) {
            const gleanAuth = authState.gleanAuth
            if (gleanAuth) {
                res.send({ token: gleanAuth.gleanToken, expirationTime: gleanAuth.expirationTime })
            } else {
                res.send({})
            }
        } else {
            res.send({})

        }
    } else {
        res.send({})
    }

}

async function whoAmI(req, res, next) {
    const state = req.auth_state
    if (state) {
        const authState = await globalThis.cache.get(`auth:${state}`)
        if (authState) {
            const token = authState.idpAuth.idpToken
            globalThis.log(`Fetching User Profile with IDP Token`)
            const profileResponse = await gleanClient.whoAmI(token)
            if (profileResponse.statusCode < 400) {
                console.log(profileResponse)
                res.send(profileResponse.data)
            } else { res.send({}) }
        } else {
            res.send({})
        }
    } else {
        res.send({})
    }

}



function extractIdpToken(response) {

    return { idpToken: response.access_token, expirationTime: response.expires_in }
}
function extractGleanToken(response) {
    return { gleanToken: response.token, expirationTime: response.expirationTime }
}


module.exports = { createAuthToken, redirectToIDP, whoAmI, getGleanToken }