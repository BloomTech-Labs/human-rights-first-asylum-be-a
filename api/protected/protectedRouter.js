const express = require('express');
const Protected = require('./protectedModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = 'grounds_tags';
  Protected.findAll()
    .then((Protected) => {
      Cache.makeCache(key, String(Protected));
      res.status(200).json(Protected);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
