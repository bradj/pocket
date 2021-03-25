const jwt = require('jsonwebtoken');
const log = require('@root/log');

const mustBeSameUser = async (ctx, next) => {
  const { username } = ctx.state.user.data;

  if (username !== ctx.params.username) {
    log.error(`User ${username} attempted to modify resources that aren't theirs`);
    ctx.throw(403);
  }

  await next();
};

const accountWithoutHash = (account) => {
  const data = {
    ...account,
  };

  // Removed the hashed password
  delete data.hash;

  return data;
};

const createJwt = (account, page) => {
  const data = {
    ...accountWithoutHash(account),
    page,
  };

  return jwt.sign(
    {
      data,
    },
    process.env.SECRET_KEY,
    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_MINUTES ?? 60}m` },
  );
};

const createAccountResponse = (account, page) => ({
  username: account.username,
  email: account.email,
  avatar: account.avatar,
  tagline: account.tagline,
  disabled: account.is_disabled === true,
  createdAt: account.created_at,
  updatedAt: account.updated_at,
  page,
});

const cookieOrToken = (ctx, account, token) => {
  const { type: authType } = ctx.request.query;
  const msToExpiration = parseInt(process.env.ACCESS_TOKEN_EXPIRES_MINUTES ?? 60, 10) * 60 * 1000;

  if (authType === 'token') {
    ctx.body = {
      token_type: 'Bearer',
      access_token: token,
      account,
    };
  } else {
    const cookieBody = {
      maxAge: msToExpiration,
      httpOnly: true,
      overwrite: true,
      sameSite: 'Strict',
    };

    ctx.cookies.set('pocketcookie', token, cookieBody);
    ctx.body = { account };
  }
};

module.exports = {
  mustBeSameUser,
  createJwt,
  createAccountResponse,
  accountWithoutHash,
  cookieOrToken,
};
