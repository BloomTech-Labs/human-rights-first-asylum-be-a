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
const Cases = require('../cases/caseModel');

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
    uploadFile(UUID).then((s3return) => {
      fs.unlink(path.join(__dirname, 'uploads', `${UUID}.pdf`), (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const uploadedCase = {
        case_id: UUID,
        user_id: req.profile.user_id,
        url: s3return.Location,
        status: 'Processing',
      };
      Cases.add(uploadedCase)
        .then(() => {
          res.status(200).json({ id: UUID });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  });
});

router.post('/scrap/:case_id', authRequired, (req, res) => {
  const UUID = req.params.case_id;
  console.log(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`);
  axios
    .get(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`)
    .then((scrape) => {
      console.log('85:' + scrape);
      console.dir(scrape);
      const result = scrape.data.body;
      let scrapedData = {};
      console.log('88:' + result);

      // formatting the returned scraped data to match naming in the database
      for (const [k, v] of Object.entries(result)) {
        console.log('92');
        if (Array.isArray(v)) {
          console.log('94');
          switch (k) {
            case 'application':
              scrapedData['application_type'] = v[0];
              break;
            case 'date':
              scrapedData['date'] = new Date(v);
              break;
            case 'outcome':
              scrapedData['outcome'] = v[0][0];
              break;
            case 'country of origin':
              scrapedData['country_of_origin'] = v[0];
              break;
            case 'city of origin':
              scrapedData['case_origin_city'] = v[0];
              break;
            case 'panel members':
              break;
            case 'protected grounds':
              scrapedData['protected_grounds'] = v[0];
              break;
            case 'based violence':
              scrapedData['type_of_violence'] = v[0];
              break;
            case 'indigenous':
              scrapedData['indigenous_group'] = v;
              break;
            case 'applicant language':
              scrapedData['applicant_language'] = v;
              break;
            case 'credibility':
              if (v[0] === 'Test') {
                scrapedData['credible'] = true;
              } else {
                scrapedData['credible'] = v;
              }
              break;
            case 'check for one year':
              scrapedData['filed_in_one_year'] = v[0];
              break;
            case 'precedent cases':
              break;
            case 'statutes':
              break;
            default:
              scrapedData[k] = v[0];
              break;
          } // end of switch
          console.log('143');
        } else if (typeof v === 'object') {
          console.log('145');
          switch (k) {
            case 'statutes':
              break;
            default:
              console.log('150');
              scrapedData[k] = v[Object.keys(v)[0]];
              break;
          }
        } else {
          console.log('155');
          switch (k) {
            case 'state of origin':
              scrapedData['case_origin_state'] = v;
              break;
            case 'city of origin':
              scrapedData['case_origin_city'] = v;
              break;
            case 'application':
              scrapedData['application_type'] = v;
              break;
            case 'country of origin':
              scrapedData['country_of_origin'] = v;
              break;
            case 'indigenous':
              scrapedData['indigenous_group'] = v;
              break;
            case 'applicant language':
              scrapedData['applicant_language'] = v;
              break;
            case 'credibility':
              if (v === 'Test') {
                scrapedData['credible'] = true;
              } else {
                scrapedData['credible'] = v;
              }
              break;
            case 'check for one year':
              scrapedData['filed_in_one_year'] = v;
              break;
            case 'date':
              scrapedData['date'] = new Date(v);
              break;
            case 'circuit of origin':
              break;
            case 'time to process':
              break;
            default:
              scrapedData[k] = v;
              break;
          } // end of switch
        }
      }

      console.log('199');

      Cases.changeStatus(UUID, 'Review')
        .then(() => {
          Cases.update(UUID, scrapedData)
            .then(() => {
              res.status(200).json({});
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});

router.post('/:case_id', authRequired, (req, res) => {
  const UUID = req.params.case_id;
  const uploadedCase = {
    date: req.body.date,
    outcome: req.body.outcome,
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
  Cases.update(UUID, uploadedCase)
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      Cases.changeStatus(UUID, 'Error');
      res.status(500).json(err.message);
    });
});

module.exports = router;
