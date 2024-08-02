import express, { Router } from 'express';
import { transactionController } from '../../controllers/coin/transactionController';
import { walletController } from '../../controllers/coin/walletController';
import { auth } from '../../middleware/auth';

const router: Router = express.Router();

// Transaction routes
router.post('/transactions', auth, transactionController.createTransaction);
router.get('/transactions', auth, transactionController.getTransactions);
router.get('/transactions/:id', auth, transactionController.getTransactionById);

// Wallet routes
router.get('/wallet/balance', auth, walletController.getBalance);
router.post('/wallet/transfer', auth, walletController.transferCoins);

export default router;