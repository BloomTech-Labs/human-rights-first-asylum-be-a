const express = require('express');
const Judges = require('./judgeModel');
const router = express.Router();

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

router.get('/:id', (req, res) => {
  const id = String(req.params.id);
  Judges.countryData(id)
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/csv', (req, res) => {
  const id = String(req.params.id);
  Judges.writeCSV(id)
    .then((judges) => {
      res.status(200).json(judges);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/pdf', (req, res) => {
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
