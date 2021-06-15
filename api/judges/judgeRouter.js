const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const fs = require('fs');
const JSZip = require('jszip');
const cacache = require('cacache');
const authRequired = require('../middleware/authRequired');
const { default: axios } = require('axios');
// const { nextTick } = require('process');
// const { resolveSoa } = require('dns');

// TODO add auth to router - final phase

// router
const router = express.Router();

//middleware

router.use('/:judge_id', authRequired, verify.verifyJudgeId);

//routes
router.get('/', Cache.checkCache, (req, res) => {
  Judges.findAllSimple()
    .then((judges) => {
      Cache.makeCache('/judges', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

//Does not currently work because of poor implementation of /:id
/* router.get('/all', Cache.checkCache, (req, res) => {
  Judges.findAll()
    .then((judges) => {
      Cache.makeCache('/judges/all', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}); */

// router.get('/:judge_id/cases', async (req, res) => {
//   const data = await Judges.findJudgeCases(req.params.judge_id);
//   res.status(200).json({ data });
// });

router.get('/:judge_id/cases', async (req, res) => {
  try {
    // GET the judge cases data
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
  } catch (err) {
    res.status(404).json({ err });
  }
});

router.get('/:name/csv', Cache.zipCache, (req, res) => {
  const name = String(req.params.name);

  Judges.writeCSV(name)
    .then((csv) => {
      const zip = new JSZip();

      zip.file(`${name}_judge_data.csv`, csv[0]);
      zip.file(`${name}_country_data.csv`, csv[1]);
      zip.file(`${name}_case_data.csv`, csv[2]);
      zip.file(`${name}_social_data.csv`, csv[3]);
      zip.file(`${name}_grounds_data.csv`, csv[4]);

      cacache.tmp
        .withTmp('/tmp/data', (dir) => {
          zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream(`${dir}.zip`))
            .on('finish', function () {
              res.header('Content-Type', 'application/zip');
              res.attachment(`${name}_data.zip`);
              res.status(200).download(`${dir}.zip`);
            });
        })
        .then(() => {
          // `dir` no longer exists
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:judge_id', (req, res) => {
  Judges.findById(req.params.judge_id)
    .then((judge_info) => {
      res.status(200).json(judge_info);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
