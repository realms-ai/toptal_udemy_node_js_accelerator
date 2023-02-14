import express from 'express';
import chalk from 'chalk';

import { app, space, __dirname } from '../app.js';
import { productRoutes, products } from './products.js';
import { userRoutes } from './users.js';
import path from 'node:path';

const router = express.Router();

const errorRoute = () => {
  app.use((req, res, next) => {
    // res.status(404).send('<h1> Page not found </h1>');
    // OR
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    // OR Used for PUB Template Engine
    res.status(404).render('404', { headTitle: 'Not Found', path: '' });
    // OR Used for Handlebar Template Engine
    // res.status(404).render('404', { path: '' });
  });
};

const defaultRoute = () => {
  // Default Page
  app.get('/', (req, res) => {
    console.log(space, 'In the default middleware');
    // console.log('Default Directory: ', __dirname);
    // res.send('<h1> Hello from Express </h1>');
    console.log(space, chalk.blue.inverse('Products'), products);
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', {
      products: products,
      diplayProducts: products.length > 0,
      headTitle: 'Online Shop',
      path: '/',
      activeShop: true,
    });
  });
};

const routes = () => {
  // Initiating Routes
  console.log(space, chalk.blue.inverse('Initiating Routes'));
  app.use('/products', productRoutes);
  app.use('/users', userRoutes);
  defaultRoute();
  errorRoute();
};

export { routes };
