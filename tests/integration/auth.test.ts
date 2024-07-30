import request from 'supertest';
import app from '../../src/app';

describe('Auth endpoints', () => {
  it('should have a login endpoint', async () => {
    const res = await request(app).post('/api/auth/login');
    expect(res.status).not.toBe(404);
  });

  it('should have a register endpoint', async () => {
    const res = await request(app).post('/api/auth/register');
    expect(res.status).not.toBe(404);
  });
});