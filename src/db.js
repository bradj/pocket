const { MongoClient } = require('mongodb');

let client;

/**
 * Retrieves the active MongoClient
 * @returns {MongoClient}
 */
const getClient = () => client;

/**
 * Initializes MongoDB connection
 */
const init = async () => {
  if (client) {
    return;
  }

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;

  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } catch (err) {
    console.log('Error connecting to Mongo', err);
  }
};

module.exports = {
  init,
  getClient,
};
