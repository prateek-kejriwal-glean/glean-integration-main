module.exports = {
    PATHS: {
        INDEX_DOCUMENTS: '/api/index/v1/indexdocuments',
        INDEX_DOCUMENT: '/api/index/v1/indexdocument',
        ADD_OR_UPDATE_DATA_SOURCES: '/api/index/v1/adddatasource',
        SEARCH: '/rest/api/v1/search',
        CHAT: '/rest/api/v1/chat',
        CHAT_LIST: '/rest/api/v1/listchats',
        CHAT_GET: '/rest/api/v1/getchat',
        CHAT_DELETE: '/rest/api/v1/deletechats',
        AUTOCOMPLETE: '/rest/api/v1/autocomplete',
        INDEX_USER: '/api/index/v1/indexuser',
        INDEX_USER: '/api/index/v1/indexgroup',
        CREATE_AUTH_TOKEN: '/rest/api/v1/createauthtoken',
        GET_ANSWERS: '/rest/api/v1/listanswers'
    },
    MIME_TYPES: {
        TEXT_HTML: 'text/html',
        TEXT: 'text/plain',
        APPLICATION_JSON: 'application/json'
    },
    OBJECT_TYPES: {
        INTERVIEW_DOC: 'InterviewDoc',
        CUSTOM_OBJECT: 'MyCustomObject',
        ACRONYMS: 'acronyms',
        isValueValid: function (value) {
            const objectTypes = Object.values(this)
            return objectTypes.includes(value)
        }

    }
}