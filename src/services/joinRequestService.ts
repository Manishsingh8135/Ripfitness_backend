// src/services/joinRequestService.ts

import { JoinRequest, IJoinRequest } from '../models/JoinRequest';
import { emailService } from './emailService';
import { userService } from './userService';
import bcrypt from 'bcryptjs';


export class JoinRequestService {
  async createJoinRequest(data: Partial<IJoinRequest>): Promise<IJoinRequest> {
    const joinRequest = new JoinRequest(data);
    return joinRequest.save();
  }

  async getJoinRequests(): Promise<IJoinRequest[]> {
    return JoinRequest.find().sort({ createdAt: -1 });
  }

  async checkJoinStatus ( email: string): Promise<IJoinRequest | null>{
    return JoinRequest.findOne({email})
  }

  async updateJoinRequestStatus(id: string, status: 'approved' | 'rejected'): Promise<IJoinRequest | null> {
    const joinRequest = await JoinRequest.findByIdAndUpdate(id, { status }, { new: true });
    
    if (joinRequest && status === 'approved') {
      const tempPassword = await bcrypt.hash('temporary_password', 10); // Replace 'temporary_password' with your logic
      

     // Create a new user account
      await userService.createUser({
        name: joinRequest.name,
        email: joinRequest.email,
        password: tempPassword
        // Add other necessary fields
      });

      // Send welcome email
      try {
        await emailService.sendWelcomeEmail(joinRequest.email, joinRequest.name);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Optionally, you could implement a retry mechanism or alert an admin
      }
    }

    return joinRequest;
  }
}

export const joinRequestService = new JoinRequestService();