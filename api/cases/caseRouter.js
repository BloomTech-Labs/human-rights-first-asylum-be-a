const express = require('express');
const Cases = require('./caseModel');
const router = express.Router();

/* 
/cases GET -> returns all case data
/case/:id GET -> returns data for specific case
/case/pdf/:id GET -> returns previously uploaded casefile as PDF
/case/upload POST - upload PDF */

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
  //returns csv of case data
  const id = String(req.params.id);
  Cases.writeCSV(id)
    .then((cases) => {
      res.status(200).json(cases);
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
  //returns pdf of ORIGINAL case
});

router.post('/case', (req, res) => {
  //verify filetype of case
  // posts pdf to datascience
});

module.exports = router;
