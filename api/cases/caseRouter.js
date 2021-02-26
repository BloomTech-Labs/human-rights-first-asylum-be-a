const express = require('express');
const Cases = require('./caseModel');
const AWS = require('../../utils/AWS');
const Verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const CSV = require('csv-string');
const router = express.Router();

// TODO add auth to route also - final phase

//middleware

router.use('/:id', Verify.verifyCase);

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Case:
 *      type: object
 *      required:
 *        - id
 *        - case_url
 *        - court_type
 *        - hearing_type
 *        - refugee_origin
 *        - hearing_location
 *        - hearing_date
 *        - decision_date
 *        - credibility_of_refugee
 *        - credibility_of_determination
 *        - case_status
 *        - judge_decision
 *        - judge_name
 *        - social_group_type
 *        - protected_ground
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the case number)
 *        case_url:
 *          type: string
 *          description: Unique URL to access AWS S3 Bucket
 *        court_type:
 *           type: string
 *           description: In which type of court the case was/will be heard
 *        hearing_type:
 *            type: string
 *            description: The type of hearing
 *        refugee_origin:
 *            type: string
 *            description: Which country the refugee is from
 *        hearing_location:
 *            type: string
 *            description: The location of the hearing
 *        hearing_date:
 *            type: string
 *            description: The date of the hearing
 *        decision_date:
 *            type: string
 *            description: The date the judge made their decision
 *        credibility_of_refugee:
 *            type: string
 *            description: TBD
 *        credibility_of_determination:
 *            type: boolean
 *            description: TBD
 *        case_status:
 *            type: string
 *            description: TBD
 *        judge_decision:
 *            type: string
 *            description: The decision of the judge
 *        judge_name:
 *            type: string
 *            description: The name of the judge (foreign key)
 *        social_group_type:
 *            type: array
 *            description: The protected social groups to which the refugee belongs
 *        protected_ground:
 *            type: array
 *            description: The protected reasons a refugee may be seeking asylum
 *      example:
 *        id: 'K13B9DLDBIA'
 *        case_url: '/K13B9DLDBIA/Frank_James.pdf'
 *        court_type: 'Appellate Court'
 *        hearing_type: 'Initial'
 *        refugee_origin: 'Uganda'
 *        hearing_location: 'Atlanta'
 *        hearing_date: '11-06-2020'
 *        decision_date: '11-06-2020'
 *        credibility_of_refugee: 'TBA'
 *        credibility_of_determination: false
 *        case_status: 'Closed'
 *        judge_decision: 'Denied'
 *        judge_name: 'John Smith'
 *        social_group_type: ['LGBTQ']
 *        protected_ground: ['LGBTQ']
 *
 * /cases:
 *  get:
 *    description: Returns a list of case
 *    summary: Get a list of all cases
 *    security:
 *      - okta: []
 *    tags:
 *      - cases
 *    responses:
 *      200:
 *        description: array of cases
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Case'
 *              example:
 *                - id: 'K13B9DLDBIA'
 *                  case_url: '/K13B9DLDBIA/Frank_James.pdf'
 *                  court_type: 'Appellate Court'
 *                  hearing_type: 'Initial'
 *                  refugee_origin: 'Uganda'
 *                  hearing_location: 'Atlanta'
 *                  hearing_date: '11-06-2020'
 *                  decision_date: '11-06-2020'
 *                  credibility_of_refugee: 'TBA'
 *                  credibility_of_determination: true
 *                  case_status: 'Closed'
 *                  judge_decision: 'Denied'
 *                  judge_name: 'John Smith'
 *                  social_group_type: ['LGBTQ']
 *                  protected_ground: ['LGBTQ']
 *                - id: 'K13B9DLDBIA'
 *                  case_url: '/K13B9DLDBIA/Frank_James.pdf'
 *                  court_type: 'Appellate Court'
 *                  hearing_type: 'Initial'
 *                  refugee_origin: 'Uganda'
 *                  hearing_location: 'Atlanta'
 *                  hearing_date: '11-06-2020'
 *                  decision_date: '11-06-2020'
 *                  credibility_of_refugee: 'TBA'
 *                  credibility_of_determination: false
 *                  case_status: 'Closed'
 *                  judge_decision: 'Denied'
 *                  judge_name: 'John Smith'
 *                  social_group_type: ['LGBTQ']
 *                  protected_ground: ['LGBTQ']
 */

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);

  Cases.findAll()
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
/**
 * @swagger
 * components:
 *  parameters:
 *    caseId:
 *      name: id
 *      in: path
 *      description: ID of the case to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /case/{id}:
 *  get:
 *    description: Find cases by ID
 *    summary: Returns a single case
 *    security:
 *      - okta: []
 *    tags:
 *      - cases
 *    parameters:
 *      - $ref: '#/components/parameters/caseId'
 *    responses:
 *      200:
 *        description: A case object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Case'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'case not found'
 */
router.get('/:id', (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  Cases.findById(id)
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/view-pdf', (req, res) => {
  const id = String(req.params.id);
  AWS.make_params(id)
    .then((params) => {
      AWS.fetch_pdf_view(params, res);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-pdf', (req, res) => {
  // * returns pdf of ORIGINAL case
  const id = String(req.params.id);
  AWS.make_params(id)
    .then((params) => {
      AWS.fetch_pdf_download(params, res);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-csv', Cache.csvCache, (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  Cases.writeCSV(id)
    .then((csv) => {
      Cache.makeCache(key, CSV.stringify(csv));
      res.header('Content-Type', 'text/csv');
      res.attachment(`${id}_data.csv`);
      res.status(200).send(csv);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
