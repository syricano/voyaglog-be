import ErrorResponse from '../utils/ErrorResponse.js';

export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return next(new ErrorResponse("Username is required and must be a non-empty string", 400));
  }

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    return next(new ErrorResponse("A valid email is required", 400));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(new ErrorResponse("Password is required and must be at least 6 characters long", 400));
  }

  next();
};

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
