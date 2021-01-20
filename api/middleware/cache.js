const cacache = require('cacache');
const CSV = require('csv-string');
const JSZip = require('jszip');
const fs = require('fs');

const checkCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  let key = String(req.originalUrl);
  cacache
    .get(cachePath, key)
    .then((data) => {
      if (data) {
        const result = JSON.parse(data.data.toString('utf-8'));
        res.status(200).json(result);
      } else {
        next();
      }
    })
    .catch(() => {
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
  let name = String(req.params.name);

  cacache
    .get(cachePath, key)
    .then((data) => {
      if (data) {
        const result = CSV.parse(data.data.toString('utf-8'));

        const csv = result[0][0];

        res.header('Content-Type', 'application/zip');
        res.attachment(`${name}_data.zip`);
        const zip = new JSZip();

        zip.file(`${name}_judge_data.csv`, csv[0]);
        zip.file(`${name}_country_data.csv`, csv[1]);
        zip.file(`${name}_case_data.csv`, csv[2]);
        zip.file(`${name}_social_data.csv`, csv[3]);
        zip.file(`${name}_grounds_data.csv`, csv[4]);

        cacache.tmp
          .withTmp(cache, (dir) => {
            zip
              .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
              .pipe(fs.createWriteStream(`${dir}.zip`))
              .on('finish', function () {
                res.status(200).download(`${dir}_data.zip`);
              });
          })
          .then(() => {
            // `dir` no longer exists
          });
      } else {
        next();
      }
    })
    .catch(() => {
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
        const result = CSV.parse(data.data.toString('utf-8'));
        res.header('Content-Type', 'text/csv');
        res.attachment(`${req.params.id}_data.csv`);
        res.status(200).send(result[0][0]);
      } else {
        next();
      }
    })
    .catch(() => {
      next();
    });
};

module.exports = {
  checkCache,
  makeCache,
  csvCache,
  zipCache,
};
