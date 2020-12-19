const express = require('express');
const Keywords = require('./keywordsModel');
const Cache = require('../middleware/cache');

// router
const router = express.Router();

// TODO add Auth to router

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Keywords:
 *      type: object
 *      required:
 *        - keywords
 *      properties:
 *        keywords:
 *          type: array
 *          description: An array of positive/negative keywords
 *      example:
 *        keywords: ['soldier', 'woman', 'violence']
 *
 * /keywords:
 *  get:
 *    description: Returns two lists of keywords
 *    summary: Get a list of all keywords
 *    security:
 *      - okta: []
 *    tags:
 *      - keywords
 *    responses:
 *      200:
 *        description: array of keywords
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Keywords'
 *              example:
 *                - positive_keywords: ['lady', 'violence', 'aide']
 *                  negative_keywords: ['male', 'january', 'terrorist']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAll()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(keyword);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /keywords/pos:
 *  get:
 *    description: Returns two lists of all positive keywords
 *    summary: Get a list of all positive keywords
 *    security:
 *      - okta: []
 *    tags:
 *      - keywords
 *    responses:
 *      200:
 *        description: array of keywords
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Keywords'
 *              example:
 *                - positive_keywords: ['lady', 'violence', 'aide']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/pos', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAllPos()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(positive);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /keywords/neg:
 *  get:
 *    description: Returns two lists of all negative keywords
 *    summary: Get a list of all negative keywords
 *    security:
 *      - okta: []
 *    tags:
 *      - keywords
 *    responses:
 *      200:
 *        description: array of keywords
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Keywords'
 *              example:
 *                - negative_keywords: ['lady', 'violence', 'aide']
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/neg', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Keywords.findAllNeg()
    .then((keyword) => {
      Cache.makeCache(key, JSON.stringify(keyword));
      res.status(200).json(keyword);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
