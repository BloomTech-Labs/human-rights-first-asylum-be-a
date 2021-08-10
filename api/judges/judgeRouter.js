const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const fs = require('fs');
const JSZip = require('jszip');
const cacache = require('cacache');
const authRequired = require('../middleware/authRequired');
const { default: axios } = require('axios');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const { uploadFile, getFileStream } = require('./s3');

router.use('/:judge_id', authRequired, verify.verifyJudgeId);

router.get('/', Cache.checkCache, (req, res) => {
  Judges.findAllSimple()
    .then((judges) => {
      Cache.makeCache('/judges', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get('/:judge_id/vis', async (req, res) => {
  Judges.findById(req.params.judge_id)
    .then((judge) => {
      const first_name = judge['first_name']; // Current DS implementation takes first name, should refactor to query based on ID
      axios
        .get(`${process.env.DS_API_URL}/vis/outcome-by-judge/${first_name}`)
        .then((data_vis_res) => {
          const parsed_data = JSON.parse(data_vis_res.data);
          res.status(200).json(parsed_data);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', Cache.zipCache, (req, res) => {
  //CSV function currently not fully implemented
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

router.get('/images/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  res.send({ imagePath: `/images/${result.Key}` });
});
module.exports = router;
