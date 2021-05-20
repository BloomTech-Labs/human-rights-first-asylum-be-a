const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');
const router = express.Router();
require('dotenv').config();
const authRequired = require('../middleware/authRequired');
const Upload = require('./uploadModel');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, `/uploads/${fileName}.pdf`)
  );

  const s3Upload = s3
    .upload({
      Bucket: process.env.AWS_BUCKET,
      Key: `${fileName}.pdf`,
      Body: fileContent,
    })
    .promise();

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

router.post('/', authRequired, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let targetFile = req.files.target_file;
  let UUID = uuidv4();
  targetFile.mv(path.join(__dirname, 'uploads', `${UUID}.pdf`), (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    uploadFile(UUID)
      .then((s3return) => {
        fs.unlink(path.join(__dirname, 'uploads', `${UUID}.pdf`), (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        const uploadedDate = new Date();
        const uploadedCase = {
          pending_case_id: UUID,
          user_id: req.profile.user_id,
          case_url: s3return.Location,
          case_number: 'A003-TEST-TEST',
          status: 'Processing',
          uploaded: `${
            uploadedDate.getMonth() + 1
          }-${uploadedDate.getDate()}-${uploadedDate.getFullYear()}`,
        };
        Upload.add(uploadedCase);
        res.status(200).json({});
        axios
          .post(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`, { name: UUID })
          .then((scrape) => {
            const result = scrape.data.body;
            // Any newCase value that doesn't reference the result should be considered a work in progress of the scraper and will need to be updated as the scraper grows
            const scrapedData = {
              date: result.date || '',
              judge_id: 1,
              case_outcome: result.outcome || '',
              country_of_origin: result['country of origin'] || '',
              protected_grounds: result['protected grounds'] || '',
              application_type: '',
              case_origin_city: '',
              case_origin_state: '',
              gender: '',
              applicant_language: '',
              indigenous_group: '',
              type_of_violence: '',
              appellate: false,
              filed_in_one_year: false,
              credible: false,
            };
            Upload.changeStatus(UUID, 'Review');
            Upload.update(UUID, scrapedData);
            return;
          });
      })
      .catch(() => {
        Upload.changeStatus(UUID, 'Error');
        return;
      });
  });
});
module.exports = router;
