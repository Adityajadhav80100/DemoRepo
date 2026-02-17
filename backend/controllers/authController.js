import User from '../models/User.js';
import Student from '../models/Student.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'student', studentProfileData } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error('User already exists');
    }

    let studentProfile;
    if (role === 'student' && studentProfileData) {
      studentProfile = await Student.create(studentProfileData);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      studentProfile: studentProfile?._id
    });

    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, studentProfile }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('studentProfile');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentProfile: user.studentProfile || null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).select('-password').populate('studentProfile');
    res.json(me);
  } catch (error) {
    next(error);
  }
};
