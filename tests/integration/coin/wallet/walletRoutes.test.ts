import request from 'supertest';
import app from '../../../../src/app';
import { sampleWalletData } from '../../../fixtures/coin/walletFixtures';
import { connectDB, closeDB, clearDB } from '../../../../src/config/database';
import { generateTestToken } from '../../../helpers/authHelper';

describe('Wallet Routes', () => {
  let testToken: string;

  beforeAll(async () => {
    await connectDB();
    testToken = generateTestToken(sampleWalletData.user.toString());
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  describe('GET /coin/wallet/balance', () => {
    it('should return the wallet balance', async () => {
      const response = await request(app)
        .get('/coin/wallet/balance')
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance');
      expect(typeof response.body.balance).toBe('number');
    });

    it('should return 401 if no token provided', async () => {
      const response = await request(app)
        .get('/coin/wallet/balance');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /coin/wallet/transfer', () => {
    it('should transfer coins between wallets', async () => {
      // First, create another user and wallet
      const anotherUserId = 'anotherUserId';
      const anotherUserToken = generateTestToken(anotherUserId);
      
      // Ensure both users have wallets
      await request(app)
        .get('/coin/wallet/balance')
        .set('Authorization', `Bearer ${testToken}`);
      
      await request(app)
        .get('/coin/wallet/balance')
        .set('Authorization', `Bearer ${anotherUserToken}`);

      const response = await request(app)
        .post('/coin/wallet/transfer')
        .send({
          toUserId: anotherUserId,
          amount: 100,
        })
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Transfer successful');
    });

    it('should return 400 for invalid transfer amount', async () => {
      const response = await request(app)
        .post('/coin/wallet/transfer')
        .send({
          toUserId: 'anotherUserId',
          amount: -100,
        })
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(400);
    });

    // Add more tests for error cases and validation
  });
});