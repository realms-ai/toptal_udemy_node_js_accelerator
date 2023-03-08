import { NextFunction } from 'express';
import {
  authController,
  authRouter,
  checkAuthorizationHeader,
} from '../config/middleware.js';
import chai from 'chai';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { User } from '../app/models/user.js';

const expect = chai.expect;
const log = debug('app:test:mocha:authSpec');

describe('Testing Auth Middleware', () => {
  it('should throw error if authorization header is not present', async () => {
    const req: any = {
      get: () => {
        return null;
      },
    };
    const res: any = 5;

    const next: NextFunction = () => {};

    expect(checkAuthorizationHeader.bind(this, req, () => {})).to.throw(
      'Not authenticated'
    );

    authController(req, res, () => {}).then((response: any) => {
      log('Response: ', response);
      log('Response Functions: ', Object.getOwnPropertyNames(response));
      expect(response.message).to.eq('Not authenticated');
    });

    const response = await authRouter.bind(this, req, res, () => {});
    expect(response).to.throw('Not authenticated');
    log('Auth Router Response: ', response);
  });

  it('should yield a userId after decoding the token', () => {
    // Should not test 3rd party functions but if have to, then do it as below but it's cumbersome to do so
    sinon.stub(jwt, 'verify').callsFake(() => {
      return {
        userId: 'abc',
      };
    });
  });
});

describe('Auth Controller - Login', () => {
  // Hooks
  // Runs before all IT function
  before((done) => {
    // Connect to Mongoose
  });

  // Runs after all IT functions have ran
  after((done) => {
    // Disconnect from mongoose after cleaning all data
  });

  // Runs before every IT function
  beforeEach((done) => {});

  // Runs after every IT function
  afterEach((done) => {});

  it('should throw an error if accessing the database fails', () => {
    // Mocking and Stubbing the functions
    sinon.stub(User, 'findOne').alwaysThrew(new Error());
  });

  it('should send a response with valid user status for an existing user', (done) => {
    // Connect to db with mongoose
    // save user
    // Define stub req and res params
    // call method to fetch USER Status
    // expect status code to be 200
    // expect user status to be a 'I am new!' as default set in db
    // Clean Data by deleting the all documents in a collection
    // Disconnect mongoose
  });
});
