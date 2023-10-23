const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator')

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

const generateTransactionId = () => {
  return otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false })
};

const checkError = (req) => {
  const errors = validationResult(req);
  return errors;
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
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

const graphqlForAuth = (req, res, next) => {

  if (!req.header('token')) {
    req.user = null
  } else {
    const token = req.header('token').split(' ')[1];
    if (!token) {
      req.user = null
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        req.user = null
      }

      req.user = user;
    });

  }
  next();
}

module.exports = {
  checkError,
  generateToken,
  authenticateToken,
  generateTransactionId,
  hashPassword,
  graphqlForAuth
}


