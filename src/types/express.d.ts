// src/types/express.d.ts

import { IUser } from '@/models/User';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & IUser;
    }
  }
}

export {}; // This is important to make the file a module
