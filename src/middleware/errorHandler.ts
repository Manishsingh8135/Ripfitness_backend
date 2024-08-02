import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An unexpected error occurred' : err.message;
  
  res.status(statusCode).json({
    message: message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
};