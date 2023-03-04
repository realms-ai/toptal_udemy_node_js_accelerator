import express from 'express';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

import { Constants } from '../../config/constants.js';
import { CartItemType, User } from '../models/user.js';

const router = express.Router();
const { domain, __dirname } = Constants;
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
  //
  router.get('/:id/download', async (req, res, next) => {
    log('In Order PDF Generate PDF on the fly and download route');
    const user = req.cookies?.user;
    const orders = user.orders;
    log('Order: ', orders);
    log('Params ID: ', req.params.id);
    const order = orders?.[+req.params.id - 1];
    log('Order: ', order);
    const orderId = order._id.toString();
    const orderItems = orders?.[+req.params.id - 1]?.items;
    log('Order Items: ', orderItems);

    const filename = `/order-${orderId}.pdf`;
    const pathName = path.join(
      __dirname,
      'dist/lib/public/pdf/orders',
      filename
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(pathName));
    pdfDoc.pipe(res);
    pdfDoc.text(JSON.stringify(orderItems));
    pdfDoc.end();
  });

  router.get('/:id/stream_download', async (req, res, next) => {
    log('In Order PDF Stream Read download  route');
    const user = req.cookies?.user;
    const orders = user.orders;
    log('Order: ', orders);
    log('Params ID: ', req.params.id);
    const order = orders?.[+req.params.id - 1];
    log('Order: ', order);
    const orderId = order._id.toString();
    const filename = `/order-${orderId}.pdf`;
    const pathName = path.join(
      __dirname,
      'dist/lib/public/pdf/orders',
      filename
    );
    // **** Read the stream of file and the pipe it for downloading ****
    const file = fs.createReadStream(pathName);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');
    file.pipe(res);
  });

  router.get('/:id/simple_download', async (req, res, next) => {
    log('In Order PDF Simple Read download route');
    const user = req.cookies?.user;
    const orders = user.orders;
    log('Order: ', orders);
    log('Params ID: ', req.params.id);
    const order = orders?.[+req.params.id - 1];
    log('Order: ', order);
    const orderId = order._id.toString();
    const filename = `/order-${orderId}.pdf`;
    const pathName = path.join(
      __dirname,
      'dist/lib/public/pdf/orders',
      filename
    );

    // **** Read the whole file and then send it for downloading ****
    fs.readFile(pathName, (err, data) => {
      if (err) return next(err);
      else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'inline; filename="' + filename + '"'
        );
        // res.setHeader(
        //   'Content-Disposition',
        //   'attachment; filename="' + filename + '"'
        // );
        res.send(data);
      }
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
