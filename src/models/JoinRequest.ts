// src/models/JoinRequest.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IJoinRequest extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const joinRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export const JoinRequest = mongoose.model<IJoinRequest>('JoinRequest', joinRequestSchema);