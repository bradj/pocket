const { createHash } = require('crypto');

const createUniqueFileName = (fileName) => {
  const hash = createHash('sha256');

  hash.update(fileName);
  return hash.digest('hex');
};

module.exports = {
  createUniqueFileName,
};
