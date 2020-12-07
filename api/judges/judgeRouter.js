const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const router = express.Router();
//need to zip files

//add auth to router - final phase

//middleware

router.use('/:name', verify.verifyJudge);

//routes

router.get('/', (req, res) => {
  Judges.findAll()
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', (req, res) => {
  const name = String(req.params.name);
  Judges.writeCSV(name)
    .then((csv) => {
      res.header('Content-Type', 'text/csv');
      const judge_data = csv[0];
      const country_data = csv[1];
      const case_data = csv[2];
      res.attachment(`${name}_data`);
      res.status(200).send({ judge_data, country_data, case_data });
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
