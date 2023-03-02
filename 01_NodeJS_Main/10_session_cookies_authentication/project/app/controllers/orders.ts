import express from 'express';
import debug from 'debug';

import { Constants } from '../../config/constants.js';
import { CartItemType, User } from '../models/user.js';

const router = express.Router();
const { domain } = Constants;
const log = debug('app:Orders:Controller');

const all = () => {
  router.use((req, res, next) => {
    log('In Order all route');
    if (req.cookies?.user) next();
    else res.redirect(`${domain}`);
  });
};

const index = () => {
  // Get all data
  router.get('/', async (req, res) => {
    log('In Order index route');
    const user = req.cookies?.user;
    log('User: ', user);
    const orders = (await user.orders) || [];
    const firstOrderItems: CartItemType = (await orders?.[0]?.items) || [];
    log('Order Items: ', firstOrderItems);
    res.render('orders/index', {
      headTitle: 'Orders',
      path: 'orders',
      domain: domain,
      orders: orders,
      orderItems: firstOrderItems,
      // loggedIn: req.session?.isLoggedIn,
    });
  });
};

const show = () => {
  router.get('/:id', async (req, res) => {
    const user = req.cookies?.user;
    const orders = user.orders;
    const orderItems = orders?.[+req.params.id - 1]?.items;
    log('Order Items: ', orderItems);
    res.render('orders/index', {
      headTitle: 'Orders',
      path: 'orders',
      domain: domain,
      orders: orders,
      orderItems: orderItems,
      // loggedIn: req.session?.isLoggedIn,
    });
  });
};

const add = () => {
  router.get('/', (req, res) => {
    // Display form to add new data to the table
    res.render('x/add', {
      headTitle: '',
      path: '',
      domain: domain,
    });
  });
};

const create = () => {
  router.post('/', async (req, res) => {
    const user = await req.cookies?.user;
    await user.generateOrder();
    res.redirect(`${domain}/orders`);
  });
};

const edit = () => {
  router.get('/:id', (req, res) => {
    // Display form to edit existing data in the table
    res.render('x/edit', {
      headTitle: '',
      path: '',
      domain: domain,
    });
  });
};

const update = () => {
  router.put('/:id', (req, res) => {
    // Edit existing data in the table
    res.redirect('./');
  });
};

const destroy = () => {
  router.delete('/:id', (req, res) => {
    // Delete existing data from the table
    res.redirect('./');
  });
};

const main = () => {
  all();
  index();
  show();
  // add();
  create();
  // edit();
  // update();
  // destroy();
};

main();

export { router as orderRoutes };
