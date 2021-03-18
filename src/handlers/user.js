const posts = require('@models/post');
const pages = require('@models/page');
const log = require('@root/log');
const util = require('@util');
const path = require('path');
const { writeFile } = require('fs').promises;

/**
 * Performs feedByUsername
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const feedByUsername = async (ctx) => {
  const { username } = ctx.params;

  ctx.body = await posts.getByUsername(username);
};

/**
 * Adds a post to the current user
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const addPost = async (ctx) => {
  const { username, page } = ctx.state.user.data;
  let { caption } = ctx.request.body;

  if (username !== ctx.params.username) {
    log.error(`User ${username} attempted to modify resources that aren't theirs`);
    ctx.throw(403);
  }

  if (!ctx.request.file) {
    log.error(`User ${username} attempted an upload without attaching a file`);
    ctx.throw(400);
  }

  const { file } = ctx.request;
  const uploadDir = process.env.POCKET_UPLOAD_DIR;
  const extension = file.originalname.split('.').slice(-1).pop();
  const fileName = `${util.createUniqueFileName(file.originalname)}.${extension}`;
  const saveLocation = path.normalize(path.join(uploadDir, fileName));

  log.info('Saving file', {
    username, name: file.originalname, size: file.size, mimetype: file.mimetype,
  });

  try {
    await writeFile(saveLocation, file.buffer);
  } catch (error) {
    log.error('Could not upload file', username, saveLocation, file.size);
    ctx.throw(500, 'Unfortunately, we were unable to save your file. Please try again.');
  }

  if (!caption) {
    caption = '';
  }

  const clientRoute = `/cdn/${fileName}`;

  try {
    await pages.addPost(page.id, clientRoute, caption);
  } catch (error) {
    log.error('Could not create post', { username, clientRoute, error });
    ctx.throw(500, 'Unfortunately, we were unable to create your post. Please try again.');
  }

  ctx.body = { success: true };
};

module.exports = {
  feedByUsername,
  addPost,
};
