const request = require('supertest');
const express = require('express');
const Judge = require('../../api/judges/judgeModel');
const judgeRouter = require('../../api/judges/judgeRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/judges/judgeModel');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('judges router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/judge', '/judges'], judgeRouter);
    jest.clearAllMocks();
  });
});
