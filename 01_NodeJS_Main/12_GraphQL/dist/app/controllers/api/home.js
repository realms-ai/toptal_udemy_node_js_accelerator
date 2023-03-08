import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import crypto from 'node:crypto';
// import expressValidator from 'express-validator/check';
import { check, body, validationResult } from 'express-validator';
import { Constants } from '../../../config/constants.js';
import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import debug from 'debug';
import jwt from 'jsonwebtoken';
const router = express.Router();
const { domain, SENDGRID_API_KEY, SECRET } = Constants;
const log = debug('app:api:homeController');
const errLog = debug('error:api:homeController');
const transporter = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: SENDGRID_API_KEY || '',
}));
const index = () => {
    // Default Page
    router.get('/', async (req, res) => {
        // console.log(space, 'In the default middleware');
        const products = await Product.find();
        res.status(200).json({
            products: products,
        });
    });
};
const signup = () => {
    router.get('/signup', async (req, res) => {
        log('In Sign-up Route');
        res.render('home/signup', {
            headTitle: 'signup',
            path: 'signup',
            domain: domain,
            // loggedIn: req.session?.isLoggedIn,
            errors: req.flash('error') || [],
            // csrfToken: req.csrfToken(),
        });
    });
    const emailValidation = check('email')
        .isEmail()
        .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user)
            throw new Error('This email address is already taken');
    });
    const passwordValidation = body('password', 'Password should be minimum 5 chars long')
        .isLength({ min: 5 })
        .isAlphanumeric();
    const confirmPasswordValidation = body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Passwords do not match');
    });
    router.post('/signup', emailValidation, passwordValidation, async (req, res) => {
        try {
            log('In POST Sign-up Route');
            const errors = validationResult(req);
            log('Request Body: ', req.body);
            if (!errors.isEmpty()) {
                log('Validation Errors: ', errors);
                log('Validation Errors: ', errors.array());
                return res.status(422).json({
                    errors: errors.array().map((err) => `${err.param}: ${err.msg}`),
                });
            }
            const { username, email, password, confirmPassword } = req.body;
            if (password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 13);
                const user = await new User({
                    username: username,
                    email: email,
                    password: hashedPassword,
                });
                await user.save();
                if (user._id) {
                    req.session.isLoggedIn = true;
                    req.session.userId = user._id.toString();
                    await req.session.save();
                    res.status(201).send({ user: user });
                    return transporter.sendMail({
                        to: user.email,
                        from: 'shop@complete.com',
                        subject: 'Signup succeded!',
                        html: '<h1> You successfully signed up! </h1>',
                    });
                }
            }
            else
                throw new Error("Password doesn't match");
        }
        catch (error) {
            let errors = [];
            if (error.constructor.name === 'MongoServerError' &&
                error.message.includes('duplicate key')) {
                errors.push(`${JSON.stringify(error.keyValue)} already exist`);
            }
            else
                errors.push(error.message);
            return res.status(422).json({
                errors: errors,
            });
        }
    });
};
const login = () => {
    // Default Page
    router.get('/login', async (req, res) => {
        log('In login GET route');
        res.render('home/login', {
            headTitle: 'Login',
            path: 'login',
            domain: domain,
            errors: req.flash('error'),
            // errorMessage: req.flash('error'),
        });
    });
    const emailValidation = check('email').isEmail();
    const passwordValidation = body('password', 'Password should be minimum 5 chars long')
        .isLength({ min: 5 })
        .isAlphanumeric();
    router.post('/login', [emailValidation, passwordValidation], async (req, res) => {
        log('In POST Login route');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            log('Validation Errors: ', errors);
            log('Validation Errors: ', errors.array());
            return res.status(422).json({
                errors: errors.array().map((err) => `${err.param}: ${err.msg}`),
            });
        }
        const { email, password } = req.body;
        const [user] = await User.find({ email: email });
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (comparePassword) {
                const token = jwt.sign({ email: user.email, userId: user._id.toString() }, SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    token: token,
                    userId: user._id,
                });
            }
            else {
                return res.status(401).json({
                    errors: ['Wrong Password'],
                });
            }
        }
        else {
            return res.status(422).json({
                errors: ['Invalid User'],
            });
        }
    });
};
const logout = () => {
    // Default Page
    router.get('/logout', async (req, res) => {
        log('In Logout Route');
        req.session.destroy((err) => {
            res.redirect(`${domain}/login`);
        });
    });
};
const forgotPassword = () => {
    router.get('/forgotPassword', async (req, res) => {
        log('In forgotPassword GET route');
        res.render('home/forgotPassword', {
            headTitle: 'Forgot Password',
            path: 'forgotPassword',
            domain: domain,
            errors: req.flash('error'),
            // errorMessage: req.flash('error'),
        });
    });
    router.post('/forgotPassword', async (req, res) => {
        const { email } = req.body;
        const buffer = await crypto.randomBytes(32);
        const token = await buffer.toString('hex');
        // Find User
        // Store the token along with expiration
        // Send forgot password mail with reset link
    });
};
const resetPassword = () => {
    router.get('/resetPassword', async (req, res) => {
        log('In resetPassword GET route');
        const token = req.query.token;
        const userId = req.query.userId;
        res.render('home/resetPassword', {
            headTitle: 'Forgot Password',
            path: 'resetPassword',
            domain: domain,
            errors: req.flash('error'),
            token: token,
            userId: userId,
            // errorMessage: req.flash('error'),
        });
    });
    router.post('/resetPassword', async (req, res) => {
        const { token, userId, newPassword } = req.body;
        // Find user and compare token along with token expiry
        User.findOne({
            _id: userId,
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });
        // Reset password if above condition is true and re-direct to login
        // Else re-direct to forgot password page again
    });
};
const main = () => {
    index();
    signup();
    login();
    logout();
    forgotPassword();
    resetPassword();
};
main();
export { router as apiHomeRoutes };
