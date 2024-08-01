import { Router } from 'express';
import { login, register, logout, changePassword } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router:Router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.patch('/change-password', auth, changePassword)

export default router;