const { getCollection } = require('@root/db');
const log = require('@root/log');

/**
 * Pocket Page model
 * @typedef {Object} Page
 * @property {string} username - Account ID of the username
 * @property {string[]} posts - List of posts
 */

/**
 * Pocket Post model
 * @typedef {Object} Post
 * @property {string} location - Where the file is located
 * @property {Date} created - When the post was created
 * @property {string[]} tags - Collection of searchable post tags
 * @property {object[]} comments - Collection of post comments
 */

let rootPages;

/**
 * Initializes account collection
 */
const init = async () => {
  if (!rootPages) {
    rootPages = await getCollection('pages');
  }

  return rootPages;
};

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Account}
 */
const getByUsername = async (username) => {
  const pages = await init();

  try {
    return await pages.findOne({ username });
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, { error });
    throw error;
  }
};

/**
 * Creates a page and associates it with the username
 * @param {string} username
 */
const create = async (username) => {
  const pages = await init();
  const doc = {
    username,
    posts: [],
    $currentDate: {
      created: true,
    },
  };

  try {
    await pages.insertOne(doc);
  } catch (error) {
    log.error(`Could not create account for ${username}`, { error });
    throw error;
  }
};

/**
 * Adds a post to the username's page
 * @param {string} username
 * @param {string} location
 */
const addPost = async (username, location) => {
  const pages = await init();
  const filter = { username };
  const updateDoc = {
    $push: {
      posts: {
        location,
        created: new Date().getTime(),
      },
    },
  };

  await pages.updateOne(filter, updateDoc, { upsert: false });
};

module.exports = {
  addPost,
  getByUsername,
  create,
};
