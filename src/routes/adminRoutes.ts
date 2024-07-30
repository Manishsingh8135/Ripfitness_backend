import { Router } from 'express';
import { getDashboardStats } from '../controllers/adminController';

const router:Router = Router();

router.get('/dashboard', getDashboardStats);

export default router;
