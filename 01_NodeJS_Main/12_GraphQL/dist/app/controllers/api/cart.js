import express from 'express';
import debug from 'debug';
import { Constants } from '../../../config/constants.js';
const router = express.Router();
const { space, domain } = Constants;
const log = debug('app:Cart:Controller');
const all = () => {
    router.use((req, res, next) => {
        log('In Cart all route');
        if (req.cookies?.user)
            next();
        else
            res.redirect(`${domain}`);
    });
};
const index = () => {
    // Get all data
    router.get('/', async (req, res) => {
        const user = await req.cookies?.user;
        log('In Cart index route');
        log('User: ', user);
        let cartItems = [];
        if (user)
            cartItems = await user.getCartItems();
        log('CartItems: ', cartItems);
        res.render('cart/index', {
            headTitle: 'Cart',
            path: 'cart',
            domain: domain,
            cartItems: cartItems,
            cartItemsLen: cartItems.length,
            // loggedIn: req.session?.isLoggedIn,
            // csrfToken: req.csrfToken(),
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
            loggedIn: req.session?.isLoggedIn,
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
            log('In Cart Controller to add product to it');
            const user = await req.cookies?.user;
            log('User: ', user);
            const productId = req.body.id;
            if (user) {
                await user.addToCart(productId);
                // await user?.save();
                log('Redirecting');
                log('User: ', user);
            }
            res.redirect(`${domain}`);
        }
        catch (e) {
            log(e);
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
            loggedIn: req.session?.isLoggedIn,
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
        log('In Delete Cart Route');
        // Delete existing data from the table
        const user = await req.cookies?.user;
        // await user.removeFromCart(req.params.id);
        await user.removeFromCart(req.params.id);
        res.redirect(`${domain}/cart`);
    });
};
const main = () => {
    all();
    index();
    // show();
    add();
    create();
    // edit();
    // update();
    destroy();
};
main();
export { router as apiCartRoutes };
