import express from 'express';
import chalk from 'chalk';
import { app, space, __dirname } from '../app.js';
import { productRoutes } from './products.js';
import { userRoutes } from './users.js';
import path from 'node:path';
const router = express.Router();
const errorRoute = () => {
    app.use((req, res, next) => {
        // res.status(404).send('<h1> Page not found </h1>');
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });
};
const defaultRoute = () => {
    // Default Page
    app.get('/', (req, res) => {
        console.log(space, 'In the default middleware');
        // console.log('Default Directory: ', __dirname);
        // res.send('<h1> Hello from Express </h1>');
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });
};
const routes = () => {
    // Initiating Routes
    console.log(space, chalk.blue.inverse('Initiating Routes'));
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    defaultRoute();
    errorRoute();
};
export { routes };
