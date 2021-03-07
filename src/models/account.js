const { getCollection } = require('@root/db');
const log = require('@root/log');

/**
 * Pocket Account model
 * @typedef {Object} Account
 * @property {string} email - Account email
 * @property {string} username - Account username
 * @property {string} hash - Account password hash
 * @property {boolean} disabled - Is this account disabled
 * @property {string[]} pages - List of owned pages
 */

let accounts;

/**
 * Initializes account collection
 */
const init = async () => {
  if (!accounts) {
    accounts = await getCollection('accounts');
  }

  return accounts;
};

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Account}
 */
const getByUsername = async (username) => {
  await init();

  try {
    return await accounts.findOne({ username });
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, error);
  }

  return null;
};

/**
 * Retrieves a user account
 * @param {String} email
 * @returns {Account}
 */
const getByEmail = async (email) => {
  await init();

  try {
    return await accounts.findOne({ email });
  } catch (error) {
    log.error(`Could not retrieve account for ${email}`, error);
  }

  return null;
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
  getByUsername,
  getByEmail,
  create,
};
