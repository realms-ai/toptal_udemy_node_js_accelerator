// IMPORTS
import express from 'express';

import { Constants } from '../../config/constants.js';

import { User, UserType } from '../models/user.js';
import { ObjectId } from 'mongodb';

// CONSTANTS & VARIABLES
const router = express.Router();
const { space, domain } = Constants;

// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// create(POST): will add one product to DB
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID

const index = () => {
  router.get('/', async (req, res) => {
    const users = await User.find();
    console.log('Users count: ', users.length);
    res.render('users/index', {
      headTitle: 'Users',
      path: 'users',
      activeUser: true,
      users: users,
      domain: domain,
      loggedIn: req.session?.isLoggedIn,
    });
  });
};

const create = () => {
  router.post('/', async (req, res) => {
    const data: Partial<UserType> = req.body;
    const user = await new User(data);
    await user.save();
    res.redirect('./users');
  });
};

const destroy = () => {
  router.delete('/:id', async (req, res) => {
    console.log(space, 'Middleware is in Delete User Page');
    const id = new ObjectId(req.params.id);
    await User.deleteOne({ _id: id });
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
