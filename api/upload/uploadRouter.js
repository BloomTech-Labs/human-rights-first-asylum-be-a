const express = require('express');
// const fileUpload = require('express-fileupload');
// const path = require('path');
const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');
// const AWS = require('aws-sdk');
const router = express.Router();
require('dotenv').config();
const authRequired = require('../middleware/authRequired');
const Cases = require('../cases/caseModel');
const upload = require('./uploads/fileupload');
const singleUpload = upload.single('image');

router.post('/', authRequired, async (req, res) => {
  singleUpload(req, res, () => {
    if (req?.file?.key) {
      console.log(req.file);
      let UUID = req.file.key.slice(0, 36);
      axios.get(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`);
      const uploadedCase = {
        case_id: UUID,
        user_id: req.profile.user_id,
        url: req.file.location,
        status: 'Processing',
        file_name: req.file.originalname,
      };
      Cases.add(uploadedCase);
      return res.json({ imageURL: req?.file?.location });
    } else {
      res.status(400).json('failed to upload');
    }
  });
});

const updateCase = (UUID, responses, res) => {
  const formatCase = {
    case_id: UUID,
    decision_date: responses.decision_date,
    outcome: responses.outcome,
    country_of_origin: responses.country_of_origin,
    protected_grounds: responses.protected_grounds,
    application_type: responses.application_type,
    case_origin_city: responses.case_origin_city,
    case_origin_state: responses.case_origin_state,
    gender: responses.gender,
    applicant_language: responses.applicant_language,
    indigenous_group: responses.indigenous_group,
    type_of_persecution: responses.type_of_persecution,
    credibility: responses.credibility == 'Unknown' ? false : true,
    appellate: responses.hearing_type == 'Appellate' ? true : false,
    check_for_one_year:
      responses.check_for_one_year == 'True'
        ? 'yes'
        : responses.check_for_one_year == 'False'
        ? 'no'
        : 'unknown',
    status: 'Review',
  };
  Cases.updateCaseOnceSraped(UUID, formatCase)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err, 'failed to add case'));
};

// const dateformater9000 = (date) => {
//   if (date && date != 'Unknown') {
//     const arr = date.split(' ');
//     const month = arr[0].slice(0, 3).toLowerCase();
//     const monthArr = {
//       jan: '01',
//       feb: '02',
//       mar: '03',
//       apr: '04',
//       may: '05',
//       jun: '06',
//       jul: '07',
//       aug: '08',
//       sep: '09',
//       oct: '10',
//       nov: '11',
//       dec: '12',
//     };
//     const day = arr[1].match(/\d+/)[0];
//     const year = arr[2].slice(arr[2].length - 4, arr[2].length);
//     return year + '-' + monthArr[month] + '-' + day;
//   } else {
//     return null;
//   }
// };
// router.get('/:case_id', (req, res) => {
//   Cases.updateCaseStatusTest(req.params.case_id).then(res.json('sucess'));
// });

router.get(`/scrape/:case_id`, (req, res) => {
  const UUID = req.params.case_id;
  Cases.FindById_DS_Case(UUID).then((responses) => {
    const judges = responses.panel_members.split(', ');
    judges.map((singleJudge) => {
      const arr = singleJudge.split(' ');
      const first_name = arr[0];
      const middle_initial = arr.length == 3 ? arr[1] : null;
      const last_name = arr.length == 3 ? arr[3] : arr[1] || null;
      Cases.findJudgeByFullName(first_name, middle_initial, last_name).then(
        (data) => {
          if (!data) {
            Cases.makeAnewJudge(first_name, middle_initial, last_name)
              .then((stuff) => {
                const judge_id = stuff[0].judge_id;
                // const date = responses.date;
                // responses.date = dateformater9000(date);
                updateCase(UUID, responses, res);
                Cases.assignJudgesToCase(UUID, judge_id);
              })
              .catch((err) => console.log(err));
          } else {
            const judge_id = data.judge_id;
            // const date = responses.date;
            // responses.date = dateformater9000(date);
            updateCase(UUID, responses, res);
            Cases.assignJudgesToCase(UUID, judge_id);
          }
        }
      );
    });
  });
});

// router.post('/scrap/:case_id', authRequired, (req, res) => {
//   const UUID = req.params.case_id;
//   axios
//     .get(`${process.env.DS_API_URL}/pdf-ocr/${UUID}`)
//     .then((scrape) => {
//       const result = scrape.data.body;
//       // console.log(result);
//       let scrapedData = {};

//       // formatting the returned scraped data to match naming in the database
//       for (const [k, v] of Object.entries(result)) {
//         if (Array.isArray(v)) {
//           switch (k) {
//             case 'application':
//               scrapedData['application_type'] = v[0];
//               break;
//             case 'date':
// scrapedData['date'] = new Date(v);
//               break;
//             case 'outcome':
//               scrapedData['outcome'] = v[0][0];
//               break;
//             case 'country of origin':
//               scrapedData['country_of_origin'] = v[0];
//               break;
//             case 'city of origin':
//               scrapedData['case_origin_city'] = v[0];
//               break;
//             case 'panel members':
//               break;
//             case 'protected grounds':
//               scrapedData['protected_grounds'] = v[0];
//               break;
//             case 'based violence':
//               scrapedData['type_of_persecution'] = v[0];
//               break;
//             case 'indigenous':
//               scrapedData['indigenous_group'] = v;
//               break;
//             case 'applicant language':
//               scrapedData['applicant_language'] = v;
//               break;
//             case 'credibility':
//               if (v[0] === 'Test') {
//                 scrapedData['credibility'] = true;
//               } else {
//                 scrapedData['credibility'] = v;
//               }
//               break;
//             case 'check for one year':
//               scrapedData['check_for_one_year'] = v[0];
//               break;
//             case 'precedent cases':
//               break;
//             case 'statutes':
//               break;
//             default:
//               scrapedData[k] = v[0];
//               break;
//           } // end of switch
//         } else if (typeof v === 'object') {
//           switch (k) {
//             case 'statutes':
//               break;
//             default:
//               scrapedData[k] = v[Object.keys(v)[0]];
//               break;
//           }
//         } else {
//           switch (k) {
//             case 'state of origin':
//               scrapedData['case_origin_state'] = v;
//               break;
//             case 'city of origin':
//               scrapedData['case_origin_city'] = v;
//               break;
//             case 'application':
//               scrapedData['application_type'] = v;
//               break;
//             case 'country of origin':
//               scrapedData['country_of_origin'] = v;
//               break;
//             case 'indigenous':
//               scrapedData['indigenous_group'] = v;
//               break;
//             case 'applicant language':
//               scrapedData['applicant_language'] = v;
//               break;
//             case 'credibility':
//               if (v === 'Test') {
//                 scrapedData['credibility'] = true;
//               } else {
//                 scrapedData['credibility'] = v;
//               }
//               break;
//             case 'check for one year':
//               scrapedData['check_for_one_year'] = v;
//               break;
//             case 'date':
//               scrapedData['date'] = new Date(v);
//               break;
//             case 'circuit of origin':
//               break;
//             case 'time to process':
//               break;
//             default:
//               scrapedData[k] = v;
//               break;
//           } // end of switch
//         }
//       }

//       scrapedData['case_id'] = UUID;

//       Cases.changeStatus(UUID, 'Review')
//         .then(() => {
//           Cases.update(scrapedData)
//             .then(() => {
//               res.status(200).json({});
//             })
//             .catch((err) => {
//               res.status(500).json(err);
//             });
//         })
//         .catch((err) => {
//           res.status(500).json(err);
//         });
//     })
//     .catch((err) => {
//       res.status(500).json(err.message);
//     });
// });

// router.post('/:case_id', authRequired, (req, res) => {
//   const UUID = req.params.case_id;
//   const uploadedCase = {
//     date: req.body.date,
//     outcome: req.body.outcome,
//     country_of_origin: req.body.country_of_origin,
//     protected_grounds: req.body.protected_grounds,
//     application_type: req.body.application_type,
//     case_origin_city: req.body.case_origin_city,
//     case_origin_state: req.body.case_origin_state,
//     gender: req.body.gender,
//     applicant_language: req.body.applicant_language,
//     indigenous_group: req.body.indigenous_group,
//     type_of_persecution: req.body.type_of_persecution,
//     appellate: req.body.appellate,
//     check_for_one_year: req.body.check_for_one_year,
//     credibility: req.body.credibility,
//     status: 'Pending',
//   };
//   Cases.update(UUID, uploadedCase)
//     .then(() => {
//       res.status(200).json();
//     })
//     .catch((err) => {
//       Cases.changeStatus(UUID, 'Error');
//       res.status(500).json(err.message);
//     });
// });

module.exports = router;
