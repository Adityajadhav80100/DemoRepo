import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    attendancePercentage: { type: Number, default: 0, min: 0, max: 100 },
    internalMarks: { type: Number, default: 0, min: 0, max: 100 },
    assignmentCompletion: { type: Number, default: 0, min: 0, max: 100 },
    previousCgpa: { type: Number, default: 0, min: 0, max: 10 }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
