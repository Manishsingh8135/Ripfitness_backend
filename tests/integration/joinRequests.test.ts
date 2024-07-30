import request from 'supertest';
import app from '../../src/app';

describe('Join Request endpoints', () => {
  it('should have a create join request endpoint', async () => {
    const res = await request(app).post('/api/join-requests');
    expect(res.status).not.toBe(404);
  });

  it('should have a get all join requests endpoint', async () => {
    const res = await request(app).get('/api/join-requests');
    expect(res.status).not.toBe(404);
  });
});