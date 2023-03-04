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
import csrf from 'csurf';
import flash from 'connect-flash';
import multer from 'multer';
// CONSTANTS & VARIABLES
const app = express();
const { domain, NODE_ENV, SECRET, __dirname } = Constants;
const log = debug('app:middleware');
const csrfProtection = csrf();
// MIDDLEWARE
// Dynamic Static Path depending on the Node Environment
const staticPath = async () => {
    const path = await import(`./environment/${NODE_ENV}.js`);
    return path.staticPaths();
};
// Adding Body Parser to read FORMS data
const initBodyParser = () => {
    // Define Multer Storage
    const multerFileStoreage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'dist/lib/public/images');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + '-' + file.originalname);
        },
    });
    // Used to filter files
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const multerFilterFiles = (req, file, cb) => {
        const result = fileTypes.includes(file.mimetype);
        log('Multer Filter Result: ', result);
        if (result)
            cb(null, true);
        else
            cb(null, false);
    };
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(multer({
        storage: multerFileStoreage,
        fileFilter: multerFilterFiles,
    }).single('image'));
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
const errorHandler = () => {
    app.use((err, req, res, next) => {
        log('In Error Route');
        res.status(500).render('500', {
            headTitle: 'Server down',
            path: '',
            domain: domain,
            loggedIn: req.session.isLoggedIn,
            error: err,
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
        if (req.session.userId) {
            log('Setting User: ');
            log('User before setting: ', req.cookies?.user);
            req.cookies = { user: null };
            const user = await User.findById(req.session.userId);
            req.cookies.user = new User(user);
            log('User: ', req.cookies.user);
        }
        // Telling Express to add the below keys to every render
        res.locals.loggedIn = req.session?.isLoggedIn;
        res.locals.csrfToken = req.csrfToken();
        next();
    });
};
const middleware = async () => {
    await appSession();
    await staticPath();
    await setTemplateEngine();
    await initBodyParser();
    app.use(csrfProtection); // CSRF Token or CORS (Shoule be after body parser so that req.body could be read by it)
    app.use(flash()); // Flash used to flash error/warning messages on UI
    await changeRequestType();
    await authenticateLoginUser();
    await mongooseConnect();
};
const main = async () => {
    try {
        await middleware();
        routes();
        errorRoute();
        errorHandler();
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
