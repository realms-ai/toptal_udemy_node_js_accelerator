import express from 'express';
// import { app } from './application.js';
import { productRoutes } from '../app/controllers/products.js';
import { userRoutes } from '../app/controllers/users.js';
import { Constants } from './constants.js';
import { homeRoutes } from '../app/controllers/home.js';
import { app } from './application.js';
import { cartRoutes } from '../app/controllers/cart.js';
const router = express.Router();
const { space, __dirname } = Constants;
const routes = () => {
    // Initiating Routes
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/cart', cartRoutes);
    app.use('/', homeRoutes);
};
export { routes };
