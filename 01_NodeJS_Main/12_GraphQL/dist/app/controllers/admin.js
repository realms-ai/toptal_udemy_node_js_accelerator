import express from 'express';
import { Constants } from '../../config/constants.js';
const router = express.Router();
const { space, domain } = Constants;
const index = () => {
    // Get all data
    router.get('/', (req, res) => {
        res.render('path/index', {
            headTitle: '',
            path: '',
            domain: domain,
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
    router.post('/', (req, res) => {
        // Add new data to the table
        res.redirect('./');
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
    add();
    create();
    edit();
    update();
    destroy();
};
main();
export { router as xRoutes };
