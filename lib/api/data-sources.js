const { PATHS } = require("../constants/index");
let config = undefined;
const axios = require("axios");

function setConfig(conf) {
  config = conf;
}

async function addOrUpdateDataSource(apiHost, authToken, dataSource) {
  const request = dataSource;
  const axiosRequest = {
    method: "POST",
    baseURL: apiHost,
    url: PATHS.ADD_OR_UPDATE_DATA_SOURCES,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json",
    },
    data: JSON.stringify(request),
  };
  try {
    const response = await axios(axiosRequest);
    return { statusCode: response.status, data: response.data };
  } catch (exc) {
    return { statusCode: response.status, data: exc.response.data };
  }
}

async function getDataSourceConfig(apiHost, authToken, dataSourceName) {
  const axiosRequest = {
    method: "POST",
    baseURL: apiHost,
    url: PATHS.GET_DATA_SOURCES,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json",
    },
    data: { datasource: config.dataSourceId ?? dataSourceName },
  };
  try {
    const response = await axios(axiosRequest);
    return { statusCode: response.status, data: response.data };
  } catch (exc) {
    return { statusCode: exc.status, data: exc.response.data };
  }
}

async function getDataSourceStatus(apiHost, authToken, dataSourceName) {
  const axiosRequest = {
    method: "POST",
    baseURL: apiHost,
    url: PATHS.GET_DATA_SOURCES_STATUS.replace("{datasource}", dataSourceName),
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json",
    },
    data: { datasource: config.dataSourceId ?? dataSourceName },
  };
  try {
    const response = await axios(axiosRequest);
    return { statusCode: response.status, data: response.data };
  } catch (exc) {
    return { statusCode: exc.status, data: exc.response.data };
  }
}

async function checkUsersInDs(apiHost, authToken, dataSourceName, userEmailId) {
  const axiosRequest = {
    method: "POST",
    baseURL: apiHost,
    url: PATHS.CHECK_USER_IN_DS.replace("{datasource}", dataSourceName),
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json",
    },
    data: { email: userEmailId },
  };
  try {
    const response = await axios(axiosRequest);
    return { statusCode: response.status, data: response.data };
  } catch (exc) {
    return { statusCode: exc.status, data: exc.response.data };
  }
}

async function indexUsersInDs(apiHost, authToken, dataSourceName, userEmailId) {
  const axiosRequest = {
    method: "POST",
    baseURL: apiHost,
    url: PATHS.INDEX_USER_IN_DS,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json",
    },
    data: {
      datasource: dataSourceName,
      user: { email: userEmailId, isActive: true },
    },
  };
  try {
    const response = await axios(axiosRequest);
    return { statusCode: response.status, data: response.data };
  } catch (exc) {
    return { statusCode: exc.status, data: exc.response.data };
  }
}

module.exports = {
  getDataSourceConfig,
  addOrUpdateDataSource,
  setConfig,
  getDataSourceStatus,
  checkUsersInDs,
  indexUsersInDs
};
