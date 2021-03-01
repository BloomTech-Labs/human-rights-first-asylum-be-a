const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');
const Cache = require('../middleware/cache');
const upload = require('../../utils/uploadFile');

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
router.post('/upload', async (req, res) => {
  upload.uploadFile(req, res);
});

module.exports = router;
