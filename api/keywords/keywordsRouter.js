const express = require('express');
const Keywords = require('./keywordsModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAll()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(keyword);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/pos', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAllPos()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(positive);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/neg', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAllNeg()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(keyword);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
