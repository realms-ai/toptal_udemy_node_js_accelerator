// IMPORTS
import express from 'express';
import { space } from '../app.js';
import chalk from 'chalk';
// CONSTANTS & VARIABLES
const router = express.Router();
const users = [];
// FUNCTIONS
// index: list all the products
// show/:id: will show only one product w.r.t ID
// create(POST): will add one product to DB
// update/:id(PUT/PATCH): will update a product w.r.t ID
// delete/:id(DELETE): will delete a product w.r.t ID
const index = () => {
    router.get('/', (req, res) => {
        console.log(space, 'Middleware is in User Page');
        // res.send('<h1>user Page</h1>');
        // OR
        // res.sendFile(path.join(__dirname, 'views', 'user.html'));
        // OR
        console.log(space, chalk.blue.inverse('Users'), users);
        res.render('user', {
            headTitle: 'Users',
            path: 'users',
            activeUser: true,
            users: users,
        });
    });
};
const create = () => {
    router.post('/', (req, res) => {
        console.log(space, 'Adding user middleware');
        // debugger;
        console.log(req.body);
        if (req.body?.name)
            users.push({ name: req.body.name });
        res.redirect('./users');
    });
};
const main = () => {
    index();
    // show()
    create();
    // update()
    // delete()
};
main();
export { router as userRoutes };
