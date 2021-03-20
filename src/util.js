const { createHash } = require('crypto');
const log = require('@root/log');
const Jimp = require('jimp');

const createUniqueFileName = (fileName) => {
  const hash = createHash('sha256');

  hash.update(fileName);
  hash.update(`${Date.now()}`);
  return hash.digest('hex');
};

const imageResize = async (buffer, location) => {
  const image = await Jimp.read(buffer);

  await image.contain(620, 620);

  return image.writeAsync(location);
};

module.exports = {
  createUniqueFileName,
  imageResize,
};
