import jwt from 'jsonwebtoken';

export const generateTestToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });
};