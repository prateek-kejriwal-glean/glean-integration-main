let gleanClient = globalThis.gleanClient;
const DocumentModel = require("../models/document");
const crypto = require("crypto");

async function indexDocuments(req, res, next) {
  const authToken = req.authToken;
  const apiHost = req.apiHost;

  if (!authToken) next(new Error("Invalid Input"));
  globalThis.log(`Creating Glean Documents`);
  const dataSources = req.body?.dataSources ?? [];
  const files = req.body?.files ?? [];
  const gleanDocs = [];
  const results = [];

  for (const dataSource of dataSources) {
    globalThis.log(`Creating Glean docs for datasource - ${dataSource}`);
    for (const file of files) {
      const hasher = crypto.createHash("sha256");
      const hash = hasher.update(file.name).digest("hex");
      const document = new DocumentModel();
      document.setDataSource(dataSource);
      document.setViewURL(file.viewURL ?? `https://example.com/docs/${hash}`);
      document.setPermissions({
        allowAnonymousAccess: file.allowAnonymousAccess,
      });
      document.setProperty("title", file.name);
      document.setProperty("body", {
        mimeType: file.type,
        binaryContent: file.content,
      });
      document.setProperty("tags", file.tags.split(","));
      document.objectType = file.gleanObjectType;
      document.id = hash;
      document.updatedAt = parseInt(Date.now() / 1000);
      gleanDocs.push(document);
    }

    globalThis.log(`Checking Data Sources - ${dataSources}`);
    globalThis.log(`Created Glean Documents - ${gleanDocs.length}`);

    const dsResponse = await gleanClient.getDataSourceConfig(
      apiHost,
      authToken,
      dataSource
    );
    if (dsResponse.statusCode < 400) {
      globalThis.log(`DataSource Exists `, dsResponse.data);
      const objectTypes = new Set();
      gleanDocs.forEach((doc) => {
        objectTypes.add(doc.objectType);
      });
      await upsertObjectDefinition(
        apiHost,
        authToken,
        dsResponse.data,
        objectTypes.values()
      );
    } else {
      globalThis.log(`DataSource does not exist. Cannot upload.`);
    }

    globalThis.log(
      `Indexing Glean Documents - ${files
        .map((file) => file.name)
        .join(" ; ")} for Data Source - ${dataSource}`
    );
    const response = await gleanClient.indexDocuments(
      apiHost,
      authToken,
      dataSource,
      gleanDocs
    );
    const result = { dataSource, response };
    results.push(result);
    if (response.statusCode < 400) {
      globalThis.log(
        `Indexed Glean Documents - ${files
          .map((file) => file.name)
          .join(" ; ")} for Data Source - ${dataSource}`
      );
    } else {
      globalThis.log(
        `Could not index Glean Documents - ${files
          .map((file) => file.name)
          .join(" ; ")} for Data Source - ${dataSource}`
      );
    }
  }
  res.statusCode = 200;
  res.send(results);

  next();
}

async function upsertObjectDefinition(
  apiHost,
  authToken,
  dataSource,
  objectTypes
) {
  const objectDefs = dataSource.objectDefinitions ?? [];
  for (const objectType of objectTypes) {
    if (
      objectDefs.findIndex(
        (objectDefinition) => objectDefinition.name === objectType
      ) < 0
    ) {
      const objectDef = { name: objectType, docCategory: "PUBLISHED_CONTENT" };
      objectDefs.push(objectDef);
    }
  }
  dataSource.objectDefinitions = objectDefs;
  dataSource.name = dataSource.name.startsWith("CUSTOM_")
    ? dataSource.name.replace("CUSTOM_", "")
    : dataSource.name;
  const dsResponse = await gleanClient.addOrUpdateDataSource(
    apiHost,
    authToken,
    dataSource
  );
  if (dsResponse.statusCode < 400) {
    globalThis.log(`DataSource Updated `, dsResponse.data);
  } else {
    globalThis.log(`DataSource does not exist. Cannot upload.`);
  }
  return dsResponse;
}

async function getStatus(req, res, next) {
  const authToken = req.authToken;
  const apiHost = req.apiHost;

  if (!authToken) next(new Error("Invalid Input"));
  const dataSources = req.body?.dataSources;
  globalThis.log(`Getting status for Data Source - ${dataSources}`);
  const results = [];
  for (const dataSource of dataSources) {
    const response = await gleanClient.getDataSourceStatus(
      apiHost,
      authToken,
      dataSource
    );
    const result = { dataSource, response };
    results.push(result);
    if (response.statusCode < 400) {
      globalThis.log(`Fetched upload jobs for Data Source - ${dataSource}`);
    } else {
      globalThis.log(
        `Could not fetch upload jobs for Data Source - ${dataSource}`
      );
    }
    res.send(results);
  }

  next();
}

async function checkUsersInDs(req, res, next) {
  const authToken = req.authToken;
  const apiHost = req.apiHost;

  if (!authToken) next(new Error("Invalid Input"));
  globalThis.log(`Checking users for their presence in data sources`);
  const dataSources = req.body?.dataSources ?? [];
  const userEmailIds = req.body?.userEmailIds ?? [];
  const results = [];

  for (const dataSource of dataSources) {
    globalThis.log(`Checking datasource - ${dataSource}`);
    for (const userEmailId of userEmailIds) {
      globalThis.log(
        `Checking User - ${userEmailId} in Data Source - ${dataSource}`
      );

      const dsResponse = await gleanClient.checkUsersInDs(
        apiHost,
        authToken,
        dataSource,
        userEmailId
      );
      if (dsResponse.statusCode < 400) {
        globalThis.log(
          `Result for user ${userEmailId} in DataSource ${dataSource} `,
          dsResponse.data
        );
        results.push({ userEmailId, data: dsResponse.data });
      } else {
        results.push({ data: dsResponse.data });
        globalThis.log(
          `Could not fetch user ${userEmailId} in DataSource ${dataSource}`
        );
      }
    }
  }
  res.statusCode = 200;
  res.send(results);

  next();
}

async function indexUsersInDs(req, res, next) {
  const authToken = req.authToken;
  const apiHost = req.apiHost;

  if (!authToken) next(new Error("Invalid Input"));
  globalThis.log(`Indexing users in data sources`);
  const dataSources = req.body?.dataSources ?? [];
  const userEmailIds = req.body?.userEmailIds ?? [];
  const results = [];

  for (const dataSource of dataSources) {
    globalThis.log(`Processing datasource - ${dataSource}`);
    for (const userEmailId of userEmailIds) {
      globalThis.log(
        `Indexing User - ${userEmailId} in Data Source - ${dataSource}`
      );

      const dsResponse = await gleanClient.indexUsersInDs(
        apiHost,
        authToken,
        dataSource,
        userEmailId
      );
      if (dsResponse.statusCode < 400) {
        globalThis.log(
          `Result for user ${userEmailId} in DataSource ${dataSource} `,
          dsResponse.data
        );
        results.push({ userEmailId, data: dsResponse.data });
      } else {
        results.push({ data: dsResponse.data });
        globalThis.log(
          `Could not index user ${userEmailId} in DataSource ${dataSource}`
        );
      }
    }
  }
  res.statusCode = 200;
  res.send(results);

  next();
}

module.exports = { indexDocuments, getStatus, checkUsersInDs, indexUsersInDs };
