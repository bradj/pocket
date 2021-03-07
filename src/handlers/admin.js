const bcrypt = require('bcrypt');
const account = require('@models/account');
const log = require('@root/log');

const saltRounds = 12;

/**
 * Create Account
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
    ctx.body = { success: true };
  } catch (error) {
    log.error('Could not create account', error);
    ctx.throw(500, 'Could not create account');
  }
};

module.exports = {
  createAccount,
};
