const posts = require('@models/post');
const log = require('@root/log');

/**
 * Gets post by id
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const getById = async (ctx) => {
  log.info('GetById', { user: ctx.state.user });
  ctx.body = 'getById ';
};

/**
 * Performs addComment
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addComment = async (ctx) => {
  ctx.body = 'addComment';
};

const getPosts = async (ctx) => {
  ctx.body = await posts.getInstanceFeed();
};

module.exports = {
  getById,
  addComment,
  getPosts,
};
