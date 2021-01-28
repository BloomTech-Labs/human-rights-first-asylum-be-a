const express = require('express');
const Judges = require('./judgeModel');
const verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const fs = require('fs');
const JSZip = require('jszip');
const cacache = require('cacache');

// TODO add auth to router - final phase

// router
const router = express.Router();

//middleware

router.use('/:name', verify.verifyJudge);

//routes
router.get('/', Cache.checkCache, (req, res) => {
  Judges.findAllSimple()
    .then((judges) => {
      Cache.makeCache('/judges', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});
/**
 * @swagger
 * components:
 *  schemas:
 *    Judge:
 *      type: object
 *      required:
 *        - name
 *        - judge_county
 *        - judge_image
 *        - date_appointed
 *        - birth_date
 *        - biography
 *        - denial_rate
 *        - approval_rate
 *        - appointed_by
 *        - positive_keywords
 *        - negative_keywords
 *        - countries
 *        - cases
 *      properties:
 *        name:
 *          type: string
 *          description: This is a foreign key (the judge's name)
 *        judge_county:
 *          type: string
 *          description: Where the judge holds court
 *        judge_image:
 *           type: string
 *           description: An image of the judge
 *        date_appointed:
 *            type: string
 *            description: When the judge was appointed to the court
 *        birth_date:
 *            type: string
 *            description: When the judge was born
 *        biography:
 *            type: string
 *            description: Relevant information about the judge
 *        denial_rate:
 *            type: number
 *            description: The percentage of refugees denied
 *        approval_rate:
 *            type: number
 *            description: The percentage of refugees approved
 *        appointed_by:
 *            type: string
 *            description: Which administration appointed the judge
 *        positive_keywords:
 *            type: array
 *            description: A list of keywords that seem to have the most positive effect on the judge
 *        negative_keywords:
 *            type: array
 *            description: A list of keywords that seem to have the most negative effect on the judge
 *        countries:
 *            type: array
 *            description: A list of objects of countries from which the refugees seeking asylum in the judge's court have come
 *        cases:
 *            type: array
 *            description: A list of case objects that the judge has ruled on
 *      example:
 *                  name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  positive_keywords: ['female', 'christian']
 *                  negative_keywords: ['male', 'farmer']
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 *
 * /judges:
 *  get:
 *    description: Returns a list of judge
 *    summary: Get a list of all judges
 *    security:
 *      - okta: []
 *    tags:
 *      - judges
 *    responses:
 *      200:
 *        description: array of judges
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Judge'
 *              example:
 *                - name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  positive_keywords: ['female', 'christian']
 *                  negative_keywords: ['male', 'farmer']
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 *                - name: 'Frank Jones'
 *                  judge_county: 'Albemarle'
 *                  judge_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  date_appointed: '01-12-1927'
 *                  biography: 'Once upon a time, I was not a judge. And then I was.'
 *                  denial_rate: 98.2
 *                  approval_rate: 1.8
 *                  appointed_by: 'FDR'
 *                  positive_keywords: ['female', 'christian']
 *                  negative_keywords: ['male', 'farmer']
 *                  countries: ['TBA']
 *                  cases: ['TBA']
 */

router.get('/all', Cache.checkCache, (req, res) => {
  Judges.findAll()
    .then((judges) => {
      Cache.makeCache('/judges/all', JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    judgeName:
 *      name: name
 *      in: path
 *      description: Name of the judge to return
 *      required: true
 *      example: "Jack%20Sparrow"
 *      schema:
 *        type: string
 *
 * /judge/{name}:
 *  get:
 *    description: Find judges by name
 *    summary: Returns a single judge
 *    security:
 *      - okta: []
 *    tags:
 *      - judges
 *    parameters:
 *      - $ref: '#/components/parameters/judgeName'
 *    responses:
 *      200:
 *        description: A judge object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Judge'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'judge not found'
 */

router.get('/:name', Cache.checkCache, (req, res) => {
  const name = String(req.params.name);
  const key = `/judge/${name}`;
  Judges.findFullDataByName(name)
    .then((judges) => {
      Cache.makeCache(key, JSON.stringify(judges));
      res.status(200).json(judges);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name/csv', Cache.zipCache, (req, res) => {
  const name = String(req.params.name);

  Judges.writeCSV(name)
    .then((csv) => {
      const zip = new JSZip();

      zip.file(`${name}_judge_data.csv`, csv[0]);
      zip.file(`${name}_country_data.csv`, csv[1]);
      zip.file(`${name}_case_data.csv`, csv[2]);
      zip.file(`${name}_social_data.csv`, csv[3]);
      zip.file(`${name}_grounds_data.csv`, csv[4]);

      cacache.tmp
        .withTmp('/tmp/data', (dir) => {
          zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream(`${dir}.zip`))
            .on('finish', function () {
              res.header('Content-Type', 'application/zip');
              res.attachment(`${name}_data.zip`);
              res.status(200).download(`${dir}.zip`);
            });
        })
        .then(() => {
          // `dir` no longer exists
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
