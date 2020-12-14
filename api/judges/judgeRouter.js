const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const fs = require('fs');
const JSZip = require('jszip');

// TODO add auth to router - final phase

// router
const router = express.Router();

//middleware

router.use('/:name', verify.verifyJudge);

//routes

router.get('/', (req, res) => {
  Judges.findAll()
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name', (req, res) => {
  const name = String(req.params.name);
  Judges.findFullDataByName(name)
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', (req, res) => {
  const name = String(req.params.name);
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
          console.log(`${name}_data.zip written`);
          res.status(200).download(`${name}_data.zip`);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/pdf', (req, res) => {
  const id = String(req.params.id);
  Judges.writePDF(id)
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
