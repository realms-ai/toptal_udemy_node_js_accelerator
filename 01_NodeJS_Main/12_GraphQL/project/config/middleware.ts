import express from 'express';

import { Constants } from './constants.js';
import debug from 'debug';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { decode } from 'punycode';

// CONSTANTS & VARIABLES
const authRouter = express.Router();
const log = debug('app:middleware:auth');
const { space, domain, SECRET } = Constants;

interface ErrorT {
  statusCode: number;
}

interface jwtToken {
  userId: string;
  token: string;
}

authRouter.use(async (req, res, next) => {
  log('In Auth Route');
  try {
    const token = req.get('Authorization')?.split(' ')[1];
    let decodedToken: any;
    req.cookies = {
      isAuth: false,
      userId: null,
    };
    log('Token: ', token);
    if (token) decodedToken = await jwt.verify(token, SECRET);
    log('Decoded Token: ', decodedToken);
    if (decodedToken) {
      req.cookies.isAuth = true;
      req.cookies.userId = decodedToken?.userId;
    }
    next();
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
});

export { authRouter };
