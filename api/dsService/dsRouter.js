const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');
const Cache = require('../middleware/cache');
const upload = require('../../utils/uploadFile');
const axios = require('axios');
const Judges = require('../judges/judgeModel.js');

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

router.post('/viz/judges', async (req, res) => {
  const raw_data = await Judges.findJudgeCases(req.params.judge_id);
  // Issue POST request to DS API
  axios
    .post(`${process.env.DS_API_URL}/vis/judges/${req.params.judge_id}`, {
      data: raw_data,
    })
    .then((data_viz_res) => {
      // Respond to frontend with the data for the visualization
      const parsed_data = JSON.parse(data_viz_res.data);
      let result = {};
      for (const data in parsed_data) {
        result[data] = JSON.parse(parsed_data[data]);
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
