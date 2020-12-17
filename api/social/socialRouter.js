const express = require('express');
const Social = require('./socialModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

//routes

router.get('/', Cache.checkCache, (req, res) => {
  const key = 'social_tags';
  Social.findAll()
    .then((Social) => {
      Cache.makeCache(key, String(Social));
      res.status(200).json(Social);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
