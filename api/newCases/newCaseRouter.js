const express = require('express');
const NewCases = require('./newCaseModel');
const router = express.Router();

router.get('/', (req, res) => {
  NewCases.getAll()
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', async (req, res) => {
  const newCase = req.body;
  NewCases.add(newCase)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: e.message });
    });
});

module.exports = router;
