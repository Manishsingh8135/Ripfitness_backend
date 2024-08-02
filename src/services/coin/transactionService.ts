import { ITransaction } from '../../models/coin/Transection';
import Transaction from '../../models/coin/Transection';
import Wallet from '../../models/coin/Wallet';
import mongoose from 'mongoose';

export class TransactionService {
  async createTransaction(
    userId: string,
    amount: number,
    type: 'earn' | 'spend',
    description: string,
    relatedEntity?: { kind: string; item: string }
  ): Promise<ITransaction> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newTransaction = new Transaction({
        user: userId,
        amount,
        type,
        description,
        relatedEntity
      });

      const savedTransaction = await newTransaction.save({ session });

      const updateOperation = type === 'earn' ? { $inc: { balance: amount } } : { $inc: { balance: -amount } };
      const updatedWallet = await Wallet.findOneAndUpdate(
        { user: userId },
        { ...updateOperation, lastUpdated: new Date() },
        { new: true, upsert: true, session }
      );

      if (!updatedWallet) {
        throw new Error('Failed to update wallet');
      }

      await session.commitTransaction();
      return savedTransaction;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getTransactions(userId: string, limit: number = 10, skip: number = 0): Promise<ITransaction[]> {
    return Transaction.find({ user: userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip);
  }

  async getTransactionById(transactionId: string): Promise<ITransaction | null> {
    return Transaction.findById(transactionId);
  }
}

export const transactionService = new TransactionService();