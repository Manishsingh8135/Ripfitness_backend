import { Router } from 'express';
import authRoutes from './authRoutes';
import joinRequestRoutes from './joinRequestRoutes';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import coinRoutes from './coin/index';  // Rename this import

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/join-requests', joinRequestRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/coin', coinRoutes);  // Change this line to use '/coin' as the base path

export default router;