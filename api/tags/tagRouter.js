const express = require('express');
const Tags = require('./tagModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

// TODO add auth to router

//routes
router.get('/grounds', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Tags.findAllProt()
    .then((Tags) => {
      Cache.makeCache(key, JSON.stringify(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/social', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Tags.findAllSoc()
    .then((Tags) => {
      Cache.makeCache(key, JSON.stringify(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
