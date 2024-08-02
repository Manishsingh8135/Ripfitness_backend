import { Types } from 'mongoose';

export const sampleTransaction = {
  _id: new Types.ObjectId(),
  user: new Types.ObjectId(),
  amount: 100,
  type: 'earn',
  description: 'Test transaction',
  timestamp: new Date(),
};

export const sampleTransactions = [
  sampleTransaction,
  {
    _id: new Types.ObjectId(),
    user: sampleTransaction.user,
    amount: 50,
    type: 'spend',
    description: 'Another test transaction',
    timestamp: new Date(),
  },
];