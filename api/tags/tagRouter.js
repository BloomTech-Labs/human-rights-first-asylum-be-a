const express = require('express');
const Tags = require('./tagModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

router.get('/grounds', Cache.checkCache, (req, res) => {
  const key = 'tags/grounds';
  Tags.findAllProt()
    .then((Tags) => {
      Cache.makeCache(key, String(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/social', Cache.checkCache, (req, res) => {
  const key = 'tags/social';
  Tags.findAllSoc()
    .then((Tags) => {
      Cache.makeCache(key, String(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
