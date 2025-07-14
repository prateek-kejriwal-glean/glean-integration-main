const config = require('./config')
const cors = require('cors')
const KeyV = require('keyv').Keyv
// const { KeyvFile } = require('keyv-file')

globalThis.cache = new KeyV()

const { log, init: initLogger } = require('./lib/logger/index')
initLogger({ loggingPath: config.loggingPath, fileName: 'logs.log', toConsole: true })
globalThis.log = log

const GleanApis = require('./lib/api')
const api = new GleanApis(config.host, config.clientToken, config.globalToken)
const gleanClient = api.getClient()
globalThis.gleanClient = gleanClient
globalThis.config = config





const Express = require('express')
const app = Express()
const { extractAuthTokenToBody } = require('./lib/middlewares/auth-token-extract')
const { extractAPIHost } = require('./lib/middlewares/extract-api-host')
const { extractAuthStateToRequest } = require('./lib/middlewares/auth-state-extract')
const cookieParser = require('cookie-parser')



app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser(), extractAuthStateToRequest, extractAuthTokenToBody, extractAPIHost)
app.use(Express.json({ limit: '50mb' }))
app.use('/api', require('./lib/routes'))
app.use(Express.static('./web'))

app.listen(process.env['PORT'], () => { console.log('Service is up') })





