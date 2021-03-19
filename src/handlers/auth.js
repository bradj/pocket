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
  log.info('Auth Body', ctx.request.body);
  const { username, password } = ctx.request.body;
  const { type: authType } = ctx.request.query;
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

  const msToExpiration = parseInt(process.env.ACCESS_TOKEN_EXPIRES_MINUTES ?? 60, 10) * 60 * 1000;
  const user = {
    username: account.username,
    email: account.email,
    page,
  };

  if (authType === 'token') {
    ctx.body = {
      token_type: 'Bearer',
      access_token: token,
      user,
    };
  } else {
    const cookieBody = {
      maxAge: msToExpiration,
      httpOnly: true,
      overwrite: true,
      sameSite: 'Lax',
    };

    ctx.cookies.set('pocketcookie', token, cookieBody);
    ctx.body = { user };
  }
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
