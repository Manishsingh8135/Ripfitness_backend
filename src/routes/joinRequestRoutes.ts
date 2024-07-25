import { Router } from 'express';
import { createJoinRequest, getAllJoinRequests } from '../controllers/joinRequestController';

const router = Router();

router.post('/', createJoinRequest);
router.get('/', getAllJoinRequests);

export default router;