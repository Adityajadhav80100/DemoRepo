import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import { predictPerformance } from '../ai-engine/performancePredictor.js';
import { detectDropoutRisk } from '../ai-engine/dropoutRiskDetector.js';
import { analyzeAttendanceTrend } from '../ai-engine/attendancePatternAnalyzer.js';
import { generateRecommendations } from '../ai-engine/recommendationEngine.js';

export const getStudentAnalytics = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const attendanceHistory = await Attendance.find({ student: student._id }).sort({ date: 1 });

    const performance = predictPerformance(student);
    const dropoutRisk = detectDropoutRisk(student);
    const attendanceTrend = analyzeAttendanceTrend(attendanceHistory);
    const recommendations = generateRecommendations(student, { performance, dropoutRisk });

    res.json({
      student,
      performance,
      dropoutRisk,
      attendanceTrend,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};

export const getClassAnalytics = async (_req, res, next) => {
  try {
    const students = await Student.find();
    const analytics = await Promise.all(
      students.map(async (student) => {
        const attendanceHistory = await Attendance.find({ student: student._id }).sort({ date: 1 });
        const performance = predictPerformance(student);
        const dropoutRisk = detectDropoutRisk(student);
        return {
          student,
          performance,
          dropoutRisk,
          attendanceTrend: analyzeAttendanceTrend(attendanceHistory)
        };
      })
    );

    res.json(analytics);
  } catch (error) {
    next(error);
  }
};
