const bcrypt = require('bcrypt');
const accounts = require('@models/account');
const pages = require('@models/page');
const log = require('@root/log');
const { cookieOrToken, createJwt, createAccountResponse } = require('@handlers/util');

/**
 * Performs login
 * @param {import("koa").Context} ctx
 */
const login = async (ctx) => {
  log.info('Auth Body', ctx.request.body);
  const { username, password } = ctx.request.body;
  const account = await accounts.getByUsername(username, true);

  if (!account) {
    log.error('Failed login attempt: user not found', username);
    ctx.throw(400, 'Either your username does not exist or your password does not match the existing user');
  }

  const result = await bcrypt.compare(password, account.hash);

  if (result !== true) {
    log.error('Failed login attempt: password mismatch', username);
    ctx.throw(400, 'Either your username does not exist or your password does not match the existing user');
  }

  const page = await pages.getByAccountId(account.id);
  const token = createJwt(account, page);
  const returnedAccount = createAccountResponse(account, page);

  cookieOrToken(ctx, returnedAccount, token);
};

/**
 * Performs logout
 * @param {import("koa").Context} ctx
 */
const logout = async (ctx) => {
  ctx.cookies.set('pocketcookie', null);
  ctx.body = 'Logged out';
};

module.exports = {
  login,
  logout,
};
