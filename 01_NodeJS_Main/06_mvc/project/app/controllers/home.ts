import express from 'express';
import chalk from 'chalk';

import { Constants } from '../../config/constants.js';
import { Product, ProductType } from '../models/product.js';

const router = express.Router();
const { space, __dirname, domain } = Constants;

const index = () => {
  // Default Page
  router.get('/', (req, res) => {
    // console.log(space, 'In the default middleware');
    const products: ProductType[] = Product.fetch();
    res.render('home/index', {
      products: products,
      diplayProducts: products.length > 0,
      headTitle: 'Online Shop',
      path: '/',
      activeShop: true,
      domain: domain,
    });
  });
};

const main = () => {
  index();
  // show()
  // create();
  // update()
  // delete()
};

main();

export { router as homeRoutes };
