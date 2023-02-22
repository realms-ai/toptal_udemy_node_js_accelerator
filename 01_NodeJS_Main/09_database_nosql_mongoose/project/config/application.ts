// IMPORTS
import express from 'express';
import bodyParser from 'body-parser';

import { routes } from './routes.js';
import { setTemplateEngine } from './template_engine.js';
import { Constants } from './constants.js';
import { mongoConnect, mongooseConnect } from './database.js';
import { User, UserType } from '../app/models/user.js';
import { MongoClient } from 'mongodb';

// CONSTANTS & VARIABLES
const app = express();
const { domain, NODE_ENV } = Constants;

// MIDDLEWARE
// Dynamic Static Path depending on the Node Environment
const staticPath = async () => {
  const path = await import(`./environment/${NODE_ENV}.js`);
  return path.staticPaths();
};
// Adding Body Parser to read FORMS data
const initBodyParser = () => {
  app.use(bodyParser.urlencoded({ extended: false }));
};

const errorRoute = () => {
  app.use((req, res, next) => {
    res
      .status(404)
      .render('404', { headTitle: 'Not Found', path: '', domain: domain });
  });
};

// Handling PUT/DELETE requests.
const changeRequestType = () => {
  app.use((req, res, next) => {
    if (req?.body?._method) {
      let method: string = req.body._method.toUpperCase();
      switch (method) {
        case 'PUT':
          break;
        case 'PATCH':
          method = 'PUT';
        case 'DELETE':
          break;
        default:
          method = 'GET';
      }
      req.method = method;
      delete req.body._method;
    }
    next();
  });
};

// Initializing a user on every request
const authenticateLoginUser = () => {
  interface authUser extends express.Request {
    user: UserType;
  }
  app.use(async (req, res, next) => {
    const users = await User.find();
    const user = users[0];
    if (user?._id)
      req.cookies = {
        user: new User(user),
      };
    next();
  });
};

const middleware = async () => {
  await staticPath();
  setTemplateEngine();
  initBodyParser();
  changeRequestType();
  authenticateLoginUser();
  await mongooseConnect();
  await mongoConnect();
};

const main = async () => {
  try {
    await middleware();
    routes();
    errorRoute();
    console.log('App running at PORT: 3000');
    app.listen(3000);
  } catch (e) {
    console.log('Error in config/application.js: ', e);
    throw e;
  }
};

// CODE WHICH RUNS ON EXECUTING THE FILE

main();

export { app };
