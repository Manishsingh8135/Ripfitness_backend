import { Router } from 'express';
import authRoutes from './authRoutes';
import joinRequestRoutes from './joinRequestRoutes';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';

const router:Router = Router();

router.use('/auth', authRoutes);
router.use('/join-requests', joinRequestRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);

export default router;
