const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const fs = require('fs');
const JSZip = require('jszip');

// TODO add auth to router - final phase

// router
const router = express.Router();

//middleware

router.use('/:name', verify.verifyJudge);

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = 'judges';
  Judges.findAll()
    .then((judges) => {
      Cache.makeCache(key, String(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name', Cache.checkCache, (req, res) => {
  const name = String(req.params.name);
  const key = String(req.originalUrl);
  Judges.findFullDataByName(name)
    .then((judges) => {
      Cache.makeCache(key, String(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', Cache.fileCache, (req, res) => {
  const name = String(req.params.name);
  const key = String(req.originalUrl);
  Judges.writeCSV(name)
    .then((csv) => {
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
          Cache.makeFileCache(key, `${name}_data.zip`);
          res.status(200).download(`${name}_data.zip`);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/pdf', (req, res) => {
  const id = String(req.params.id);
  // const key = String(req.originalUrl);
  Judges.writePDF(id)
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
