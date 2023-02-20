import express from 'express';
import { Constants } from '../../config/constants.js';
const router = express.Router();
const { domain } = Constants;
const index = () => {
    // Get all data
    router.get('/', async (req, res) => {
        const user = req.cookies.user;
        const orders = (await user.user.orders) || [];
        const firstOrderItems = (await orders?.[0]?.items) || [];
        console.log('Order Items: ', firstOrderItems);
        res.render('orders/index', {
            headTitle: 'Orders',
            path: 'orders',
            domain: domain,
            orders: orders,
            orderItems: firstOrderItems,
        });
    });
};
const show = () => {
    router.get('/:id', async (req, res) => {
        const user = req.cookies.user;
        const orders = await user.user.orders;
        const orderItems = (await orders?.[+req.params.id - 1]?.items) || [];
        console.log('Order Items: ', orderItems);
        res.render('orders/index', {
            headTitle: 'Orders',
            path: 'orders',
            domain: domain,
            orders: orders,
            orderItems: orderItems,
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
        const user = await req.cookies.user;
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
