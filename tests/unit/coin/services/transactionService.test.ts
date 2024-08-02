import { TransactionService } from '../../../../src/services/coin/transactionService';
import Transaction from '../../../../src/models/coin/Wallet';
import Wallet from '../../../../src/models/coin/Wallet';
import { sampleTransaction, sampleTransactions } from '../../../fixtures/coin/transactionFixtures';

jest.mock('../../../../src/models/coin/Transaction');
jest.mock('../../../../src/models/coin/Wallet');

describe('TransactionService', () => {
  let transactionService: TransactionService;

  beforeEach(() => {
    transactionService = new TransactionService();
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a transaction and update wallet', async () => {
      const mockSave = jest.fn().mockResolvedValue(sampleTransaction);
      const mockFindOneAndUpdate = jest.fn().mockResolvedValue({ balance: 1100 });

      (Transaction.prototype.save as jest.Mock) = mockSave;
      (Wallet.findOneAndUpdate as jest.Mock) = mockFindOneAndUpdate;

      const result = await transactionService.createTransaction(
        sampleTransaction.user.toString(),
        sampleTransaction.amount,
        sampleTransaction.type as 'earn' | 'spend',
        sampleTransaction.description
      );

      expect(result).toEqual(sampleTransaction);
      expect(mockSave).toHaveBeenCalled();
      expect(mockFindOneAndUpdate).toHaveBeenCalled();
    });

    // Add more tests for error cases and other scenarios
  });

  describe('getTransactions', () => {
    it('should return transactions for a user', async () => {
      const mockFind = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockReturnThis();
      const mockLimit = jest.fn().mockReturnThis();
      const mockSkip = jest.fn().mockResolvedValue(sampleTransactions);

      (Transaction.find as jest.Mock) = mockFind;
      (Transaction.find().sort as jest.Mock) = mockSort;
      (Transaction.find().sort().limit as jest.Mock) = mockLimit;
      (Transaction.find().sort().limit().skip as jest.Mock) = mockSkip;

      const result = await transactionService.getTransactions(sampleTransaction.user.toString());

      expect(result).toEqual(sampleTransactions);
      expect(mockFind).toHaveBeenCalledWith({ user: sampleTransaction.user.toString() });
      expect(mockSort).toHaveBeenCalledWith({ timestamp: -1 });
      expect(mockLimit).toHaveBeenCalledWith(10);
      expect(mockSkip).toHaveBeenCalledWith(0);
    });
  });

  describe('getTransactionById', () => {
    it('should return a transaction by id', async () => {
      (Transaction.findById as jest.Mock).mockResolvedValue(sampleTransaction);

      const result = await transactionService.getTransactionById(sampleTransaction._id.toString());

      expect(result).toEqual(sampleTransaction);
      expect(Transaction.findById).toHaveBeenCalledWith(sampleTransaction._id.toString());
    });
  });
});