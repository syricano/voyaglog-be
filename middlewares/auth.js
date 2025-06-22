import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET;

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ErrorResponse('Not authorized, no token', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new ErrorResponse('User not found', 404);
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ErrorResponse('Not authorized, token failed', 401);
  }
});
