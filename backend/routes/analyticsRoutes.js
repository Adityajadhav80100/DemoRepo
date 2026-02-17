import express from 'express';
import { getClassAnalytics, getStudentAnalytics } from '../controllers/analyticsController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/class', protect, authorize('teacher', 'admin'), getClassAnalytics);
router.get('/student/:studentId', protect, authorize('teacher', 'admin', 'student'), getStudentAnalytics);

export default router;
