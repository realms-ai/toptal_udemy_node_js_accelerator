// IMPORTS
import express from 'express';

import { Constants } from '../../config/constants.js';
import path from 'node:path';
import chalk from 'chalk';

import { User } from '../models/user.js';

// CONSTANTS & VARIABLES
const router = express.Router();
const { space, __dirname, domain } = Constants;

// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// create(POST): will add one product to DB
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID

const index = () => {
  router.get('/', async (req, res) => {
    const users = await User.findAll();
    debugger;
    console.log('Users count: ', users.length);
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
  router.post('/', async (req, res) => {
    if (req.body?.name) await User.create(req.body);
    res.redirect('./users');
  });
};

const destroy = () => {
  router.delete('/:id', async (req, res) => {
    console.log(space, 'Middleware is in Delete User Page');
    const id = +req.params.id;
    await User.destroy({ where: { id: id } });

    // OR
    // const product = await Product.findByPk();
    // await product?.destroy();

    res.redirect(`${domain}/users`);
  });
};

const main = () => {
  index();
  // show()
  create();
  // update()
  destroy();
};

main();

export { router as userRoutes };
