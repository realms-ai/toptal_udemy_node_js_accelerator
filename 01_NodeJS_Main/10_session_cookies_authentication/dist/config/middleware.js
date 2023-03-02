import express from 'express';
import { Constants } from './constants.js';
import debug from 'debug';
// CONSTANTS & VARIABLES
const authRouter = express.Router();
const log = debug('app:Products:Controller');
const { space, domain } = Constants;
authRouter.use((req, res, next) => {
    log('In Auth Route');
    if (req.cookies?.user)
        next();
    else
        res.redirect(`${domain}`);
});
export { authRouter };
