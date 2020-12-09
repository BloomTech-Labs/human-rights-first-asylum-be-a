const express = require('express');
const Cases = require('./caseModel');
const Verify = require('../middleware/verifyDataID');
const router = express.Router();

// TODO add auth to route also - final phase

//middleware

router.use('/:id', Verify.verifyCase);

//routes

router.get('/', (req, res) => {
  Cases.findAll()
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const id = String(req.params.id);
  Cases.findById(id)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/csv', (req, res) => {
  // * returns csv of case data
  const id = String(req.params.id);
  Cases.writeCSV(id)
    .then((cases) => {
      res.header('Content-Type', 'text/csv');
      res.attachment(`${id}_case_data`);
      res.status(200).send(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/pdf', (req, res) => {
  const id = String(req.params.id);
  Cases.writePDF(id)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/original-pdf', (req, res) => {
  // * returns pdf of ORIGINAL case
  // TODO fetch the pdf (either directory or location)
  // TODO set all appropriate headers
  // TODO res.download
});

module.exports = router;
