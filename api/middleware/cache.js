const cacache = require('cacache');
const CSV = require('csv-string');

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

const zipCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  let key = String(req.originalUrl);
  let name = req.params.name;

  cacache
    .get(cachePath, key)
    .then((data) => {
      if (data) {
        result = CSV.parse(data.data.toString('utf-8'));

        csv = result[0][0];

        res.header('Content-Type', 'application/zip');
        res.attachment(`${name}_data.zip`);
        const zip = new JSZip();

        zip.file(`${name}_judge_data.csv`, csv[0]);
        zip.file(`${name}_country_data.csv`, csv[1]);
        zip.file(`${name}_case_data.csv`, csv[2]);

        zip
          .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream(`${name}_data.zip`))
          .on('finish', function () {
            res.status(200).download(`${name}_data.zip`);
          });
      } else {
        next();
      }
    })
    .catch((err) => {
      next();
    });
};

const csvCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  let key = String(req.originalUrl);

  cacache
    .get(cachePath, key)
    .then((data) => {
      if (data) {
        result = CSV.parse(data.data.toString('utf-8'));
        res.header('Content-Type', 'text/csv');
        res.attachment(`${req.params.id}_data.csv`);
        res.status(200).send(result[0][0]);
      } else {
        next();
      }
    })
    .catch((err) => {
      next();
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
  cacache.put.stream(cachePath, key, value).then((integrity) => {
    console.log(`Saved content to ${cachePath}.`);
  });
};

module.exports = {
  checkCache,
  makeCache,
  csvCache,
  fileCache,
  makeFileCache,
};
