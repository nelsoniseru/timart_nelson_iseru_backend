const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_ACCESS_DENIED,
} = require('./constant');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

const generateNumericOTP = (length) => {
  let otp = '';
  const digits = '0123456789';
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }
  return otp;
};

const checkError = (req) => {
  const errors = validationResult(req);
  return errors;
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
};

const authenticateToken = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(STATUS_CODE_ACCESS_DENIED).send('Access denied. Token not provided.');
  }
  const token = req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(STATUS_CODE_ACCESS_DENIED).send('Access denied. Token not provided.');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(STATUS_CODE_UNAUTHORIZED).send('Access denied. Invalid token.');
    }

    req.user = user;
    return next();
  });

  return undefined;
};



module.exports = {
  checkError,
  generateToken,
  authenticateToken,
  generateNumericOTP,
  hashPassword,
}


