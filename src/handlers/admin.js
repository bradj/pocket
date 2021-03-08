const bcrypt = require('bcrypt');
const account = require('@models/account');
const page = require('@models/page');
const log = require('@root/log');

const saltRounds = 12;

/**
 * Creates Account and Page documents. Sets Page owner to newly created Account.
 * @param {import("koa").Context} ctx
 */
const createAccount = async (ctx) => {
  const {
    email, username, password, confirmPassword,
  } = ctx.request.body;

  if (password !== confirmPassword) {
    ctx.throw(400, 'Passwords do not match', { email, username });
  }

  log.info('Creating account', { email, username });

  const hash = await bcrypt.hash(password, saltRounds);

  try {
    await account.create(email, username, hash);
  } catch (error) {
    log.error('Could not create account', { username, error });
    ctx.throw(500, 'Creation failure. Please try again.');
  }

  try {
    await page.create(username);
  } catch (error) {
    log.error('Could not create page', { username, error });
    ctx.throw(500, 'Creation failure. Please try again.');
  }

  ctx.body = { success: true };
};

module.exports = {
  createAccount,
};
