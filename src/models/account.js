const { query } = require('@root/db');
const log = require('@root/log');

/**
 * Pocket Account model
 * @typedef {Object} Account
 * @property {string} email - Account email
 * @property {string} username - Account username
 * @property {string} hash - Account password hash
 * @property {boolean} disabled - Is this account disabled
 */

/**
 * Retrieves a user account
 * @param {String} username
 * @returns {Account}
 */
const getByUsername = async (username) => {
  try {
    return query(`select id, username, email from accounts where username = '${username}' and is_disabled = false`);
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, { error });
  }

  return null;
};

/**
 * Retrieves a user account
 * @param {String} email
 * @returns {Account}
 */
const getByEmail = async (email) => {
  try {
    return query(`select id, username, email from accounts where email = '${email}' and is_disabled = false`);
  } catch (error) {
    log.error(`Could not retrieve account for ${email}`, { error });
  }

  return null;
};

/**
 * Creates an account and page
 * @param {string} email
 * @param {string} username
 * @param {string} password hash
 */
const create = async (email, username, hash, salt) => {
  let accountId;

  try {
    const text = 'INSERT INTO accounts(username, email, hash, salt) VALUES($1, $2, $3, $4);';
    const values = [username, email, hash, salt];
    const rows = await query(text, values);
    accountId = rows[0].id;

    log.info(`Created account for ${username} at id ${accountId}`);
  } catch (error) {
    log.error(`Could not create account for ${email} / ${username}`, { error });
    throw error;
  }

  try {
    const text = 'INSERT INTO pages(account_id, name) VALUES($1, $2);';
    const values = [accountId, username];
    const rows = await query(text, values);

    log.info(`Created page for ${username} at id ${rows[0].id}`);
  } catch (error) {
    log.error(`Could not create page for ${username}`, { error });
    throw error;
  }
};

module.exports = {
  getByUsername,
  getByEmail,
  create,
};
