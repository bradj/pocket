const { query } = require('@root/db');
const log = require('@root/log');
const assert = require('assert');

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

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Page}
 */
const getByUsername = async (username) => {
  try {
    const text = `select p.name, p.id, p.account_id from pages p
      join accounts acc on p.account_id = acc.id
      where acc.username = $1 and p.is_disabled = false and acc.is_disabled = false;`;
    const values = [username];

    const res = await query(text, values);

    assert(res.rows.length === 1);

    return res.rows[0];
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, { error });
    throw error;
  }
};

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Page}
 */
const getByAccountId = async (accountId) => {
  try {
    const text = 'select name, id from pages where account_id = $1 and is_disabled = false';
    const values = [accountId];

    const res = await query(text, values);

    assert(res.rows.length === 1);

    return res.rows[0];
  } catch (error) {
    log.error(`Could not retrieve account for ${accountId}`, error);
    throw error;
  }
};

/**
 * Creates a page and associates it with the username. Supplying the accountId
 * saves a trip to the database
 * @param {string} username
 * @param {string?} accountId
 */
const create = async (username, accountId) => {
  let text;
  let values;

  if (!username) {
    throw new Error('Username and accountId are null');
  }

  if (accountId) {
    // since we have the accountId ... no need to fetch it
    text = 'INSERT INTO pages(account_id, name) VALUES($1, $2);';
    values = [accountId, username];
  } else {
    // fetch accountId via username before inserting
    text = "INSERT INTO pages(account_id, name) VALUES((select id from accounts where username = '$1'), $1);";
    values = [username];
  }

  try {
    await query(text, values);
    log.info(`Created page for ${username}`);
  } catch (error) {
    log.error(`Could not create page for ${username}`, { error });
    throw error;
  }
};

/**
 * Adds a post to the username's page
 * @param {string} username
 * @param {string} location
 * @param {string?} caption
 */
const addPost = async (pageId, location, caption) => {
  const text = `INSERT INTO posts(
    page_id, location, caption)
    VALUES ($1, $2, $3);`;
  const values = [pageId, location, caption];

  try {
    await query(text, values);
    log.info(`Created new post for page ${pageId}`);
  } catch (error) {
    log.error(`Could not create post for ${pageId}`, { error });
    throw error;
  }
};

module.exports = {
  addPost,
  getByUsername,
  getByAccountId,
  create,
};
