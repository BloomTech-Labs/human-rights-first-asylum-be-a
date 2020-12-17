const express = require('express');
const Keywords = require('./keywordsModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

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

module.exports = router;
