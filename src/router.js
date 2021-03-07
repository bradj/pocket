const Router = require('@koa/router');
const authHandler = require('@handlers/auth');
const userHandler = require('@handlers/user');
const postHandler = require('@handlers/post');

/**
 * Generates User routes
 * @returns {Router} Koa router
 */
const user = () => {
  const router = new Router({
    prefix: '/u',
  });

  router.get('/', userHandler.feed);
  router.get('/:id', userHandler.feedById);
  router.post('/:id', userHandler.addPost);

  return router;
};

/**
 * Generates Auth routes
 * @returns {Router} Koa router
 */
const auth = () => {
  const router = new Router({
    prefix: '/auth',
  });

  router.post('login', authHandler.login);
  router.post('logout', authHandler.logout);

  return router;
};

/**
 * Generates Post routes
 * @returns {Router} Koa router
 */
const post = () => {
  const router = new Router({
    prefix: '/p',
  });

  router.get('/:id', postHandler.getById);
  router.post('/:id/comments', postHandler.addComment);

  return router;
};

/**
 * Initializes Pocket routes
 * @param {Koa} app
 */
const init = (app) => {
  const authRouter = auth();
  const userRouter = user();
  const postRouter = post();

  // Public routes
  app.use(authRouter.routes(), authRouter.allowedMethods());

  // Add auth middleware

  // AuthZ routes
  app.use(postRouter.routes(), postRouter.allowedMethods());
  app.use(userRouter.routes(), userRouter.allowedMethods());
};

module.exports = init;