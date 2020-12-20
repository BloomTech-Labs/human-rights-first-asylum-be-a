const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const Cache = require('../middleware/cache');

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

/**
 * @swagger
 * components:
 *  schemas:
 *    Form:
 *      type: object
 *      required:
 *        - judge_names
 *        - social_group_type
 *        - protected_grounds
 *      properties:
 *        judge_names:
 *          type: array
 *          description: An array of tags for different tags
 *        social_group_type:
 *          type: array
 *          description: An array of tags for different tags
 *        protected_grounds:
 *          type: array
 *          description: An array of tags for different tags
 *      example:
 *        judge_names: ["Bob Smith", "Jane Doe"]
 *        social_group_type: ['female', 'LGBTQ']
 *        protected_grounds: ['LGBTQ']
 *
 * /data/form:
 *  get:
 *    description: Returns three lists of strings
 *    summary: Get a list of all strings
 *    security:
 *      - okta: []
 *    tags:
 *    - data
 *    form:
 *      - judge_names
 *        social_group_type
 *        protected_grounds
 *    responses:
 *      200:
 *        description: array of strings
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Form'
 *              example:
 *                -  judge_names: ["Bob Smith", "Jane Doe"]
 *                   social_group_type: ['female', 'LGBTQ']
 *                   protected_grounds: ['LGBTQ']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/form', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  dsModel
    .formData()
    .then((form) => {
      Cache.makeCache(key, JSON.stringify(form));
      res.status(200).json(form);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
/**
 * @swagger
 * /data/upload:
 *  post:
 *    summary: Post a form OR upload a document to the database
 *    security:
 *      - okta: []
 *    tags:
 *      - data
 *
 *    requestBody:
 *      description: Data object/file to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Case'
 *        multipart/form-data:
 *            schema:
 *                type: string
 *                form: binary
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: A confirmation message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: file uploaded
 */
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
      }
      if (mime.lookup(uploadedFile) == 'application/json') {
        dsModel
          .sendJSON(uploadedFile)
          .then((response) => {
            res.status(200).json({ message: 'Form Successfully Uploaded' });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res.status(400).json({ message: 'Please send valid file type.' });
      }
    }
  }
);

module.exports = router;
