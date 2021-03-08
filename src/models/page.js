const { getCollection } = require('@root/db');
const log = require('@root/log');

/**
 * Pocket Page model
 * @typedef {Object} Page
 * @property {string} username - Account ID of the username
 * @property {string[]} posts - List of posts
 */

let pages;

/**
 * Initializes account collection
 */
const init = async () => {
  if (!pages) {
    pages = await getCollection('pages');
  }

  return pages;
};

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Account}
 */
const getByUsername = async (username) => {
  await init();

  try {
    return await pages.findOne({ username });
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, error);
  }

  return null;
};

/**
 * Creates a page and associates it with the username
 * @param {string} username
 */
const create = async (username) => {
  await init();

  const doc = { username, posts: [] };

  try {
    await pages.insertOne(doc);
  } catch (error) {
    log.error(`Could not create account for ${username}`, error);
  }
};

module.exports = {
  getByUsername,
  create,
};
