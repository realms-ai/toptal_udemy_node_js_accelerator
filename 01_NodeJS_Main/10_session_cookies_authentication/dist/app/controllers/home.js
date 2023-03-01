import express from 'express';
import { Constants } from '../../config/constants.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import debug from 'debug';
const router = express.Router();
const { domain } = Constants;
const log = debug('app:homeController');
const errLog = debug('error:homeController');
const index = () => {
    // Default Page
    router.get('/', async (req, res) => {
        // console.log(space, 'In the default middleware');
        const products = await Product.find();
        res.render('home/index', {
            products: products,
            diplayProducts: products.length > 0,
            headTitle: 'Online Shop',
            path: '/',
            activeShop: true,
            domain: domain,
            loggedIn: req.session?.isLoggedIn,
        });
    });
};
const login = () => {
    // Default Page
    router.get('/login', async (req, res) => {
        res.render('home/login', {
            headTitle: 'Login',
            path: 'login',
            domain: domain,
            loggedIn: req.session?.isLoggedIn,
        });
    });
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const [user] = await User.find({ email: email });
        if (user?.password === password) {
            res.set('Set-Cookie', `userId=${user._id}; HttpOnly`);
            res.append('Set-Cookie', `loggedIn=true; HttpOnly`);
            // Cookies addon options:  Expires, Max-Age, Domain, Secure
            req.session.isLoggedIn = true;
            req.session.userId = user._id.toString();
            // req.session.user = user;
            res.redirect('/');
        }
        else
            res.redirect('/login');
    });
};
const logout = () => {
    // Default Page
    router.get('/logout', async (req, res) => {
        log('In Logout Route');
        req.session.destroy((err) => {
            if (err)
                errLog(err);
            res.render('home/login', {
                headTitle: 'Login',
                path: 'login',
                domain: domain,
                loggedIn: req.session?.isLoggedIn,
            });
        });
    });
};
const main = () => {
    index();
    login();
    logout();
    // create();
    // update()
    // delete()
};
main();
export { router as homeRoutes };
