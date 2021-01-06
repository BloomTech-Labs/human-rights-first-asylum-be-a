const request = require('supertest');
const express = require('express');
const Case = require('../../api/keywords/keywordsModel');
const caseRouter = require('../../api/keywords/keywordsRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/keywords/keywordsModel');

describe('keywords router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/keywords'], caseRouter);
    jest.clearAllMocks();
  });

  describe('GET /keywords', () => {
    it('should return 200', async () => {
      Case.findAll.mockResolvedValue([]);
      const res = await request(server).get('/keywords');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Case.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /keywords/pos', () => {
    it('should return 200', async () => {
      Case.findAll.mockResolvedValue([]);
      const res = await request(server).get('/keywords/pos');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Case.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /keywords/neg', () => {
    it('should return 200', async () => {
      Case.findAll.mockResolvedValue([]);
      const res = await request(server).get('/keywords/neg');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Case.findAll.mock.calls.length).toBe(1);
    });
  });
});
