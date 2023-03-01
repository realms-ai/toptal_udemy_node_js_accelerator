// IMPORTS
import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes.js';
import { setTemplateEngine } from './template_engine.js';
import { Constants } from './constants.js';
import { mongooseConnect } from './database.js';
import { User } from '../app/models/user.js';
import debug from 'debug';
import { serverSession } from './session.js';
// CONSTANTS & VARIABLES
const app = express();
const { domain, NODE_ENV, SECRET } = Constants;
const log = debug('app:middleware');
// MIDDLEWARE
// Dynamic Static Path depending on the Node Environment
const staticPath = async () => {
    const path = await import(`./environment/${NODE_ENV}.js`);
    return path.staticPaths();
};
// Adding Body Parser to read FORMS data
const initBodyParser = () => {
    app.use(bodyParser.urlencoded({ extended: false }));
};
// Handling Sessions
const appSession = () => {
    serverSession(app);
};
// Invalid route entered by user
const errorRoute = () => {
    app.use((req, res, next) => {
        log('In Error Route');
        res.status(404).render('404', {
            headTitle: 'Not Found',
            path: '',
            domain: domain,
            loggedIn: req.session.isLoggedIn,
        });
    });
};
// Handling PUT/DELETE requests.
const changeRequestType = () => {
    app.use((req, res, next) => {
        if (req?.body?._method) {
            let method = req.body._method.toUpperCase();
            switch (method) {
                case 'PUT':
                    break;
                case 'PATCH':
                    method = 'PUT';
                case 'DELETE':
                    break;
                default:
                    method = 'GET';
            }
            req.method = method;
            delete req.body._method;
        }
        next();
    });
};
// Initializing a user on every request
const authenticateLoginUser = () => {
    app.use(async (req, res, next) => {
        // const cookies = req.get('Cookie');
        // log('Cookies: ', cookies);
        // req.cookies = {};
        // if (cookies?.includes('loggedIn=true')) {
        //   log('Cookies: ', cookies);
        //   log('Request Cookies', req.cookies);
        //   req.cookies.loggedIn = true;
        // }
        log('Setting User: ');
        log('User before setting: ', req.cookies?.user);
        req.cookies = { user: null };
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            req.cookies.user = user;
        }
        log('User: ', req.cookies.user);
        next();
    });
};
const middleware = async () => {
    await appSession();
    await staticPath();
    await setTemplateEngine();
    await initBodyParser();
    await changeRequestType();
    await authenticateLoginUser();
    await mongooseConnect();
};
const main = async () => {
    try {
        await middleware();
        routes();
        errorRoute();
        log('App running at PORT: 3000');
        app.listen(3000);
    }
    catch (e) {
        log('Error in config/application.js: ', e);
        throw e;
    }
};
// CODE WHICH RUNS ON EXECUTING THE FILE
main();
export { app };
