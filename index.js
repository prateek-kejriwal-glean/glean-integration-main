const config = require('./config')
const { log, init: initLogger } = require('./lib/logger/index')
initLogger({ loggingPath: config.loggingPath, fileName: 'demo-logs', toConsole: true })
globalThis.log = log

const GleanApis = require('./lib/api')
const api = new GleanApis(config.host, config.clientToken, config.globalToken)
const gleanClient = api.getClient()
globalThis.gleanClient = gleanClient




const Express = require('express')
const app = Express()
const {extractAuthTokenToBody} = require('./lib/middlewares/auth-token-extract')



app.use(extractAuthTokenToBody)
app.use(Express.json())
app.use('/api', require('./lib/routes'))
app.use(Express.static('./web'))

app.listen(8080, () => { console.log('Service is up') })





