import express, { NextFunction, Request, Response } from 'express';

import { Constants } from './constants.js';
import debug from 'debug';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

const checkAuthorizationHeader = (req: Request) => {
  if (!req.get('Authorization')) {
    const error = new Error('Not authenticated');
    error.cause = {
      statusCode: 401,
    };
    throw error;
  }
};

const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log('In Auth Route');
  try {
    await checkAuthorizationHeader(req);
    // if (!req.get('Authorization')) {
    //   const error = new Error('Not authenticated');
    //   error.cause = {
    //     statusCode: 401,
    //   };
    //   throw error;
    // }
    const token = req.get('Authorization')?.split(' ')[1];
    let decodedToken: any;

    if (token) decodedToken = await jwt.verify(token, SECRET);

    if (!decodedToken) {
      const error: Partial<Error & ErrorT> = new Error('not authenticated');
      error.statusCode = 401;
      throw error;
    } else {
      req.cookies = {
        userId: decodedToken?.userId,
      };
      next();
      return;
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
    return error;
  }
};

authRouter.use(authController);

export { authRouter, authController, checkAuthorizationHeader };
