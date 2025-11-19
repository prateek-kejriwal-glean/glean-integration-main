let gleanClient = globalThis.gleanClient;

async function getAnswers(req, res, next) {
  const authToken = req.authToken;
  const apiHost = req.apiHost;

  if (!authToken) next(new Error("Invalid Input"));
  globalThis.log(`Getting Answer boards`);
  const response = await gleanClient.getAnswers(authToken, apiHost);
  if (response.statusCode < 400) {
    globalThis.log(`Fetched Answer Boards`);
    res.statusCode = response.statusCode;
    res.send(response.data);
  } else {
    globalThis.log(`Could not fetch answer boards`);
  }
  next();
}

module.exports = { getAnswers };
