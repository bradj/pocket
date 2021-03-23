const { query } = require('@root/db');
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

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Page}
 */
const getByUsername = async (username) => {
  try {
    log.info('Getting posts by username', username);
    const text = `select
      pa.name, po.id, po.page_id, po.location, po.caption, po.created_at from posts po
      join
      pages pa on pa.id = po.page_id
      where
      pa.account_id = (select id from accounts where username = $1) and
      po.is_disabled = false and
      pa.is_disabled = false
      order by
      created_at desc;`;
    const values = [username];

    const res = await query(text, values);

    return res.rows;
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, error);
    throw error;
  }
};

const getInstanceFeed = async (limit) => {
  try {
    log.info('Getting instance feed with limit', limit);

    const text = `SELECT
  po.id, po.location, po.caption, po.created_at, pa.name
FROM
  posts po
join
  pages pa on pa.id = po.page_id
where
  po.is_disabled = false
  and pa.is_disabled = false
order by po.created_at desc ${limit ? `limit ${limit}` : ''};`;

    const res = await query(text);

    return res.rows;
  } catch (error) {
    log.error('Could not retrieve instance feed', error);
    throw error;
  }
};

module.exports = {
  getByUsername,
  getInstanceFeed,
};
