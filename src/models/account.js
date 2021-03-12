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
const getByUsername = async (username, includeHash) => {
  try {
    const text = `select id, username, email${includeHash === true ? ', hash' : ''} from accounts where username = $1 and is_disabled = false`;
    const values = [username];

    const res = await query(text, values);
    return res.rows[0];
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
const create = async (email, username, hash) => {
  let accountId;

  log.info('Creating account', { email, username });

  try {
    const text = 'INSERT INTO accounts(username, email, hash) VALUES($1, $2, $3) RETURNING *';
    const values = [username, email, hash];
    const res = await query(text, values);
    accountId = res.rows[0].id;

    log.info(`Created account for ${username} at id ${accountId}`);

    return accountId;
  } catch (error) {
    log.error(`Could not create account for ${email} / ${username}`, { error });
    throw error;
  }
};

module.exports = {
  getByUsername,
  getByEmail,
  create,
};
