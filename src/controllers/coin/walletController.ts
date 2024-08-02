// src/controllers/coin/WalletController.ts

import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth'; // Adjust the path as necessary
import { walletService } from '../../services/coin/walletService';

export class WalletController {
    async getBalance(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const balance = await walletService.getBalance(req.user.userId);
            res.status(200).json({ balance });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: 'Error fetching balance', error: errorMessage });
        }
    }

    async transferCoins(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { toUserId, amount } = req.body;

            if (!toUserId || !amount || amount <= 0) {
                return res.status(400).json({ message: 'Invalid transfer parameters' });
            }

            await walletService.transferCoins(req.user.userId, toUserId, amount);
            res.status(200).json({ message: 'Transfer successful' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: 'Error transferring coins', error: errorMessage });
        }
    }
}

export const walletController = new WalletController();