const { MongoClient } = require('mongodb');
const log = require('@root/log');

/**
 * @type {MongoClient}
 */
let client;

/**
 * Adds event listeners to MongoCLient
 * @param {MongoClient} client
 */
const createEventHooks = (_client) => {
  _client.on('serverOpening', (event) => {
    log.debug('received serverOpening', event);
  });

  _client.on('serverClosed', (event) => {
    log.debug('received serverClosed', event);
  });

  _client.on('serverHeartbeatFailed', (event) => {
    log.debug('received serverHeartbeatFailed', event);
  });
};

/**
 * Initializes MongoDB connection
 */
const init = async () => {
  if (client && await !client.isConnected()) {
    try {
      await client.connect();
    } catch (error) {
      log.error('Error closing MongoDB connection', error);
      return;
    }
  }

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;

  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  createEventHooks(client);

  try {
    await client.connect();

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });
    log.info('Connected to MongoDB');
  } catch (err) {
    log.error('Error connecting to Mongo', err);
  }
};

/**
 * Retrieves the active MongoClient
 * @returns {MongoClient}
 */
const getClient = async () => {
  if (!client) {
    await init();
  }

  return client;
};

/**
 * Gets collection from Mongo
 * @param {string} collection
 * @returns {Collection}
 */
const getCollection = async (collection) => {
  if (!client) {
    await init();
  }

  return client.db('pocket').collection(collection);
};

module.exports = {
  init,
  getClient,
  getCollection,
};
