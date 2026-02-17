import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Student.deleteMany(), Attendance.deleteMany(), Marks.deleteMany()]);

  const students = await Student.insertMany([
    {
      name: 'Aarav Sharma',
      rollNo: 'CSE2101',
      email: 'aarav@student.edu',
      department: 'CSE',
      semester: 5,
      attendancePercentage: 82,
      internalMarks: 74,
      assignmentCompletion: 80,
      previousCgpa: 8.1
    },
    {
      name: 'Diya Patel',
      rollNo: 'CSE2102',
      email: 'diya@student.edu',
      department: 'CSE',
      semester: 5,
      attendancePercentage: 58,
      internalMarks: 38,
      assignmentCompletion: 45,
      previousCgpa: 6.2
    },
    {
      name: 'Rohan Gupta',
      rollNo: 'ECE2103',
      email: 'rohan@student.edu',
      department: 'ECE',
      semester: 5,
      attendancePercentage: 70,
      internalMarks: 61,
      assignmentCompletion: 66,
      previousCgpa: 7.2
    }
  ]);

  await User.create([
    { name: 'System Admin', email: 'admin@college.edu', password: 'admin123', role: 'admin' },
    { name: 'Class Teacher', email: 'teacher@college.edu', password: 'teacher123', role: 'teacher' },
    {
      name: students[0].name,
      email: 'student@college.edu',
      password: 'student123',
      role: 'student',
      studentProfile: students[0]._id
    }
  ]);

  const sampleDays = Array.from({ length: 12 }, (_, i) => i + 1);
  for (const student of students) {
    for (const day of sampleDays) {
      const present = Math.random() > (student.attendancePercentage < 65 ? 0.45 : 0.15);
      await Attendance.create({
        student: student._id,
        date: new Date(`2025-01-${String(day).padStart(2, '0')}`),
        status: present ? 'present' : 'absent'
      });
    }

    await Marks.create([
      {
        student: student._id,
        subject: 'Mathematics',
        testName: 'Unit Test 1',
        score: student.internalMarks,
        assignmentSubmitted: student.assignmentCompletion > 55,
        assignmentScore: student.assignmentCompletion
      },
      {
        student: student._id,
        subject: 'Data Structures',
        testName: 'Unit Test 2',
        score: Math.min(100, student.internalMarks + 5),
        assignmentSubmitted: student.assignmentCompletion > 50,
        assignmentScore: Math.min(100, student.assignmentCompletion + 4)
      }
    ]);
  }

  console.log('Database seeded successfully');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
