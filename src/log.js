/**
 * Logger for Pocket
 * @module src/log
 */

const log = (type, ...args) => {
  const ts = new Date().toUTCString();
  if (type === 'ERROR') {
    console.log(ts, type, ...args);
  } else {
    console.log(ts, type, ...args);
  }
};

const info = (...args) => {
  log('INFO', ...args);
};

const error = (...args) => {
  log('ERROR', ...args);
};

const debug = (...args) => {
  log('DEBUG', ...args);
};

const warn = (...args) => {
  log('WARN', ...args);
};

module.exports = {
  debug,
  error,
  info,
  warn,
};
