const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');
const Cache = require('../middleware/cache');
const upload = require('../../utils/uploadFile');

router.get('/viz/:state', authRequired, function (req, res) {
  const state = String(req.params.state);

  dsModel
    .getViz(state)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

router.get('/form', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  dsModel
    .formData()
    .then((form) => {
      Cache.makeCache(key, JSON.stringify(form));
      res.status(200).json(form);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/upload', async (req, res) => {
  upload.uploadFile(req, res);
});

module.exports = router;
