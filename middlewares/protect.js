import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const jwtSecret = process.env.JWT_SECRET;

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized, token missing', 401));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new ErrorResponse('No user found with this token', 401));
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized, token invalid', 401));
  }
});

export default auth;
