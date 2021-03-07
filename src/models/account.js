const { getCollection } = require('@root/db');
const log = require('@root/log');

// email = StringField(required = True, max_length = 64)
// username = StringField(required = True, max_length = 30)
// password = StringField(required = True, max_length = 128)
// disabled = BooleanField(default=False)
// pages

let accounts;

const init = async () => {
  if (!accounts) {
    accounts = await getCollection('accounts');
  }
};

/**
 * Retrieves a user account
 * @param {String} id
 */
const get = async (id) => {
  init();

  try {
    const account = await accounts.findOne({ _id: id });
    log.info('Found account', account);
  } catch (error) {
    log.error(`Could not retrieve account for ${id}`, error);
  }
};

/**
 * Creates a user account
 * @param {string} email
 * @param {string} username
 * @param {string} password hash
 */
const create = async (email, username, hash) => {
  await init();

  const doc = { email, username, hash };

  try {
    const result = await accounts.insertOne(doc);
    log.info(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    log.error(`Could not create account for ${email}`, error);
  }
};

module.exports = {
  get,
  create,
};
