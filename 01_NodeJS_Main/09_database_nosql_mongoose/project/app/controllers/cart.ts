import express from 'express';

import { Constants } from '../../config/constants.js';
import { User, UserMethods, UserModel } from '../models/user.js';

const router = express.Router();
const { space, domain } = Constants;

const index = () => {
  // Get all data
  router.get('/', async (req, res) => {
    const user = await req.cookies.user;
    const cartItems = await user.getCartItems();
    console.log('CartItems: ', cartItems);
    res.render('cart/index', {
      headTitle: 'Cart',
      path: 'cart',
      domain: domain,
      cartItems: cartItems,
      cartItemsLen: cartItems.length,
    });
  });
};

const show = () => {
  router.get('/:id', (req, res) => {
    // Get Data of specific column of the table
    res.render('x/index', {
      headTitle: '',
      path: '',
      domain: domain,
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
    try {
      console.log('In Cart Controller to add product to it');
      const user = await req.cookies.user;
      const productId = req.body.id;
      await user.addToCart(productId);
      console.log('Redirecting');
      res.redirect(`${domain}`);
    } catch (e) {
      console.log(e);
    }
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
  router.delete('/:id', async (req, res) => {
    console.log('In Delete Cart Route');
    // Delete existing data from the table
    const user = await req.cookies.user;
    // await user.removeFromCart(req.params.id);
    await user.removeFromCart(req.params.id);
    res.redirect(`${domain}/cart`);
  });
};

const main = () => {
  index();
  // show();
  add();
  create();
  // edit();
  // update();
  destroy();
};

main();

export { router as cartRoutes };
