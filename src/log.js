/**
 * Logger for Pocket
 * @module src/log
 */

const winston = require('winston');
const { Console } = require('winston/lib/winston/transports');

let logger;

const init = () => {
  logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'pocket' },
    transports: [
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
};

const info = (...args) => {
  logger.info(...args);
};

const error = (...args) => {
  logger.error(...args);
};

const debug = (...args) => {
  logger.debug(...args);
};

const warn = (...args) => {
  logger.warn(...args);
};

module.exports = {
  init,
  debug,
  error,
  info,
  warn,
};
