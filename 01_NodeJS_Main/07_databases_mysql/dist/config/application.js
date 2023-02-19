// IMPORTS
import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes.js';
import { setTemplateEngine } from './template_engine.js';
import { Constants } from './constants.js';
import { sequelize } from './database.js';
import { tableRelationships } from '../db/relationships.js';
import { User } from '../app/models/user.js';
// CONSTANTS & VARIABLES
const app = express();
const { domain, NODE_ENV } = Constants;
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
const errorRoute = () => {
    app.use((req, res, next) => {
        res
            .status(404)
            .render('404', { headTitle: 'Not Found', path: '', domain: domain });
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
        const user = await User.findByPk(1);
        if (user?.id)
            req.cookies = {
                user: user,
            };
        next();
    });
};
const middleware = async () => {
    await staticPath();
    setTemplateEngine();
    initBodyParser();
    changeRequestType();
    await tableRelationships();
    authenticateLoginUser();
    const syncOptions = {
    // force: true, // Used in DEVELOPMENT to update the DB tables
    };
    await sequelize.sync(syncOptions);
};
const main = async () => {
    try {
        await middleware();
        routes();
        errorRoute();
        console.log('Listening at PORT: 3000');
        app.listen(3000);
    }
    catch (e) {
        console.log('Error in config/application.js: ', e);
    }
};
// CODE WHICH RUNS ON EXECUTING THE FILE
main();
export { app };
