const cacache = require('cacache');

const checkCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  let key = String(req.originalUrl);
  cacache
    .get(cachePath, key)
    .then((data) => {
      if (data) {
        result = JSON.parse(data.data.toString('utf-8'));
        res.status(200).json(result);
      } else {
        next();
      }
    })
    .catch((err) => {
      next();
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
  const key = req.originalUrl;
  cacache.get.info(cachePath, key).then((data) => {
    if (data) {
      return data;
    } else {
      next();
    }
  });
};

const makeFileCache = (key, value) => {
  const cachePath = '/tmp/file';
  cacache.put(cachePath, key, value).then((integrity) => {
    console.log(`Saved content to ${cachePath}.`);
  });
};

module.exports = {
  checkCache,
  makeCache,
  fileCache,
  makeFileCache,
};
