module.exports = {
  PATHS: {
    INDEX_DOCUMENTS: "/api/index/v1/indexdocuments",
    INDEX_DOCUMENT: "/api/index/v1/indexdocument",
    ADD_OR_UPDATE_DATA_SOURCES: "/api/index/v1/adddatasource",
    GET_DATA_SOURCES: "/api/index/v1/getdatasourceconfig",
    GET_DATA_SOURCES_STATUS: "/api/index/v1/debug/{datasource}/status",
    CHECK_USER_IN_DS: "/api/index/v1/debug/{datasource}/user",
    INDEX_USER_IN_DS: "/api/index/v1/indexuser",
    SEARCH: "/rest/api/v1/search",
    CHAT: "/rest/api/v1/chat",
    CHAT_LIST: "/rest/api/v1/listchats",
    CHAT_GET: "/rest/api/v1/getchat",
    CHAT_DELETE: "/rest/api/v1/deletechats",
    AUTOCOMPLETE: "/rest/api/v1/autocomplete",
    INDEX_USER: "/api/index/v1/indexuser",
    INDEX_USER: "/api/index/v1/indexgroup",
    CREATE_AUTH_TOKEN: "/rest/api/v1/createauthtoken",
    GET_ANSWERS: "/rest/api/v1/listanswers",
  },
  MIME_TYPES: {
    TEXT_HTML: "text/html",
    TEXT: "text/plain",
    APPLICATION_JSON: "application/json",
    APPLICATION_PDF: "application/pdf",
  },
  OBJECT_TYPES: {
    INTERVIEW_DOC: "InterviewDoc",
    CUSTOM_OBJECT: "MyCustomObject",
    ACRONYMS: "acronyms",
    isValueValid: function (value) {
      const objectTypes = Object.values(this);
      return objectTypes.includes(value);
    },
  },
};
