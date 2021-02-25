const express = require('express');
const NewCases = require('./newCaseModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Unapproved_Case:
 *      type: object
 *      required:
 *        - id
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
 *        submissionStatus:
 *            type: string
 *            description: Status of the newly created case. Values are "pending" or "submitted"
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
 *        submissionStatus: pending
 *
 * /newcase:
 *  get:
 *    description: Returns a list of unapproved case
 *    summary: Get a list of all cases that need to be reviewed by administration
 *    security:
 *      - okta: []
 *    tags:
 *      - newcase
 *    responses:
 *      200:
 *        description: array of unapproved cases
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Unapproved_Case'
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
 *                  credibility_of_determination: false
 *                  case_status: 'Closed'
 *                  judge_decision: 'Denied'
 *                  judge_name: 'John Smith'
 *                  submissionStatus: pending
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
 *                  submissionStatus: 'submitted'
 */

router.get('/', (req, res) => {
  NewCases.getAll()
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /newcase:
 *  post:
 *    summary: Add a newly created case to the database
 *    security:
 *      - okta: []
 *    tags:
 *      - newcase
 *    requestBody:
 *      description: Object to be added to the Unapproved_Cases table
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Unapproved_Case'
 *    responses:
 *      201:
 *        description:
 *        content:
 *          application/json:
 *            example: { message: 'New case created'}
 *            schema:
 *              type: object
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', async (req, res) => {
  const newCase = req.body;
  NewCases.add(newCase)
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: 'New case created' });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: e.message });
    });
});

module.exports = router;
