const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');
const router = express.Router();
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, `/uploads/${fileName}.pdf`)
  );

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pdf`,
    Body: fileContent,
  };
  const s3Upload = s3.upload(params).promise();

  return s3Upload
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
  })
);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.post('/', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(req);
    return res.status(400).send('No files were uploaded.');
  }

  let targetFile = req.files.target_file;
  let leUUID = uuidv4();

  targetFile.mv(path.join(__dirname, 'uploads', `${leUUID}.pdf`), (err) => {
    if (err) return res.status(500).send(err);
    uploadFile(leUUID)
      .then(() => {
        axios
          .post(`${process.env.DS_API_URL}${leUUID}`, { name: leUUID })
          .then((scrape) => {
            const result = scrape.data.body;
            //Any newCase value that is an empty string should be considered a work in progress of the scraper
            const newCase = {
              date: result.date,
              judge: '',
              case_outcome: result.outcome,
              country_of_origin: result['country of origin'],
              protegted_grounds: result['protected grounds'],
              application_type: '',
              case_origin_city: '',
              case_origin_state: '',
              gender: '',
              applicant_language: '',
              indigenous_group: '',
              type_of_violence: '',
              initial_or_appelate: false,
              filed_in_one_year: false,
              credible: false,
            };
            return res.status(200).json({ stuff: newCase });
          });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  });
});
module.exports = router;
