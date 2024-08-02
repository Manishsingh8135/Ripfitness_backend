import { Types } from 'mongoose';
import { IWallet } from '../../../src/models/coin/Wallet';

export const sampleWalletData = {
  _id: new Types.ObjectId(),
  user: new Types.ObjectId(),
  balance: 1000,
  lastUpdated: new Date(),
};

export const createSampleWallet = (): IWallet => {
  return {
    ...sampleWalletData,
    toObject: () => sampleWalletData,
    // Add other necessary Mongoose document methods as needed
  } as IWallet;
};