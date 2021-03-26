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
    const text = `select id, tagline, avatar, username, created_at, updated_at, email${includeHash === true ? ', hash' : ''} from accounts where username = $1 and is_disabled = false`;
    const values = [username];

    const res = await query(text, values);
    return res.rows[0];
  } catch (error) {
    log.error(`Could not retrieve account for ${username}`, { error });
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

const update = async (username, email, tagline, avatar, disabled) => {
  try {
    const text = `update accounts set 
      email = $2,
      tagline = $3,
      avatar = $4,
      is_disabled = ${disabled === true},
      updated_at = CURRENT_TIMESTAMP
      where username = $1;`;
    const values = [username, email, tagline, avatar];
    await query(text, values);
  } catch (error) {
    log.error(`Could not updated account ${username}`, error);
    throw error;
  }
};

module.exports = {
  getByUsername,
  create,
  update,
};
