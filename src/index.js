// Initializes our custom module paths
require('module-alias/register');
// Initializes our environment
require('dotenv').config();

const logger = require('koa-logger');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const router = require('@root/router');
const log = require('@root/log');

require('@root/db');

log.info('Pocket is starting');

const app = new Koa();

app.use(bodyParser({
  jsonLimit: '500kb',
}));
app.use(logger());
app.use(json());

app.on('error', (err) => {
  log.error('server error', err);
});

router(app);

app.listen(process.env.POCKET_PORT);
