/**
 * Performs feed
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feed = async (ctx) => {
  ctx.body = 'feed';
};

/**
 * Performs feedById
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feedById = async (ctx) => {
  ctx.body = 'feedById';
};

/**
 * Adds a post to the current user
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addPost = async (ctx) => {
  ctx.body = 'addPost';
};

module.exports = {
  feed,
  feedById,
  addPost,
};
