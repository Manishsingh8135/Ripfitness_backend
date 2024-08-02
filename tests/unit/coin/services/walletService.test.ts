import { WalletService } from '../../../../src/services/coin/walletService';
import Wallet, { IWallet } from '../../../../src/models/coin/Wallet';
import { sampleWalletData, createSampleWallet } from '../../../fixtures/coin/walletFixtures';
import { Types } from 'mongoose';

jest.mock('../../../../src/models/coin/Wallet');

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(() => {
    walletService = new WalletService();
    jest.clearAllMocks();
  });

  describe('getWallet', () => {
    it('should return existing wallet', async () => {
      const sampleWallet = createSampleWallet();
      (Wallet.findOne as jest.Mock).mockResolvedValue(sampleWallet);

      const result = await walletService.getWallet(sampleWalletData.user.toString());

      expect(result).toEqual(sampleWallet);
      expect(Wallet.findOne).toHaveBeenCalledWith({ user: sampleWalletData.user.toString() });
    });

    it('should create a new wallet if not found', async () => {
      const sampleWallet = createSampleWallet();
      (Wallet.findOne as jest.Mock).mockResolvedValue(null);
      (Wallet.create as jest.Mock).mockResolvedValue(sampleWallet);

      const result = await walletService.getWallet(sampleWalletData.user.toString());

      expect(result).toEqual(sampleWallet);
      expect(Wallet.create).toHaveBeenCalledWith({ user: sampleWalletData.user.toString(), balance: 0 });
    });
  });

  describe('updateBalance', () => {
    it('should update wallet balance', async () => {
      const updatedWallet = createSampleWallet();
      updatedWallet.balance = 1100;
      (Wallet.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedWallet);

      const result = await walletService.updateBalance(sampleWalletData.user.toString(), 100);

      expect(result).toEqual(updatedWallet);
      expect(Wallet.findOneAndUpdate).toHaveBeenCalledWith(
        { user: sampleWalletData.user.toString() },
        { $inc: { balance: 100 }, lastUpdated: expect.any(Date) },
        { new: true, upsert: true }
      );
    });
  });

  describe('getBalance', () => {
    it('should return wallet balance', async () => {
      const sampleWallet = createSampleWallet();
      (Wallet.findOne as jest.Mock).mockResolvedValue(sampleWallet);

      const result = await walletService.getBalance(sampleWalletData.user.toString());

      expect(result).toEqual(sampleWallet.balance);
    });
  });

  describe('transferCoins', () => {
    it('should transfer coins between wallets', async () => {
      const mockSession = {
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
      };
      (Wallet.startSession as jest.Mock).mockResolvedValue(mockSession);
      
      const updateBalanceSpy = jest.spyOn(walletService, 'updateBalance').mockResolvedValue(createSampleWallet());

      await walletService.transferCoins('fromUserId', 'toUserId', 100);

      expect(updateBalanceSpy).toHaveBeenCalledTimes(2);
      expect(updateBalanceSpy).toHaveBeenCalledWith('fromUserId', -100);
      expect(updateBalanceSpy).toHaveBeenCalledWith('toUserId', 100);
      expect(mockSession.startTransaction).toHaveBeenCalled();
      expect(mockSession.commitTransaction).toHaveBeenCalled();
      expect(mockSession.endSession).toHaveBeenCalled();
    });
  });
});