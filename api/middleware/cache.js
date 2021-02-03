const cacache = require('cacache');
const CSV = require('csv-string');
const JSZip = require('jszip');
const fs = require('fs');
const { Parser } = require('json2csv');

const checkCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  const name = String(req.params.name);
  let key = `/judge/${name}`;
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
  cacache
    .put(cachePath, key, value)
    .then(() => {
      console.log(`Saved content to ${cachePath}.`);
    })
    .catch((err) => console.log(err.message));
};

// * This long function speeds up the /judge/:name/download-csv endpoint
const zipCache = (req, res, next) => {
  const cachePath = '/tmp/data';
  const name = String(req.params.name);
  const key = `/judge/${name}`;

  cacache
    .get(cachePath, key)
    .then((data) => {
      if (!data) {
        return next();
      }

      const result = JSON.parse(data.data.toString('utf-8'));
      const judge_data = result;
      // * create fields
      const judge_fields = [];
      for (let field in judge_data) {
        judge_fields.push(field);
      }
      const judge_opts = { fields: judge_fields };

      // * get country data
      const country_data = judge_data.countries;
      const social_data = judge_data.social_grounds;
      const grounds_data = judge_data.grounds;

      // * create social fields
      const social_fields = [];

      for (let field in social_data) {
        social_fields.push(field);
      }
      // * create ground fields
      const grounds_fields = [];
      for (let field in grounds_data) {
        social_fields.push(field);
      }

      // * create country fields
      const country_fields = [];
      for (let field in country_data) {
        country_fields.push(field);
      }

      // * create opts
      const grounds_opts = {
        fields: grounds_fields,
      };

      const social_opts = {
        fields: social_fields,
      };

      const country_opts = {
        fields: country_fields,
      };

      // * get case data
      const case_data = judge_data.case_data;

      // * create case fields
      const case_fields = [];
      for (let field in case_data) {
        case_fields.push(field);
      }
      const case_opts = { fields: case_fields };
      // * create fields in csv
      const judge_parser = new Parser(judge_opts);
      const country_parser = new Parser(country_opts);
      const case_parser = new Parser(case_opts);
      const social_parser = new Parser(social_opts);
      const grounds_parser = new Parser(grounds_opts);
      // * fill fields with data
      const judge_csv = judge_parser.parse(judge_data);
      const country_csv = country_parser.parse(country_data);
      const case_csv = case_parser.parse(case_data);
      const social_csv = social_parser.parse(social_data);
      const grounds_csv = grounds_parser.parse(grounds_data);

      const csv = [judge_csv, country_csv, case_csv, social_csv, grounds_csv];

      if (!csv) return next();

      const zip = new JSZip();

      zip.file(`${name}_judge_data.csv`, csv[0]);
      zip.file(`${name}_country_data.csv`, csv[1]);
      zip.file(`${name}_case_data.csv`, csv[2]);
      zip.file(`${name}_social_data.csv`, csv[3]);
      zip.file(`${name}_grounds_data.csv`, csv[4]);

      cacache.tmp.withTmp(cachePath, (dir) => {
        console.log(dir);
        zip
          .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream(`${dir}.zip`))
          .on('finish', function () {
            res.header('Content-Type', 'application/zip');
            res.attachment(`${name}_data.zip`);
            res.status(200).download(`${dir}.zip`);
          });
      });
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
