import Marks from '../models/Marks.js';
import Student from '../models/Student.js';

const recalculateAcademicMetrics = async (studentId) => {
  const allMarks = await Marks.find({ student: studentId });
  if (!allMarks.length) {
    await Student.findByIdAndUpdate(studentId, { internalMarks: 0, assignmentCompletion: 0 });
    return;
  }

  const avgMarks = allMarks.reduce((sum, row) => sum + row.score, 0) / allMarks.length;
  const submitted = allMarks.filter((row) => row.assignmentSubmitted).length;
  const assignmentCompletion = (submitted / allMarks.length) * 100;

  await Student.findByIdAndUpdate(studentId, {
    internalMarks: Number(avgMarks.toFixed(2)),
    assignmentCompletion: Number(assignmentCompletion.toFixed(2))
  });
};

export const addMarks = async (req, res, next) => {
  try {
    const entry = await Marks.create(req.body);
    await recalculateAcademicMetrics(req.body.student);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
};

export const getMarksByStudent = async (req, res, next) => {
  try {
    const marks = await Marks.find({ student: req.params.studentId }).sort({ createdAt: -1 });
    res.json(marks);
  } catch (error) {
    next(error);
  }
};
