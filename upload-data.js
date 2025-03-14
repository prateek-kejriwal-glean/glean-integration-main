const config = require('./config')
const { log, init: initLogger } = require('./lib/logger/index')
const { loadDocuments } = require('./lib/utils/input')
const GleanApis = require('./lib/api')


initLogger({ loggingPath: config.loggingPath, toConsole: true })
globalThis.log = log

const api = new GleanApis(config.host, config.indexingToken)
const gleanClient = api.getClient()
globalThis.gleanClient = gleanClient

async function init() {
    globalThis.log(`Loading Documents from CSV File at location -  ${config.docCSV}`)
    const documents = await loadDocuments(config.docCSV, { fetchViewUrl: false })

    globalThis.log(`Bulk Indexing Documents to the data source -  ${config.dataSourceId}`)
    const response = await gleanClient.indexDocuments(config.dataSourceId, documents)
    if (response.statusCode < 299) {
        globalThis.log(`Successfully bulk indexed ${documents.length} documents to the data source -  ${config.dataSourceId}`, response)
    } else {
        globalThis.log(`Could not bulk index ${documents.length} documents to the data source -  ${config.dataSourceId}`, response)
    }

}

init().then(console.log).catch(console.error).finally(console.log)

