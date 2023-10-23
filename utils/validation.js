const { body } = require('express-validator');

const validateUserInput = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters'),
];

const validateLoginInput = [
  body('email')
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

const validateOrderInput = [
  body('amt')
    .notEmpty()
    .withMessage('Amount is required'),

  body('item_name')
    .notEmpty()
    .withMessage('Item is required')
]

const validateDepositInput = [
  body('amt')
    .notEmpty()
    .withMessage('Amount is required')
]

module.exports = {
  validateUserInput,
  validateLoginInput,
  validateOrderInput,
  validateDepositInput
};
