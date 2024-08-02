// src/controllers/TransactionController.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth'; // Adjust the path as necessary
import { transactionService } from '../../services/coin/transactionService';

export class TransactionController {
  async createTransaction(req: AuthenticatedRequest, res: Response) {
    try {
      const { amount, type, description, relatedEntity } = req.body;
      
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const userId = req.user.userId;
      
      const transaction = await transactionService.createTransaction(
        userId,
        amount,
        type,
        description,
        relatedEntity
      );
      
      res.status(201).json(transaction);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error creating transaction', error: errorMessage });
    }
  }

  async getTransactions(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const userId = req.user.userId;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = parseInt(req.query.skip as string) || 0;
      
      const transactions = await transactionService.getTransactions(userId, limit, skip);
      
      res.status(200).json(transactions);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error fetching transactions', error: errorMessage });
    }
  }

  async getTransactionById(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const transactionId = req.params.userId;
      const transaction = await transactionService.getTransactionById(transactionId);
      
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      if (transaction.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      res.status(200).json(transaction);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error fetching transaction', error: errorMessage });
    }
  }
}

export const transactionController = new TransactionController();
