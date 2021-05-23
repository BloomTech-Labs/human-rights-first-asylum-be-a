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
const PendingCase = require('../pendingCases/pendingCaseModel');

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
          file_name: targetFile.name || '',
          status: 'Processing',
          uploaded: `${
            uploadedDate.getMonth() + 1
          }-${uploadedDate.getDate()}-${uploadedDate.getFullYear()}`,
        };
        PendingCase.add(uploadedCase);
        res.status(200).json({});
        axios
          .post(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`, { name: UUID })
          .then((scrape) => {
            const result = scrape.data.body;
            // Any newCase value that doesn't reference the result should be considered a work in progress of the scraper and will need to be updated as the scraper grows
            const scrapedData = {
              date: new Date(result.date) || '',
              judge_id: 1,
              case_outcome: result.outcome || '',
              country_of_origin: result['country of origin'] || '',
              protected_grounds: result['protected grounds'] || '',
              application_type: '',
              case_origin_city: '',
              case_origin_state: '',
              gender: result.gender || '',
              applicant_language: '',
              indigenous_group: '',
              type_of_violence: result['based violence'] || '',
              appellate: false,
              filed_in_one_year: result['check for one year'] || false,
              credible: false,
            };
            PendingCase.changeStatus(UUID, 'Review');
            PendingCase.update(UUID, scrapedData);
          });
      })
      .catch(() => {
        PendingCase.changeStatus(UUID, 'Error');
        res.status(500).json(err.message);
      });
  });
});
router.post('/:pending_case_id', authRequired, (req, res) => {
  const UUID = req.params.pending_case_id;
  const uploadedCase = {
    date: req.body.date,
    case_outcome: req.body.case_outcome,
    country_of_origin: req.body.country_of_origin,
    protected_grounds: req.body.protected_grounds,
    application_type: req.body.application_type,
    case_origin_city: req.body.case_origin_city,
    case_origin_state: req.body.case_origin_state,
    gender: req.body.gender,
    applicant_language: req.body.applicant_language,
    indigenous_group: req.body.indigenous_group,
    type_of_violence: req.body.type_of_violence,
    appellate: req.body.appellate,
    filed_in_one_year: req.body.filed_in_one_year,
    credible: req.body.credible,
    status: 'Pending',
  };
  PendingCase.update(UUID, uploadedCase)
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      PendingCase.changeStatus(UUID, 'Error');
      res.status(500).json(err.message);
    });
});
module.exports = router;
