const request = require('supertest');
const express = require('express');
const Judge = require('../../api/judges/judgeModel');
const judgeRouter = require('../../api/judges/judgeRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/judges/judgeModel');

describe('judges router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/judge', '/judges'], judgeRouter);
    jest.clearAllMocks();
  });

  describe('GET /judges', () => {
    it('should return 200', async () => {
      Judge.findAll.mockResolvedValue([]);
      const res = await request(server).get('/judges');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Judge.findAll.mock.calls.length).toBe(1);
    });
  });
});
