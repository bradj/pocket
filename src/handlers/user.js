/**
 * Performs feed
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feed = async (ctx, next) => {
  ctx.body = 'feed';
};

/**
 * Performs feedById
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feedById = async (ctx, next) => {
  ctx.body = 'feedById';
};

/**
 * Adds a post to the current user
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addPost = async (ctx, next) => {
  ctx.body = 'addPost';
};

module.exports = {
  feed,
  feedById,
  addPost,
};
