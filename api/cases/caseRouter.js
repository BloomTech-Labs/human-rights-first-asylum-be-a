const express = require('express');
const Cases = require('./caseModel');
const AWS = require('../../utils/AWS');
const Verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const router = express.Router();
const cacache = require('cacache');

// TODO add auth to route also - final phase

//middleware

router.use('/:id', Verify.verifyCase);

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);

  Cases.findAll()
    .then((cases) => {
      console.log('run');
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl) + id;
  Cases.findById(id)
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/view-pdf', (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  AWS.make_view_params(id)
    .then((params) => {
      AWS.fetch_pdf_view(params)
        .then((data) => {
          //* write file locally as temp file
          // * res.status(200).render('temp.pdf')
          console.log(data);
          res.status(200).json({ message: 'Completed' });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-pdf', (req, res) => {
  // * returns pdf of ORIGINAL case
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  AWS.make_dl_params(id)
    .then((params) => {
      AWS.fetch_pdf_download(params).then((data) => {
        console.log(data);
        res.json({ message: 'Completed' });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-csv', (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  Cases.writeCSV(id)
    .then((csv) => {
      Cache.makeCache(key, csv);
      res.header('Content-Type', 'text/csv');
      res.attachment(`${id}_data.csv`);
      res.status(200).send(csv);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
