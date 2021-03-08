const log = require('@root/log');
const path = require('path');
const { writeFile } = require('fs').promises;

/**
 * Performs feed
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feed = async (ctx) => {
  ctx.body = { success: true };
};

/**
 * Performs feedById
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feedById = async (ctx) => {
  ctx.body = { success: true };
};

/**
 * Adds a post to the current user
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addPost = async (ctx) => {
  const { username } = ctx.state.user.data;
  const { id } = ctx.params;

  if (username !== id) {
    log.error(`User ${username} attempted to modify resources that aren't theirs`);
    ctx.throw(403);
  }

  if (!ctx.request.file) {
    log.error(`User ${username} attempted an upload without attaching a file`);
    ctx.throw(400);
  }

  const { file } = ctx.request;
  const uploadDir = process.env.POCKET_UPLOAD_DIR;
  const location = path.normalize(path.join(uploadDir, file.originalname));

  log.info('Saving file', {
    username, name: file.originalname, size: file.size, mimetype: file.mimetype,
  });

  try {
    await writeFile(location, file.buffer);
  } catch (error) {
    log.error('Could not upload file', { username, location, size: file.size });
    ctx.throw(500, 'Unfortunately, we were unable to save your file. Please try again.');
  }

  ctx.body = { success: true };
};

module.exports = {
  feed,
  feedById,
  addPost,
};
