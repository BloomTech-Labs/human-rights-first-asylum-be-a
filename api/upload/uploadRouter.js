const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');
const router = express.Router();
const db = require('../cases/caseModel');
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
//     keywords: '',
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
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);

    axios
      .post(`${process.env.DS_API}${fileName}`, { name: fileName })
      .then((res) => {
        let data = res.data.body;

        const test = {
          primary_key: fileName,
          user_id: '00ultwew80Onb2vOT4x6',
          case_id: 'A079-531-484',
          case_url: `${fileName}.pdf`,
          hearing_date: data.date,
          judge: 2,
          initial_or_appellate: false,
          case_origin: 'Los Angeles, CA',
          case_filed_within_one_year: true,
          application_type: 'initial',
          protected_ground: 'true',
          case_outcome: data.outcome,
          nation_of_origin: data.country_of_origin,
          applicant_gender: data.sex_of_applicant,
          type_of_violence_experienced: 'Not Applicable',
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          applicant_access_to_interpreter: true,
          applicant_perceived_credibility: false,
        };

        db.add(test)
          .then(() => {
            fs.unlinkSync(path.join(__dirname, 'uploads', `${fileName}.pdf`));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

router.post('/', (req, res) => {
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
    res.send('File uploaded!');
    uploadFile(leUUID);
  });
});
module.exports = router;
