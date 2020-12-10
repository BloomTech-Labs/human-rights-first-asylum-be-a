const request = require('supertest');
const express = require('express');
const Case = require('../../api/cases/caseModel');
const caseRouter = require('../../api/cases/caseRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/cases/caseModel');

jest.mock('../../api/middleware/verifyDataID', () =>
  jest.fn((req, res, next) => next())
);

describe('cases router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/case', '/cases'], caseRouter);
    jest.clearAllMocks();
  });
});
