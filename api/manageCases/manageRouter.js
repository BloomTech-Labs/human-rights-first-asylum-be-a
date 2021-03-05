const express = require('express');
const Cases = require('./manageModel');
const router = express.Router();

/**
 * @swagger
 * /manage/all:
 *  get:
 *    description: Finds all approved cases
 *    summary: Returns all approved cases
 *    security:
 *      - okta: []
 *    tags:
 *      - cases
 *    responses:
 *      200:
 *        description: An approved cases object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Case'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'approved cases not found'
 */
router.get('/all', (req, res) => {
  // const key = String(req.originalUrl);
  Cases.findAllApproved()
    .then((cases) => {
      // Cache.makeCache(JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /manage/approve:
 *  get:
 *    description: Approves a case
 *    summary: Returns approved case
 *    security:
 *      - okta: []
 *    tags:
 *      - cases
 *    responses:
 *      200:
 *        description: An approved case object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Case'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'approved case not found'
 */
router.post('/approve', (req, res) => {
  Cases.approve(req.body)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /manage/reject:
 *  get:
 *    description: Rejects case
 *    summary: Rejects case from entering db
 *    security:
 *      - okta: []
 *    tags:
 *      - cases
 *    responses:
 *      200:
 *        description: rejected case object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Case'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'approved cases not found'
 */
router.delete('/reject', (req, res) => {
  Cases.reject(req.body)
    .then((cases) => {
      // Cache.makeCache(JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
