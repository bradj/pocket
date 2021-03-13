const jwt = require('koa-jwt');
const Router = require('@koa/router');
const authHandler = require('@handlers/auth');
const userHandler = require('@handlers/user');
const postHandler = require('@handlers/post');
const adminHandler = require('@handlers/admin');
const multer = require('@koa/multer');

/**
 * Generates User routes
 * @returns {Router} Koa router
 */
const user = () => {
  const router = new Router({
    prefix: '/u',
  });
  const upload = multer();

  router.get('/:username', userHandler.feedByUsername);
  router.post('/:username', upload.single('image'), userHandler.addPost);

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

  router.post('/login', authHandler.login);
  router.post('/logout', authHandler.logout);

  return router;
};

/**
 * Generates Admin routes
 * @returns {Router} Koa router
 */
const admin = () => {
  const router = new Router({
    prefix: '/a',
  });

  // create a new account
  router.post('/accounts', adminHandler.createAccount);

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
  const adminRouter = admin();

  // Public routes
  app.use(authRouter.routes(), authRouter.allowedMethods());

  // Add auth middleware
  app.use(jwt({ secret: process.env.SECRET_KEY }));

  // AuthZ routes
  app.use(adminRouter.routes(), adminRouter.allowedMethods());
  app.use(postRouter.routes(), postRouter.allowedMethods());
  app.use(userRouter.routes(), userRouter.allowedMethods());
};

module.exports = init;
