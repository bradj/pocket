/**
 * Gets post by id
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const getById = async (ctx) => {
  ctx.body = 'getById';
};

/**
 * Performs addComment
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addComment = async (ctx) => {
  ctx.body = 'addComment';
};

module.exports = {
  getById,
  addComment,
};
