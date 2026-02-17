import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

const recalculateAttendancePercentage = async (studentId) => {
  const records = await Attendance.find({ student: studentId });
  if (!records.length) return 0;

  const presentCount = records.filter((record) => record.status === 'present').length;
  const percentage = (presentCount / records.length) * 100;
  await Student.findByIdAndUpdate(studentId, { attendancePercentage: Number(percentage.toFixed(2)) });
  return percentage;
};

export const markAttendance = async (req, res, next) => {
  try {
    const { student, date, status } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { student, date: new Date(date) },
      { status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const attendancePercentage = await recalculateAttendancePercentage(student);
    res.status(201).json({ attendance, attendancePercentage });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByStudent = async (req, res, next) => {
  try {
    const records = await Attendance.find({ student: req.params.studentId }).sort({ date: 1 });
    res.json(records);
  } catch (error) {
    next(error);
  }
};
