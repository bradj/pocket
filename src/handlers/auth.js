const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accounts = require('@models/account');
const pages = require('@models/page');
const log = require('@root/log');

/**
 * Performs login
 * @param {import("koa").Context} ctx
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const account = await accounts.getByUsername(username, true);

  if (!account) {
    log.error('Failed login attempt: user not found', { username });
    ctx.throw(400, 'Either your username does not exist or your password does not match the existing user');
  }

  const result = await bcrypt.compare(password, account.hash);

  if (result !== true) {
    log.error('Failed login attempt: password mismatch', { username });
    ctx.throw(400, 'Either your username does not exist or your password does not match the existing user');
  }

  const page = await pages.getByAccountId(account.id);

  const token = jwt.sign(
    {
      data: {
        id: account.id, username: account.username, email: account.email, page,
      },
    },
    process.env.SECRET_KEY,
    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_MINUTES ?? 60}m` },
  );

  const expirationTime = 60 * parseInt(process.env.ACCESS_TOKEN_EXPIRES_MINUTES ?? 60, 10);

  ctx.body = {
    token_type: 'Bearer',
    expires_in: expirationTime,
    expires_on: Date.now() + (expirationTime * 1000),
    access_token: token,
  };
};

/**
 * Performs logout
 * @param {import("koa").Context} ctx
 */
const logout = async (ctx) => {
  ctx.body = 'Logout';
};

module.exports = {
  login,
  logout,
};
