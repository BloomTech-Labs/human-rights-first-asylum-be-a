const express = require('express');
const Keywords = require('./keywordsModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = 'keyword_tags';
  Keywords.findAll()
    .then((keyword) => {
      Cache.makeCache(key, String(keyword));
      res.status(200).json(keyword);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/pos', Cache.checkCache, (req, res) => {
  const key = 'positive_tags';
  Keywords.findAllPos()
    .then((positive) => {
      Cache.makeCache(key, String(positive));
      res.status(200).json(positive);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/neg', Cache.checkCache, (req, res) => {
  const key = 'negative_tags';
  Keywords.findAllNeg()
    .then((negative) => {
      Cache.makeCache(key, String(negative));
      res.status(200).json(negative);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
