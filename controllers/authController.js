import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || '6d';

// Helper to sign a token
const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: jwtExpiration,
  });
};

// Register new user
export const signup = asyncHandler(async (req, res) => {
  const { body : {firstName, lastName, username, email, password, phone} } = req;

  // Check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ErrorResponse('Email already registered', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    phone,
    email,
    password: hashedPassword,
  });

  // Sign token
  const token = signToken(newUser);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      firstName,
      lastName,
      username,
      phone,
      email: newUser.email,
    },
  });
});

// Login existing user
export const login = asyncHandler(async (req, res) => {
  const { body: {identifier, password }} = req;
  const trimmedIdentifier = identifier.trim();

  // Find user by email or username
  const user = await User.findOne({ where: {
      [trimmedIdentifier.includes('@') ? 'email' : 'username']: trimmedIdentifier
    } });
  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Sign token
  const token = signToken(user);

  res.status(200).json({
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      email: user.email,
    },
  });
});
