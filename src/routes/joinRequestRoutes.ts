// src/routes/joinRequestRoutes.ts

import { Router } from 'express';
import { checkJoinStatus, createJoinRequest, getJoinRequests, updateJoinRequestStatus } from '../controllers/joinRequestController';
import { auth } from '../middleware/auth';

// Explicitly type the router
const router: Router = Router();

router.post('/', createJoinRequest);
router.get('/', getJoinRequests);
router.post('/:email', checkJoinStatus)
router.patch('/:id/status', updateJoinRequestStatus);

export default router;