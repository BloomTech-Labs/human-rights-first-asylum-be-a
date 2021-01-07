const request = require('supertest');
const express = require('express');
const Judges = require('../../api/judges/judgeModel');
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
      Judges.findAll.mockResolvedValue([]);
      const res = await request(server).get('/judges');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(Judges.findAll.mock.calls.length).toBe(0);
    });
  });

  describe('GET /judges/:name', () => {
    it('should return 200 when judge found', async () => {
      Judges.findFullDataByName.mockResolvedValue({
        name: 'Test001 User',
        judge_county: 'Georgia',
        judge_image: 'www.google.com',
        date_appointed: Date.now(),
      });
      const res = await request(server).get('/judges/Test001%20User');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test001 User');
      expect(Judges.findFullDataByName.mock.calls.length).toBe(0);
    });

    it('should return 404 when no user found', async () => {
      Judges.findFullDataByName.mockResolvedValue();
      const res = await request(server).get('/judges/BobSmith');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('JudgeNotFound');
    });
  });
});
