import { Request, Response } from 'express';

export const createJoinRequest = (req: Request, res: Response) => {
  // Implement join request creation logic
  res.status(201).json({ message: 'Join request created successfully' });
};

export const getAllJoinRequests = (req: Request, res: Response) => {
  // Implement fetching all join requests logic
  res.status(200).json({ message: 'Fetched all join requests' });
};
