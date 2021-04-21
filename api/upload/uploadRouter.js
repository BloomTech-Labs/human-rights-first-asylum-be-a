const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');
const router = express.Router();
// const db = require('../cases/caseModel');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// body: {
//     application: '',
//     date: '2000-12-31',
//     country_of_origin: 'Tunisia',
//     panel_members: '',
//     outcome: 'grant',
//     protected_grounds: 'nationality',
//     based_violence: '',
//     references: '',
//     sex_of_applicant: 'male'
//   }

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
      console.log('Success');
      return res;
    })
    .catch(() => {
      console.log('Failure');
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

  // Accessing the file by the <input> File name="target_file"
  let targetFile = req.files.target_file;
  let leUUID = uuidv4();

  //mv(path, CB function(err))
  targetFile.mv(path.join(__dirname, 'uploads', `${leUUID}.pdf`), (err) => {
    if (err) return res.status(500).send(err);
    uploadFile(leUUID).then(() => {
      console.log('Upload Successful');

      axios
        .post(`${process.env.DS_API_URL}${leUUID}`, { name: leUUID })
        .then((scrape) => {
          console.log(scrape.data);
          const result = scrape.data.body;
          const newCase = {
            date: result.date,
            judge: '',
            case_outcome: result.outcome,
            country_of_origin: result['country of origin'],
            protegted_grounds: result['protected grounds'],
            application_type: '',
            case_outcome_city: '',
            case_outcome_state: '',
            gender: result.gender,
            applicant_language: result['applicant language'],
            indigenous_group: result.indigenous,
            type_of_violence: '',
            initial_or_appelate: '',
            filed_in_one_year: result['check for one year'],
            credible: '',
          };
          return res.status(200).json({ stuff: newCase });
        });
    });
  });
});
module.exports = router;
