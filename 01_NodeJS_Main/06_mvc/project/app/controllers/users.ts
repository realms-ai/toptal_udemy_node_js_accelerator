// IMPORTS
import express from 'express';

import { Constants } from '../../config/constants.js';
import path from 'node:path';
import chalk from 'chalk';

// INTERFACE
interface User {
  name: string;
}

// CONSTANTS & VARIABLES
const router = express.Router();
const users: User[] = [];
const { space, __dirname, domain } = Constants;

// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// create(POST): will add one product to DB
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID

const index = () => {
  router.get('/', (req, res) => {
    res.render('users/index', {
      headTitle: 'Users',
      path: 'users',
      activeUser: true,
      users: users,
      domain: domain,
    });
  });
};

const create = () => {
  router.post('/', (req, res) => {
    if (req.body?.name) users.push({ name: req.body.name });
    res.redirect('./users');
  });
};

const main = () => {
  index();
  // show()
  create();
  // update()
  // delete()
};

main();

export { router as userRoutes };
