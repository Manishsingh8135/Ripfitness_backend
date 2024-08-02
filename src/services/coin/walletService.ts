// src/services/coin/walletService.ts

import { IWallet } from '../../models/coin/Wallet';
import Wallet from '../../models/coin/Wallet';
import mongoose from 'mongoose';

export class WalletService {
  async getWallet(userId: string): Promise<IWallet> {
    let wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      wallet = await Wallet.create({ user: userId, balance: 0 });
    }
    return wallet;
  }

  async updateBalance(userId: string, amount: number): Promise<IWallet> {
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $inc: { balance: amount }, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    if (!wallet) {
      throw new Error('Failed to update wallet');
    }

    return wallet;
  }

  async getBalance(userId: string): Promise<number> {
    const wallet = await this.getWallet(userId);
    return wallet.balance;
  }

  async transferCoins(fromUserId: string, toUserId: string, amount: number): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await this.updateBalance(fromUserId, -amount);
      await this.updateBalance(toUserId, amount);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export const walletService = new WalletService();