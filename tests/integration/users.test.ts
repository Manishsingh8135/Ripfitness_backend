import request from 'supertest';
import app from '../../src/app';

describe('User endpoints', () => {
  it('should have a get user profile endpoint', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.status).not.toBe(404);
  });

  it('should have an update user profile endpoint', async () => {
    const res = await request(app).put('/api/users/profile');
    expect(res.status).not.toBe(404);
  });
});