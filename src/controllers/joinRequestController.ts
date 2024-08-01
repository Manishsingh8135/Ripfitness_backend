import { Request, Response } from 'express';
import { joinRequestService } from '../services/joinRequestService';
import {asyncHandler} from '../utils/asyncHandler'



export const createJoinRequest = asyncHandler(async(req:Request, res: Response) => {
  const data = req.body
  const joinRequest = await joinRequestService.createJoinRequest(data)
  res.status(201).json(joinRequest)
})

export const getJoinRequests = asyncHandler(async (req: Request, res: Response) => {
  const joinRequests = await joinRequestService.getJoinRequests();
  res.status(200).json(joinRequests)
})

export const checkJoinStatus = asyncHandler(async (req: Request, res: Response) => {
    const {email} = req.params;
    const joinStatus = await joinRequestService.checkJoinStatus(email);
    res.status(200).json(joinStatus?.status)
  
})

export const updateJoinRequestStatus = asyncHandler(async (req: Request , res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedJoinRequest = await joinRequestService.updateJoinRequestStatus(id, status);
  if (!updatedJoinRequest) {
    return res.status(404).json({ message: "Join request not found" })
  }
  res.status(200).json(updatedJoinRequest)
})