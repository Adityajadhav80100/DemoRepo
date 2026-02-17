import express from 'express';
import { addMarks, getMarksByStudent } from '../controllers/marksController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher', 'admin'), addMarks);
router.get('/:studentId', protect, authorize('teacher', 'admin', 'student'), getMarksByStudent);

export default router;
