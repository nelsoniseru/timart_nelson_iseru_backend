const { body } = require('express-validator');

const validateUserInput = [
  body('username')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters'),
];

const validateEmailInput = [
  body('username')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
];
const validateOtp = [
  body('otp')
    .notEmpty()
    .withMessage('Otp is required')
    .isLength({ min: 5, max: 5 })
    .withMessage('Otp must be 5 digits'),
];

const validateResetPasswordInput = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters'),
  body('c_password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters'),
];
module.exports = {
  validateUserInput,
  validateEmailInput,
  validateOtp,
  validateResetPasswordInput,
};
