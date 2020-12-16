const cacache = require('cacache');

const checkCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  const key = req.originalUrl;

  cacache.get.info(cachePath, key).then((data) => {
    if (data) {
      return data;
    } else {
      next();
    }
  });
};

const makeCache = (key, value) => {
  const cachePath = '/tmp/data';
  cacache.put(cachePath, key, value).then((integrity) => {
    console.log(`Saved content to ${cachePath}.`);
  });
};

const fileCache = (req, res, next) => {
  const cachePath = '/tmp/file';
};

const makeFileCache = (key, value) => {
  const cachePath = '/tmp/data';
};

module.exports = {
  checkCache,
  makeCache,
};
