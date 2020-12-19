const express = require('express');
const Tags = require('./tagModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

// TODO add auth to router

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Tags:
 *      type: object
 *      required:
 *        - tags
 *      properties:
 *        tags:
 *          type: array
 *          description: An array of tags for different tags
 *      example:
 *        keywords: ['LGBTQ']
 *
 * /tags/grounds:
 *  get:
 *    description: Returns two lists of tags
 *    summary: Get a list of all tags
 *    security:
 *      - okta: []
 *    tags:
 *      - tags
 *    responses:
 *      200:
 *        description: array of tags
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tags'
 *              example:
 *                - protected_grounds: ['LGBTQ']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/grounds', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Tags.findAllProt()
    .then((Tags) => {
      Cache.makeCache(key, JSON.stringify(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /tags/social:
 *  get:
 *    description: Returns two lists of tags
 *    summary: Get a list of all tags
 *    security:
 *      - okta: []
 *    tags:
 *      - tags
 *    responses:
 *      200:
 *        description: array of tags
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tags'
 *              example:
 *                - social_group_type: ['LGBTQ']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/social', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Tags.findAllSoc()
    .then((Tags) => {
      Cache.makeCache(key, JSON.stringify(Tags));
      res.status(200).json(Tags);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
