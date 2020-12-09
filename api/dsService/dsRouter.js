const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const Judge = require('../judges/judgeModel');
const Case = require('../cases/caseModel');

/**
 * @swagger
 * /data/predict/{x1}/{x2}/{x3}:
 *  get:
 *    description: Get prediction for 3 inputs
 *    summary: Returns a prediction result
 *    security:
 *      - okta: []
 *    tags:
 *      - data
 *    parameters:
 *      - x1:
 *        name: x1
 *        in: path
 *        description: a positive number
 *        required: true
 *        example: 3.14
 *        schema:
 *          type: number
 *      - x2:
 *        name: x2
 *        in: path
 *        description: a number
 *        required: true
 *        example: -42
 *        schema:
 *          type: number
 *      - x3:
 *        name: x3
 *        in: path
 *        description: label for prediction
 *        required: true
 *        example: banjo
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A predition result object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                prediction:
 *                  type: boolean
 *                  description: is prediction true or false
 *                probability:
 *                  type: number
 *                  description: the probability between 0 and 1
 *              example:
 *                prediction: true
 *                probability: 0.9479960541387882
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: 'Error making prediction'
 */
router.get('/predict/:x1/:x2/:3', authRequired, function (req, res) {
  const x1 = String(req.params.x1);
  const x2 = String(req.params.x2);
  const x3 = String(req.params.x3);

  dsModel
    .getPrediction(x1, x2, x3)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

/**
 * @swagger
 * /data/viz/{state}:
 *  get:
 *    description: plotly vizualization data
 *    summary: Returns a plotly data
 *    security:
 *      - okta: []
 *    tags:
 *      - data
 *    parameters:
 *      - state:
 *        name: state
 *        in: path
 *        description: get viz data for state
 *        required: true
 *        example: UT
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A plotly result object. See [DS service](https://ds-bw-test.herokuapp.com/#/default/viz_viz__statecode__get) for detailed docs.
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: 'Error making prediction'
 */
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

// TODO create Swagger Docs

router.get('/data', async (req, res) => {
  let new_data = [];
  axios
    .get(process.env.DS_API_URL)
    .then((res) => {
      new_data = res.data;
      res.send(200).json(new_data);
    })
    .catch((err) => {
      res.send(500).json(err.message);
    })
    .finally(async () => {
      // TODO connect to DB to see if data already exists - use case_id && see if case_status has updated
      // * judge data & case data
      const judge_data = res.data.judge_data;
      // * for judge in judge_data, check if name returns a value
      for (const judge in judge_data) {
        Judge.findByName(judge[name])
          .then((found_judge) => {
            if (found_judge.length > 0) {
              // * update judge
              // TODO write Judge.update() function
            } else {
              // * add judge
              // TODO write Judge.add() function
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const case_data = res.data.case_data;
      // * for case in case data, check if case_id returns a value
      for (const ref_case in case_data) {
        Case.findById(ref_case[id])
          .then((ret_case) => {
            if (!ret_case.length) {
              // * add case
              // TODO write add_case function
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // * save case_url as a pdf to a file in the directory (makes DL easier)
      // * save the location to case_url & overwrite
      // * if case does not exist - insert case

      // * else continue

      // TODO save new data to variable
      // TODO connect to DS Verification to see if data matches requirements - create placeholders for Null Sets
      // TODO if else list - create&insert new data
      // TODO update existing data
    });
});

router.post(
  '/case/upload',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      // * Use the name of the input field (i.e. "avatar", "for_ds") to retrieve the uploaded file
      let uploadedFile = req.files.for_datascience;
      // ! if mime.lookup(uploadedFile) does not parse properly, use uploadedFile.mimetype
      if (mime.lookup(uploadedFile) == 'text/csv') {
        // * send to datascience csv endpoint through dsModel
        dsModel
          .sendCSV(uploadedFile)
          .then((response) => {
            res.status(200).json({ message: 'CSV Successfully Uploaded' });
          })
          .catch((err) => res.status(500).json(err.message));
      }
      if (mime.lookup(uploadedFile) == 'application/pdf') {
        // * send to datascience pdf endpoint through dsModel
        dsModel
          .sendPDF(uploadedFile)
          .then((response) => {
            res.status(200).json({ message: 'PDF Successfully Uploaded' });
          })
          .catch((err) => res.status(500).json(err.message));
      } else {
        res.status(400).json({ message: 'Please send valid file type.' });
      }
    }

    // TODO send to DS Model
    // TODO DSModel makes axios call to DS
    // TODO pass file into DS
  }
);

module.exports = router;
