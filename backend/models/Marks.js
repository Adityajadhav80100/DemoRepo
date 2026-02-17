import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    testName: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    assignmentSubmitted: { type: Boolean, default: false },
    assignmentScore: { type: Number, default: 0, min: 0, max: 100 }
  },
  { timestamps: true }
);

export default mongoose.model('Marks', marksSchema);
