const request = require('supertest');
const express = require('express');
const Case = require('../../api/cases/caseModel');
const caseRouter = require('../../api/cases/caseRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/cases/caseModel');

describe('cases router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/case', '/cases'], caseRouter);
    jest.clearAllMocks();
  });

  describe('GET /cases', () => {
    it('should return 200', async () => {
      Case.findAll.mockResolvedValue([]);
      const res = await request(server).get('/cases');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Case.findAll.mock.calls.length).toBe(1);
    });
  });
});
