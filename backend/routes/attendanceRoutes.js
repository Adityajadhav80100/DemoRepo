import express from 'express';
import { getAttendanceByStudent, markAttendance } from '../controllers/attendanceController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher', 'admin'), markAttendance);
router.get('/:studentId', protect, authorize('teacher', 'admin', 'student'), getAttendanceByStudent);

export default router;
