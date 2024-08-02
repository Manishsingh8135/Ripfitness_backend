import request from 'supertest';
import app from '../../../../src/app';
import { sampleTransaction } from '../../../fixtures/coin/transactionFixtures';
import { connectDB, closeDB } from '../../../../src/config/database';
import { generateTestToken } from '../../../helpers/authHelper';

describe('Transaction Routes', () => {
  let testToken: string;

  beforeAll(async () => {
    await connectDB();
    testToken = generateTestToken(sampleTransaction.user.toString());
  });

  afterAll(async () => {
    await closeDB();
  });

  describe('POST /coin/transactions', () => {
    it('should create a new transaction', async () => {
      const response = await request(app)
        .post('/coin/transactions')
        .send({
          amount: sampleTransaction.amount,
          type: sampleTransaction.type,
          description: sampleTransaction.description,
        })
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.amount).toBe(sampleTransaction.amount);
      expect(response.body.type).toBe(sampleTransaction.type);
      expect(response.body.description).toBe(sampleTransaction.description);
    });

    it('should return 401 if no token provided', async () => {
      const response = await request(app)
        .post('/coin/transactions')
        .send({
          amount: sampleTransaction.amount,
          type: sampleTransaction.type,
          description: sampleTransaction.description,
        });

      expect(response.status).toBe(401);
    });

    // Add more tests for error cases and validation
  });

  describe('GET /coin/transactions', () => {
    it('should return transactions for the authenticated user', async () => {
      const response = await request(app)
        .get('/coin/transactions')
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /coin/transactions/:id', () => {
    it('should return a specific transaction', async () => {
      // First, create a transaction
      const createResponse = await request(app)
        .post('/coin/transactions')
        .send({
          amount: sampleTransaction.amount,
          type: sampleTransaction.type,
          description: sampleTransaction.description,
        })
        .set('Authorization', `Bearer ${testToken}`);

      const transactionId = createResponse.body._id;

      // Then, fetch the created transaction
      const response = await request(app)
        .get(`/coin/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(transactionId);
    });

    it('should return 404 for non-existent transaction', async () => {
      const response = await request(app)
        .get('/coin/transactions/5f7d0f414f8c2e1c3c3e9b0a')  // Non-existent ID
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(404);
    });
  });
});